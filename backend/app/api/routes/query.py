from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.query_schema import QueryRequest, QueryResponse
from app.api.deps import get_db, get_current_user
from app.models.query import Query as QueryModel
from app.agents.langgraph_agent import build_agent
from app.services.cache_service import get_cache, set_cache
from app.utils.helpers import generate_cache_key, deserialize_response, serialize_response

router = APIRouter(prefix="/query", tags=["query"])

agent = build_agent()


@router.post("/", response_model=QueryResponse)
def process_query(
    query_data: QueryRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    key = generate_cache_key(
        query_data.question + (query_data.context or "")
    )

    cached = get_cache(key)

    # 🔥 CACHE HIT
    if cached:
        data = deserialize_response(cached)

        try:
            print("Saving Query to DB (cache hit):", query_data.question)

            query_entry = QueryModel(
                user_id=user.id,   # ✅ FIXED
                question=data["question"],
                sql_query=data["sql"],        # ✅ FIXED
                result=str(data["result"])    # ✅ FIXED
            )
            db.add(query_entry)
            db.commit()
            # print("USER ID" , user.id)
        except Exception as e:
            db.rollback()
            print("DB SAVE ERROR:", e)

        return QueryResponse(**data)

    # 🔥 AGENT EXECUTION
    state = {
        "context": query_data.context,
        "question": query_data.question,
    }

    result = agent.invoke(state)

    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"])

    sql_query = result.get("sql")
    final_result = result.get("result")

    # 🔥 SAVE TO DB
    try:
        print("Saving Query to DB:", query_data.question)

        query_entry = QueryModel(
            user_id=user.id,   # ✅ FIXED (THIS WAS MISSING)
            question=query_data.question,
            sql_query=sql_query,
            result=str(final_result)
        )
        db.add(query_entry)
        db.commit()

    except Exception as e:
        db.rollback()
        print("DB SAVE ERROR:", e)

    # 🔥 CACHE STORE
    cache_value = serialize_response({
        "question": query_data.question,
        "sql": sql_query,
        "result": final_result
    })

    set_cache(key, cache_value)

    return QueryResponse(
        question=query_data.question,
        sql=sql_query,
        result=final_result
    )
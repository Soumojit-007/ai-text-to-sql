from fastapi import APIRouter, UploadFile, HTTPException
from typing import List
import pandas as pd
from sqlalchemy import create_engine
from app.core.config import settings

router = APIRouter(prefix="/upload", tags=["upload"])

engine = create_engine(settings.DATABASE_URL)


@router.post("/")
async def upload_files(files: List[UploadFile]):
    try:
        # 🔥 SAFE TRANSACTION (AUTO COMMIT + ROLLBACK)
        with engine.begin() as conn:

            for file in files:
                try:
                    # ✅ Detect file type and read accordingly
                    filename = file.filename.lower()

                    if filename.endswith(".csv"):
                        df = pd.read_csv(file.file)

                    elif filename.endswith(".xlsx") or filename.endswith(".xls"):
                        df = pd.read_excel(file.file)

                    else:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Unsupported file format: {file.filename}"
                        )

                    table_name = filename.split(".")[0]

                    print(f"Uploading table: {table_name}")

                    # ✅ Use connection (NOT engine)
                    df.to_sql(
                        table_name,
                        conn,
                        if_exists="replace",
                        index=False
                    )

                except Exception as file_error:
                    print("FILE ERROR:", file_error)
                    raise HTTPException(
                        status_code=400,
                        detail=f"Error processing file {file.filename}"
                    )

        return {"message": "Files uploaded successfully"}

    except Exception as e:
        print("UPLOAD ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail="Upload failed due to database error"
        )
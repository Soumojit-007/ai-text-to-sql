import sqlparse
import re
from app.core.constants import BLOCKED_SQL_KEYWORDS


def validate_sql(query: str):
    if not query:
        return False, "Empty query"

    query_lower = query.lower().strip()

    # ✅ Allow only safe starting operations
    if not re.match(r"^(select|insert|update|delete|with)\b", query_lower):
        return False, "Invalid SQL operation"

    # ✅ Block dangerous keywords (strict)
    for keyword in BLOCKED_SQL_KEYWORDS:
        if re.search(rf"\b{keyword}\b", query_lower):
            return False, f"Blocked keyword detected: {keyword}"

    # ✅ Extra hard safety
    if any(k in query_lower for k in ["drop", "truncate", "alter"]):
        return False, "Dangerous operation detected"

    # ✅ Syntax validation
    try:
        parsed = sqlparse.parse(query)
        if not parsed:
            return False, "Invalid SQL syntax"
    except Exception:
        return False, "SQL parsing error"

    return True, None
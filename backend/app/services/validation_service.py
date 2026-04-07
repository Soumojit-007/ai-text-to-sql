import sqlparse
from app.core.constants import BLOCKED_SQL_KEYWORDS, ALLOWED_SQL_OPERATIONS


def validate_sql(query: str):
    if not query:
        return False, "Empty query"

    query_lower = query.lower()

    # Block dangerous operations
    for keyword in BLOCKED_SQL_KEYWORDS:
        if keyword in query_lower:
            return False, f"Blocked keyword detected: {keyword}"

    # Allow only basic operations
    if not query_lower.startswith(tuple(ALLOWED_SQL_OPERATIONS)):
        return False, "Only SELECT/INSERT/UPDATE/DELETE allowed"

    try:
        parsed = sqlparse.parse(query)
        if not parsed:
            return False, "Invalid SQL syntax"
    except Exception:
        return False, "SQL parsing error"

    return True, None
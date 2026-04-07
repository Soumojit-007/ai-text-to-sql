# SQL Safety
ALLOWED_SQL_OPERATIONS = ["select", "insert", "update", "delete"]

BLOCKED_SQL_KEYWORDS = [
    "drop",
    "truncate",
    "alter",
    "grant",
    "revoke"
]

MAX_QUERY_LENGTH = 2000
MAX_RESULT_ROWS = 100

# Cache
CACHE_TTL_SECONDS = 300

# Roles
ROLE_USER = "user"
ROLE_ADMIN = "admin"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.postgres import init_db
from app.utils.logger import log

# Routers
from app.api.routes import query, auth, history, health , upload , generate_sql

# Middleware
from app.middleware.logging_middleware import log_requests
from app.middleware.error_handler import global_exception_handler

# 🔥 Modern lifespan (better than on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("🚀 Starting application...")

    try:
        init_db()
        log.info("✅ Database initialized")
    except Exception as e:
        log.error(f"❌ DB init failed: {e}")
        raise e

    yield

    log.info("🛑 Shutting down application...")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
        lifespan=lifespan
    )

    # 🔥 Global Exception Handler
    app.add_exception_handler(Exception, global_exception_handler)

    # 🔥 Logging Middleware (should be early)
    app.middleware("http")(log_requests)

    # 🔥 CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # ⚠️ restrict in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 🔥 API Versioning
    API_PREFIX = "/api/v1"

    app.include_router(health.router, prefix=API_PREFIX)
    app.include_router(auth.router, prefix=API_PREFIX)
    app.include_router(query.router, prefix=API_PREFIX)
    app.include_router(history.router, prefix=API_PREFIX)
    app.include_router(upload.router, prefix=API_PREFIX)
    app.include_router(generate_sql.router, prefix=API_PREFIX)


    return app


app = create_app()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.postgres import init_db
from app.utils.logger import log

# Routers
from app.api.routes import query, auth, history, health


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # change in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(health.router)
    app.include_router(auth.router)
    app.include_router(query.router)
    app.include_router(history.router)

    return app


app = create_app()


@app.on_event("startup")
def on_startup():
    log.info("Starting application...")
    init_db()
    log.info("Database initialized.")
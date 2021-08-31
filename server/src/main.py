from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import auth
from src.database.session import Base, engine

from src.services import user_service, artist_service
from src.database.session import SessionLocal


def setup_app():
    app = FastAPI(title="example", openapi_url="/api/v1/openapi.json")
    api_router = APIRouter()
    api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
    app.include_router(api_router)

    origins = [
        "http://localhost",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


# https://github.com/tiangolo/fastapi/issues/1174
app = FastAPI()
main_app = setup_app()
app.mount("/api", main_app)
# reset_db()
# Base.metadata.create_all(bind=engine)
# session = SessionLocal()
# user = user_service.get_user_by_email(session, "kevinjungchang@gmail.com")
# for i in range(2):
#     artist = artist_service.create_artist(session, f"artist{i}", user)
#     print(artist)
# session.commit()
# session.close()

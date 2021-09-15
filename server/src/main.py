import os
import pathlib

import firebase_admin
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials

from src.database.session import Base, SessionLocal, engine
from src.routes import artists, auth
from src.services import artist_service, user_service


def initialize_firebase():
    cred = credentials.Certificate(
        os.path.join(pathlib.Path().resolve(), "src/firebase_key.json")
    )
    firebase_admin.initialize_app(cred)


def setup_app():
    app = FastAPI(title="example", openapi_url="/api/v1/openapi.json")
    api_router = APIRouter()
    api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
    api_router.include_router(artists.router, prefix="/artists", tags=["artists"])
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
    initialize_firebase()
    return app


def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def add_fake_data():
    session = SessionLocal()
    user = user_service.get_user_by_email(session, "kevinjungchang@gmail.com")
    for i in range(2):
        artist = artist_service.create_artist(session, f"artist{i}", user)
        print(artist)
    session.commit()
    session.close()


# https://github.com/tiangolo/fastapi/issues/1174
app = FastAPI()
main_app = setup_app()
app.mount("/api", main_app)
# reset_db()
# add_fake_data()

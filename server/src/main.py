from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

def setup_app(): 
    app = FastAPI(title="collecting.email", openapi_url="/api/v1/openapi.json")
    api_router = APIRouter()
    api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
    app.include_router(api_router)

    origins = [
        "http://localhost",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


# https://github.com/tiangolo/fastapi/issues/1174
app = FastAPI()
main_app = setup_app()
app.mount("/api", main_app)
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from src.database.session import get_db_session
from src.services import artist_service
from src.routes.utils import get_current_user
from src.models.user import User


router = APIRouter()


class ArtistResponse(BaseModel):
    name: str


class GetArtistsRequest(BaseModel):
    email: str


class GetArtistsResponse(BaseModel):
    artists = List[ArtistResponse]


@router.get("/", tags=["auth"])
async def get_artists_request(
    body: GetArtistsRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_db_session),
) -> GetArtistsResponse:
    print(body)

    print(current_user.artists)

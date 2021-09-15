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


class GetArtistsResponse(BaseModel):
    artists: List[ArtistResponse]


@router.get("/", tags=["artists"])
async def get_artists_request(
    current_user: User = Depends(get_current_user),
) -> GetArtistsResponse:
    return GetArtistsResponse(
        artists=[ArtistResponse(name=artist.name) for artist in current_user.artists]
    )

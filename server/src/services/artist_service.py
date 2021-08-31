from sqlalchemy.orm import Session
from src.models.user import User
from src.models.artist import Artist


def create_artist(session: Session, name: str, user: User) -> Artist:
    artist = Artist(name=name, user=user)
    session.add(artist)
    session.flush()
    session.refresh(artist)
    return artist

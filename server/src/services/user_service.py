from typing import Optional

from sqlalchemy.orm import Session
from src.models.user import User


def get_user_by_email(session: Session, email: str) -> Optional[User]:
    return session.query(User).filter_by(email=email.lower()).first()


def create_user(session: Session, email: str, firebase_id: str) -> User:
    if get_user_by_email(session, email):
        raise Exception(f"User already exists: {email}")
    user = User(email=email.lower(), firebase_id=firebase_id)
    session.add(user)
    session.flush()
    session.refresh(user)
    return user

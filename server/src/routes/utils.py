from typing import Any

from firebase_admin import auth
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from sqlalchemy.orm import Session
from src.database.session import get_db_session
from src.models.user import User
from src.services import user_service
import logging

oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/login")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def get_current_user(
    session: Session = Depends(get_db_session),
    token: Any = Security(oauth2_schema),
) -> User:
    """
    Middleware for getting the user that requested.
    """
    try:
        firebase_user = auth.verify_id_token(token)
        email = firebase_user["email"]
        if not email:
            raise KeyError("No email in firebase response")
        user = user_service.get_user_by_email(session, email)
        if not user:
            raise SystemError("User not found")
        return user
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid credentials: {e}",
        )

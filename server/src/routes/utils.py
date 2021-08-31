from typing import Any

from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from sqlalchemy.orm import Session
from src.database.session import get_db_session
from src.models.user import User
from src.services import auth_service, user_service

oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/signin")


def get_current_user(
    session: Session = Depends(get_db_session),
    token: Any = Security(oauth2_schema),
) -> User:
    """
    Middleware for getting the user that requested.
    """
    try:
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid credentials",
            )
        if isinstance(token, bytes):
            token = token.decode("utf-8")
        elif token.startswith("b'"):
            token = token[2 : len(token) - 1]
        token_payload = TokenPayload(**auth_service.decode_jwt(token))  # type: ignore
    except PyJWTError as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid credentials: {e}",
        )
    user = user_service.get_user_by_email(session, token_payload.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Requesting user not found"
        )
    return user

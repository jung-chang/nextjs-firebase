from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from src.database.session import get_db_session
from src.services import user_service

router = APIRouter()


class SignUpRequest(BaseModel):
    email: str
    firebase_id: str


class UserResponse(BaseModel):
    email: str
    firebase_id: str


@router.post("/signup", tags=["auth"])
async def signup(
    body: SignUpRequest,
    session: Session = Depends(get_db_session),
) -> UserResponse:
    try:
        validate_email(body.email)
        user = user_service.create_user(session, body.email, body.firebase_id)
        return UserResponse(
            email=user.email,
            firebase_id=user.firebase_id,
        )
    except EmailNotValidError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email not valid",
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to sign up",
        )

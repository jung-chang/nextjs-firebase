from sqlalchemy.orm import relationship
import shortuuid
from sqlalchemy import Column, String
from src.database.session import Base
from src.models.timestamp_mixin import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "Users"
    id = Column(
        String, primary_key=True, default=shortuuid.uuid, unique=True, nullable=False
    )
    email = Column(String, nullable=False, unique=True)
    firebase_id = Column(String, unique=True)

    artists = relationship("Artist", back_populates="user")

    def __repr__(self):
        return "User(id={}, email={}, firebase_id={})".format(
            self.id, self.email, self.firebase_id
        )

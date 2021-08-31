import shortuuid
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from src.database.session import Base
from src.models.timestamp_mixin import TimestampMixin


class Artist(Base, TimestampMixin):
    __tablename__ = "Artists"
    id = Column(
        String, primary_key=True, default=shortuuid.uuid, unique=True, nullable=False
    )
    name = Column(String, nullable=False, unique=True)

    user_id = Column(String, ForeignKey("Users.id"))
    user = relationship("User", back_populates="artists")

    def __repr__(self):
        return "Artist(id={}, name={})".format(self.id, self.name)

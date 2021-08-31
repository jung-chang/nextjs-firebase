from sqlalchemy import (
    Column,
    sql,
    DateTime,
)


class TimestampMixin:
    created_at = Column(DateTime, server_default=sql.func.now())
    updated_at = Column(
        DateTime, server_default=sql.func.now(), server_onupdate=sql.func.now()
    )

    def __repr__(self):
        return "TimestampMixin(created_at={}, updated_at={}".format(
            self.created_at, self.updated_at
        )

import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from src.config import CONFIG

# SQLAlchemy SQLite engine.
engine = create_engine(CONFIG.DATABASE_URL, connect_args={"check_same_thread": False})

# SQLAlchemy Postgres engine.
# engine = create_engine(DATABASE_URL, pool_pre_ping=True)

db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

logger = logging.getLogger("db.session")
logger.setLevel(logging.DEBUG)

# Dependency per router request.
def get_db_session() -> Session:
    try:
        session_local = SessionLocal()
        yield session_local
        session_local.commit()
    except Exception as e:
        logger.error(e)
        session_local.rollback()
    finally:
        session_local.close()

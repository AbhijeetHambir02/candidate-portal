from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import CONNECTION_STRING

engine = create_engine(url=CONNECTION_STRING)
LocalSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    db = LocalSession()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
from sqlalchemy.orm import Session
from datetime import datetime

from .models import FocusSession
from .schemas import FocusSessionCreate

def create_session(db: Session, data: FocusSessionCreate):
    session = FocusSession(
        title=data.title,
        category=data.category,
        start_time=data.start_time
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_sessions(db: Session):
    return db.query(FocusSession).all()

def stop_session(db: Session, session_id: int):
    session = db.query(FocusSession).get(session_id)
    if not session:
        return None

    session.end_time = datetime.utcnow()
    session.duration_minutes = int(
        (session.end_time - session.start_time).total_seconds() / 60
    )

    db.commit()
    db.refresh(session)
    return session

def delete_session(db: Session, session_id: int):
    session = db.query(FocusSession).get(session_id)
    if not session:
        return None

    db.delete(session)
    db.commit()
    return True

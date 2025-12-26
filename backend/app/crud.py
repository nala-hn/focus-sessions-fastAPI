from sqlalchemy.orm import Session, joinedload
from .models import FocusSession
from datetime import datetime
from .schemas import FocusSessionCreate


def create_session(db: Session, data: FocusSessionCreate):
    session = FocusSession(**data.dict())
    db.add(session)
    db.commit()
    db.refresh(session)

    session = (
        db.query(FocusSession)
        .options(joinedload(FocusSession.category))
        .filter(FocusSession.id == session.id)
        .first()
    )

    return session


def get_sessions(db: Session):
    return (
        db.query(FocusSession)
        .options(joinedload(FocusSession.category))
        .order_by(FocusSession.start_time.desc())
        .all()
    )

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

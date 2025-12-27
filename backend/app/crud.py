from sqlalchemy.orm import Session, joinedload
from .models import FocusSession, Category
from datetime import datetime
from .schemas import FocusSessionCreate, CategoryUpdate


def create_session(db: Session, data: FocusSessionCreate):
    session = FocusSession(
        title=data.title,
        category_id=data.category_id,
        start_time=datetime.utcnow()
    )

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
        .order_by(FocusSession.created_at.desc())
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

def create_category(db: Session, data: CategoryCreate):
    category = Category(
        name=data.name,
        color=data.color,
        flag_aktif=True
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

def get_categories(db: Session):
    return (
        db.query(Category)
        .filter(Category.flag_aktif == True)
        .order_by(Category.created_at.desc())
        .all()
    )

def get_category(db: Session, category_id: int):
    return (
        db.query(Category)
        .filter(
            Category.id == category_id,
            Category.flag_aktif == True
        )
        .first()
    )

def update_category(db: Session, category_id: int, data: CategoryUpdate):
    category = get_category(db, category_id)
    if not category:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)
    return category

def delete_category(db: Session, category_id: int):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        return False

    category.flag_aktif = False
    db.commit()
    return True

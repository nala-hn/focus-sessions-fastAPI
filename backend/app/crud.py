from sqlalchemy.orm import Session, joinedload
from . import models, schemas, security
from .models import FocusSession, Category, User
from datetime import datetime
from .schemas import FocusSessionCreate, CategoryUpdate, UserCreate


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not security.verify_password(password, user.hashed_password):
        return False
    return user


def create_session(db: Session, data: FocusSessionCreate, owner_id: int):
    session = FocusSession(
        title=data.title,
        category_id=data.category_id,
        start_time=datetime.utcnow(),
        owner_id=owner_id
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

def get_sessions(db: Session, owner_id: int, page: int = 1, limit: int = 9):
    offset = (page - 1) * limit
    total = db.query(FocusSession).filter(FocusSession.owner_id == owner_id).count()
    sessions = (
        db.query(FocusSession)
        .filter(FocusSession.owner_id == owner_id)
        .order_by(FocusSession.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return sessions, total

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

def get_categories(db: Session, page: int = 1, limit: int = 10):
    offset = (page - 1) * limit
    total = db.query(Category).filter(Category.flag_aktif == True).count()
    categories = (
        db.query(Category)
        .filter(Category.flag_aktif == True)
        .order_by(Category.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return categories, total

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


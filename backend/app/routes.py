from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError
from .database import SessionLocal
from . import crud, schemas, models
from .schemas import ( CategoryCreate, CategoryUpdate, CategoryResponse, )
from .security import SECRET_KEY, ALGORITHM
from jose import jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

router = APIRouter()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/sessions/insert", response_model=schemas.StandardResponse[schemas.FocusSessionResponse])
def create_focus_session(data: schemas.FocusSessionCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    session = crud.create_session(db, data, owner_id=current_user.id)
    return schemas.StandardResponse(
        code=201,
        result="Sukses",
        detail="Session successfully created.",
        data=session
    )

@router.get("/sessions/browse", response_model=schemas.StandardResponse[schemas.PaginatedResponse[schemas.FocusSessionResponse]])
def list_sessions(page: int = 1, limit: int = 9, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    sessions, total = crud.get_sessions(db, page=page, limit=limit)
    paginated_data = schemas.PaginatedResponse(
        page=page,
        limit=limit,
        total=total,
        list=sessions
    )
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Data(s) successfully fetched.",
        data=paginated_data
    )

@router.put("/sessions/update/{session_id}/stop", response_model=schemas.StandardResponse[schemas.FocusSessionResponse])
def stop_focus_session(session_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    session = crud.stop_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Session successfully stopped.",
        data=session
    )

@router.delete("/sessions/delete/{session_id}", response_model=schemas.StandardResponse[None])
def delete_focus_session(session_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    success = crud.delete_session(db, session_id)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Session successfully deleted.",
        data=None
    )

@router.post("/categories/insert", response_model=schemas.StandardResponse[schemas.CategoryResponse])
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    category = crud.create_category(db, data)
    return schemas.StandardResponse(
        code=201,
        result="Sukses",
        detail="Category successfully created.",
        data=category
    )

@router.get("/categories/browse", response_model=schemas.StandardResponse[schemas.PaginatedResponse[schemas.CategoryResponse]])
def list_categories(page: int = 1, limit: int = 10, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    categories, total = crud.get_categories(db, page=page, limit=limit)
    paginated_data = schemas.PaginatedResponse(
        page=page,
        limit=limit,
        total=total,
        list=categories
    )
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Data(s) successfully fetched.",
        data=paginated_data
    )

@router.get("/categories/detail/{category_id}", response_model=schemas.StandardResponse[schemas.CategoryResponse])
def get_category(category_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    category = crud.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Category successfully fetched.",
        data=category
    )

@router.put("/categories/update/{category_id}", response_model=schemas.StandardResponse[schemas.CategoryResponse])
def update_category(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    category = crud.update_category(db, category_id, data)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Category successfully updated.",
        data=category
    )


@router.delete("/categories/detele/{category_id}", response_model=schemas.StandardResponse[None])
def delete_category(category_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        success = crud.delete_category(db, category_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not success:
        raise HTTPException(status_code=404, detail="Category not found")

    return schemas.StandardResponse(
        code=200,
        result="Sukses",
        detail="Category successfully deleted.",
        data=None
    )

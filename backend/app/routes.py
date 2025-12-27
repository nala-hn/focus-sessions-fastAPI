from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import crud, schemas
from .schemas import ( CategoryCreate, CategoryUpdate, CategoryResponse, )

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/sessions/insert", response_model=schemas.StandardResponse[schemas.FocusSessionResponse])
def create_focus_session(data: schemas.FocusSessionCreate, db: Session = Depends(get_db)):
    session = crud.create_session(db, data)
    return schemas.StandardResponse(
        code=201,
        result="Sukses",
        detail="Session successfully created.",
        data=session
    )

@router.get("/sessions/browse", response_model=schemas.StandardResponse[schemas.PaginatedResponse[schemas.FocusSessionResponse]])
def list_sessions(page: int = 1, limit: int = 9, db: Session = Depends(get_db)):
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
def stop_focus_session(session_id: int, db: Session = Depends(get_db)):
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
def delete_focus_session(session_id: int, db: Session = Depends(get_db)):
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
    db: Session = Depends(get_db)
):
    category = crud.create_category(db, data)
    return schemas.StandardResponse(
        code=201,
        result="Sukses",
        detail="Category successfully created.",
        data=category
    )

@router.get("/categories/browse", response_model=schemas.StandardResponse[schemas.PaginatedResponse[schemas.CategoryResponse]])
def list_categories(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
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
def get_category(category_id: int, db: Session = Depends(get_db)):
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
    db: Session = Depends(get_db)
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
def delete_category(category_id: int, db: Session = Depends(get_db)):
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

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import SessionLocal
from . import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/sessions", response_model=schemas.FocusSessionResponse)
def create_focus_session(data: schemas.FocusSessionCreate, db: Session = Depends(get_db)):
    return crud.create_session(db, data)

@router.get("/sessions", response_model=list[schemas.FocusSessionResponse])
def list_sessions(db: Session = Depends(get_db)):
    return crud.get_sessions(db)

@router.put("/sessions/{session_id}/stop")
def stop_focus_session(session_id: int, db: Session = Depends(get_db)):
    session = crud.stop_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.delete("/sessions/{session_id}")
def delete_focus_session(session_id: int, db: Session = Depends(get_db)):
    success = crud.delete_session(db, session_id)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"message": "Deleted"}

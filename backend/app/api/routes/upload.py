from fastapi import APIRouter, UploadFile, File
from typing import List
import pandas as pd
from sqlalchemy import create_engine
from app.core.config import settings

router = APIRouter(prefix="/upload", tags=["upload"])

engine = create_engine(settings.DATABASE_URL)


@router.post("/")
async def upload_files(files: List[UploadFile] = File(...)):
    tables = []

    for file in files:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file)
        else:
            raise ValueError("Unsupported file format")

        table_name = file.filename.split(".")[0].lower()

        df.to_sql(table_name, engine, if_exists="replace", index=False)
        tables.append(table_name)

    return {
        "message": "Tables created successfully",
        "tables": tables
    }
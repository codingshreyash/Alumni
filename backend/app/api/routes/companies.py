from fastapi import APIRouter

router = APIRouter(tags="companies")

# from pydantic import BaseModel
# class Company(BaseModel):
#     name: str

# Companies
# @router.get("/companies/{company_name}")
# def get_company(company_name: str):
#     pass
    # conn = get_db_connection()
    # cursor = conn.cursor()
    # cursor.execute(
    #     "SELECT * FROM companies WHERE name = ?",
    #     (company_name,)
    # )
    # items = [dict(row) for row in cursor.fetchall()]
    # conn.close()
    # return items

# @router.get("/companies")
# def get_companies():
#     pass
    # conn = get_db_connection()
    # cursor = conn.cursor()
    # cursor.execute("SELECT * FROM companies")
    # items = [dict(row) for row in cursor.fetchall()]
    # conn.close()
    # return items

# @router.post("/companies")
# def create_company():
#     pass
    # conn = get_db_connection()
    # cursor = conn.cursor()

    # # values should sanitize input
    # cursor.execute(
    #     "INSERT INTO companies (name) VALUES (?)", 
    #     (company.name,)
    # )
    # conn.commit()
    # conn.close()

    # return {
    #     "name": company.name
    # }


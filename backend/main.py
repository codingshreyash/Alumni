from database import get_db_connection, initialize_tables
from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI, Request
from pydantic import BaseModel
import datetime


# creating global reqs
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()
initialize_tables()

# dumb af but makes testing quicker
@app.get("/restart")
def clean_up():
    conn = get_db_connection()
    cursor = conn.cursor()
    tables = cursor.execute("""
                SELECT name FROM sqlite_master WHERE type='table';
    """).fetchall()

    for table in tables:
        cursor.execute(f"DROP TABLE IF EXISTS {table[0]}")
    
    conn.commit()
    conn.close()

    initialize_tables()

    return "reset all tables"

# defining models
class Interview(BaseModel):
    company: str
    pittId: str
    date: str
    role: str

class Member(BaseModel):
    pittId: str
    fname: str
    lname: str
    gradDate: str
    location: str
    company: str

class Company(BaseModel):
    name: str


# Interviews
@app.get("/interviews")
def get_interviews():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM interviews")
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.post("/interviews")
def create_interview(interview: Interview):
    # create company if it does not exist in the database
    # needs to come before interview to satisfy foreign key
    if not get_company(interview.company):
        create_company(Company(name=interview.company))

    conn = get_db_connection()
    cursor = conn.cursor()

    # dates are stored in 'YYYY-MM-DD' format
    date_object = datetime.datetime.strptime(interview.date, '%Y-%m-%d')
    interview.date = date_object.strftime('%Y-%m-%d')

    # values should sanitize input
    cursor.execute(
        "INSERT INTO interviews (company, pittId, date, role) VALUES (?, ?, ?, ?)", 
        (interview.company, interview.pittId, interview.date, interview.role)
    )
    conn.commit()
    conn.close()

    return {
        "company": interview.company,
        "pittId": interview.pittId,
        "date": interview.date,
        "role": interview.role,
    }


# Companies
@app.get("/companies/{company_name}")
def get_company(company_name: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM companies WHERE name = ?",
        (company_name,)
    )
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.get("/companies")
def get_companies():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM companies")
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.post("/companies")
def create_company(company: Company):
    conn = get_db_connection()
    cursor = conn.cursor()

    # values should sanitize input
    cursor.execute(
        "INSERT INTO companies (name) VALUES (?)", 
        (company.name,)
    )
    conn.commit()
    conn.close()

    return {
        "name": company.name
    }

#Members
@app.get("/members")
def get_members():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM members")
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.post("/members")
def create_member(member: Member):
    conn = get_db_connection()
    cursor = conn.cursor()

    # dates are stored in 'YYYY-MM-DD' format
    date_object = datetime.datetime.strptime(member.gradDate, '%Y-%m-%d')
    member.gradDate = date_object.strftime('%Y-%m-%d')

    # values should sanitize input
    cursor.execute(
        "INSERT INTO members (pittId, fname, lname, gradDate, location, company) VALUES (?, ?, ?, ?, ?, ?)", 
        (member.pittId, member.fname, member.lname, member.gradDate, member.location, member.company)
    )
    conn.commit()
    conn.close()

    # create company if it does not exist in the database
    if not get_company(member.company):
        create_company(Company(name=member.company))

    return {
        "pittId": member.pittId,
        "fname": member.fname,
        "lname": member.lname,
        "gradDate": member.gradDate,
        "location": member.location,
        "company": member.company
    }


# login

@app.post("/register")
def register()

async def check_login(request: Request, call_next):
    pass
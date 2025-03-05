from fastapi import APIRouter

router = APIRouter(tags="companies")

# from pydantic import BaseModel
# class Interview(BaseModel):
#     company: str
#     pittId: str
#     date: str
#     role: str




# Interviews
# @router.get("/interviews")
# def get_interviews():
#     pass
    # conn = get_db_connection()
    # cursor = conn.cursor()
    # cursor.execute("SELECT * FROM interviews")
    # items = [dict(row) for row in cursor.fetchall()]
    # conn.close()
    # return items

# @router.post("/interviews")
# def create_interview():
#     pass
    # # create company if it does not exist in the database
    # # needs to come before interview to satisfy foreign key
    # if not get_company(interview.company):
    #     create_company(Company(name=interview.company))

    # conn = get_db_connection()
    # cursor = conn.cursor()

    # # dates are stored in 'YYYY-MM-DD' format
    # date_object = datetime.datetime.strptime(interview.date, '%Y-%m-%d')
    # interview.date = date_object.strftime('%Y-%m-%d')

    # # values should sanitize input
    # cursor.execute(
    #     "INSERT INTO interviews (company, pittId, date, role) VALUES (?, ?, ?, ?)", 
    #     (interview.company, interview.pittId, interview.date, interview.role)
    # )
    # conn.commit()
    # conn.close()

    # return {
    #     "company": interview.company,
    #     "pittId": interview.pittId,
    #     "date": interview.date,
    #     "role": interview.role,
    # }


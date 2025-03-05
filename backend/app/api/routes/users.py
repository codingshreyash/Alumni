from fastapi import APIRouter

router = APIRouter(tags="users")

# from pydantic import BaseModel
# class User(BaseModel):
#     pittId: str
#     fname: str
#     lname: str
#     gradDate: str
#     location: str
#     company: str


#users
# @router.get("/users")
# def get_users():
#     pass
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM users")
#     items = [dict(row) for row in cursor.fetchall()]
#     conn.close()
#     return items

# @router.post("/users")
# def create_user():
#     pass
#     conn = get_db_connection()
#     cursor = conn.cursor()

#     # dates are stored in 'YYYY-MM-DD' format
#     date_object = datetime.datetime.strptime(user.gradDate, '%Y-%m-%d')
#     user.gradDate = date_object.strftime('%Y-%m-%d')

#     # values should sanitize input
#     cursor.execute(
#         "INSERT INTO users (pittId, fname, lname, gradDate, location, company) VALUES (?, ?, ?, ?, ?, ?)", 
#         (user.pittId, user.fname, user.lname, user.gradDate, user.location, user.company)
#     )
#     conn.commit()
#     conn.close()

#     # create company if it does not exist in the database
#     if not get_company(user.company):
#         create_company(Company(name=user.company))

#     return {
#         "pittId": user.pittId,
#         "fname": user.fname,
#         "lname": user.lname,
#         "gradDate": user.gradDate,
#         "location": user.location,
#         "company": user.company
#     }

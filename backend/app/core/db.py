from sqlmodel import Session, create_engine, SQLModel, select

from app import crud
from app.core.config import settings
from app.models import User, UserCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

# SQLITE_FILE_NAME = "alumni.db"
# SQLITE_URL = f"sqlite:///{SQLITE_FILE_NAME}"


# def get_db_connection():
#     conn = sqlite3.connect(SQLITE_URL)
#     conn.row_factory = sqlite3.Row
#     return conn

# def initialize_tables():
#     conn = get_db_connection()
#     cursor = conn.cursor()

#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS companies (
#             name TEXT PRIMARY KEY
#         )
#     """)


#     # graduated attribute can be inferred from grad year
#     # pittId is first part of email
#     # dates are stored in 'YYYY-MM-DD' format
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS users (
#             pittId TEXT PRIMARY KEY,
#             hashedPass TEXT NOT NULL,
#             fname TEXT NOT NULL,
#             lname TEXT NOT NULL,
#             gradDate INTEGER NOT NULL,
#             location TEXT,
#             company TEXT,
#             FOREIGN KEY (company) references companies(name)
#         )
#     """)

#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS emails (
#             pittId TEXT NOT NULL,
#             altEmail TEXT NOT NULL,
#             PRIMARY KEY (pittId, altEmail),
#             FOREIGN KET (pittId) references users(pittId)
#         )
#     """)

#     # dates are stored in 'YYYY-MM-DD' format
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS interviews (
#             company TEXT NOT NULL,
#             pittId TEXT NOT NULL,
#             date TEXT NOT NULL,
#             role TEXT NOT NULL,
#             order INTEGER NOT NULL,
#             PRIMARY KEY (company, pittId, date),
#             FOREIGN KEY (pittId) REFERENCES users (pittId),
#             FOREIGN KEY (company) REFERENCES companies (name)
#         )
#     """)
#     conn.commit()
#     conn.close()

def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            full_name="Admin Admin"
        )
        user = crud.create_user(session=session, user_create=user_in)
from fastapi.security import OAuth2PasswordBearer
from urllib.parse import quote_plus

HOST = "localhost"
USER = "postgres"
PASSWORD = quote_plus("your-password")
PORT = 5432
DATABASE = "innovator_assessment"

CONNECTION_STRING = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

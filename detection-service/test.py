from jose import jwt

SECRET_KEY = "latifa18."
ALGORITHM = "HS256"

data = {
    "sub": "1"
}

token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

print(token)
import time
from os.path import exists, join
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from typing import List, Optional, Literal
from pydantic import BaseModel, TypeAdapter


class BaseName(BaseModel):
    """Base model for objects with a single name field."""

    name: str


class FeaturedType(BaseName):
    """
    Model for the type field in the JSON.
    Inherits from BaseName.
    """


class Category(BaseName):
    """
    Model for the category field in the JSON.
    Inherits from BaseName.
    """


class Author(BaseName):
    """
    Model for the authors field in the JSON.
    Inherits from BaseName.
    """


class Page(BaseModel):
    """
    Model for the pages in the volumes field.

    Attributes:
        page (int): The page number.
        filename (str): The filename associated with the page.
    """

    page: int
    filename: str


class Volume(BaseModel):
    """
    Model for the volumes field in the JSON.

    Attributes:
        nth (int): The volume number.
        cover_image (str): The cover image URL of the volume.
        title (str): The title of the volume.
        description (str): The description of the volume.
        pages (List[Page]): A list of pages in the volume.
    """

    nth: int
    cover_image: str
    title: str
    description: str
    pages: List[Page]


class Book(BaseModel):
    """
    Main model for a book in the JSON.

    Attributes:
        id (int): The book ID.
        cover_image (str): The cover image URL of the book.
        title (str): The title of the book.
        year (int): The publication year of the book.
        description (str): The description of the book.
        type (Type): The featured type of the book.
        category (List[Category]): A list of categories of the book.
        authors (List[Author]): A list of authors of the book.
        volumes (List[Volume]): A list of volumes of the book.
        altTitle (Optional[str]): The alternative title of the book.
    """

    id: int
    cover_image: str
    title: str
    year: int
    description: str
    type: FeaturedType
    category: List[Category]
    authors: List[Author]
    volumes: List[Volume]
    altTitle: Optional[str]

class User(BaseModel):
    """
    Model for a user in the JSON.

    Attributes:
        id (int): The user ID.
        firstName (str): The first name of the user.
        lastName (str): The last name of the user.
        username (str): The username of the user.
        email (str): The email of the user.
        password (str): The password of the user.
        avatar (str): The avatar URL of the user.
        gender (str): The gender of the user.
        phone (str): The phone number of the user.
        birthday (str): The birthday of the user.
        status (bool): The status of the user.
        createdAt (int): The creation timestamp of the user.
        modifiedAt (int): The modification timestamp of the user.
    """

    id: int
    firstName: str
    lastName: str
    username: str
    email: str
    password: str
    avatar: str
    gender: str
    phone: str
    birthday: str
    status: bool
    createdAt: int
    modifiedAt: int


class UserRequest(BaseModel):
    """
    Model for a user request in the JSON.

    Attributes:
        username (str): The username of the user.
        email (str): The email of the user.
        password (str): The password of the user.
    """

    username: str
    email: str
    password: str
    avatar: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Load JSON data
with open("./public/books", "r", encoding="utf-8") as file:
    books = TypeAdapter(List[Book]).validate_json(file.read())

with open("./public/users", "r", encoding="utf-8") as file:
    users = TypeAdapter(List[User]).validate_json(file.read())

@app.get("/api/users")
def get_all_users(response: Response) -> List[User]:
    response.headers["Cache-Control"] = "no-store"
    return users

@app.post("/api/users")
def create_user(user_request: UserRequest) -> User:
    print(user_request)
    user = User(
        id=max(u.id for u in users) + 1 if users else 1,
        firstName="",
        lastName="",
        username=user_request.username,
        email=user_request.email,
        password=user_request.password,
        avatar=user_request.avatar,
        gender="",
        phone="",
        birthday="",
        status=True,
        createdAt=int(time.time()),
        modifiedAt=int(time.time())
    )
    users.append(user)
    return user



@app.get("/api/books")
def get_all_books(
    feature: Optional[Literal["trending", "new", "featured"]] = None
) -> List[Book]:
    if feature:
        return [book for book in books if book.type.name.lower() == feature.lower()]
    return books


@app.get("/api/books/{book_id}")
def get_book_by_id(book_id: int) -> Book:
    for book in books:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.get("/api/books/{book_id}/{volume_number}")
def get_book_volume(book_id: int, volume_number: int) -> Volume:
    book = get_book_by_id(book_id)
    for volume in book.volumes:
        if volume.nth == volume_number:
            return volume
    raise HTTPException(status_code=404, detail="Volume not found")


@app.get("/api/books/{book_id}/{volume_number}/{page_number}")
def get_book_page(book_id: int, volume_number: int, page_number: int):
    volume = get_book_volume(book_id, volume_number)
    for page in volume.pages:
        if page.page == page_number:
            filename = page.filename
            file_path = join("public", "content", "1", filename)
            if exists(file_path):
                return RedirectResponse(url=f"/api/content/1/{filename}")
            raise HTTPException(status_code=404, detail="Page file not found")

    raise HTTPException(status_code=404, detail="Page not found")


# Serve static files
app.mount("/api", StaticFiles(directory="./public"), name="public")


@app.get("/")
async def docs_redirect():
    return RedirectResponse(url='/docs')

# Run the server
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0")

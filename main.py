import base64
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request, File, UploadFile

from PIL import Image
import uvicorn
import cv2 as cv
import numpy as np

app = FastAPI(root_path="/")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="static/templates")

origins = ["http://localhost:8855", "http://localhost:8855/upload_file", "*"]


@app.get("/", response_class=HTMLResponse)
async def display_home(request: Request):
    return templates.TemplateResponse('home.html', {'request': request})


@app.post("/upload_file")
async def upload_file(user_image: UploadFile = File(...)):
    image = Image.open(user_image.file)

    np_image = np.asanyarray(image)
    np_image = np.array(np_image, dtype='uint8')
    color = cv.cvtColor(np_image, cv.IMREAD_ANYCOLOR)

    emotions = ["success"]

    image_bytes = cv.imencode('.png', color)[1]
    encoded_image_string = base64.b64encode(image_bytes)

    return {"image": encoded_image_string, "emotions": emotions}


if __name__ == "__main__":
    uvicorn.run(
        app,  # type: ignore
        host="localhost",
        port=8855,
    )

import time
from io import BytesIO

from PIL import Image
from PIL.Image import Resampling
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import UploadedFile
from tensorflow.keras.preprocessing import image

from flowers.constants import IMAGE_SIZE
import numpy as np

from flowers.types import ResizeData


def resize_images(
        image_files: list[UploadedFile],
        resize_data: list[ResizeData]
) -> list[tuple[ContentFile, np.ndarray]]:
    result: list[tuple[ContentFile, np.ndarray]] = []

    for idx, img_file in enumerate(image_files):
        result.append(_resize_image(img_file, resize_data[idx], idx))

    return result


def _resize_image(image_file: UploadedFile, resize_data: ResizeData, idx: int) -> tuple[ContentFile, np.ndarray]:
    img = Image.open(image_file)
    min_side = min(img.width, img.height)
    scale = IMAGE_SIZE / min_side
    new_size = (int(img.width * scale), int(img.height * scale))
    img_resized = img.resize(new_size, Resampling.LANCZOS)

    x_offset = resize_data.get('xOffset', 0) * -1
    y_offset = resize_data.get('yOffset', 0) * -1

    img_cropped = img_resized.crop((
        x_offset,
        y_offset,
        x_offset + IMAGE_SIZE,
        y_offset + IMAGE_SIZE
    ))

    img_array = image.img_to_array(img_cropped)

    buffer = BytesIO()
    img_cropped.save(buffer, format=img.format)
    buffer.seek(0)

    return ContentFile(buffer.read(), name=f'{int(time.time())}_{idx}.{image_file.name.split('.')[-1]}'), img_array

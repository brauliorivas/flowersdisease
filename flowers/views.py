import time

from PIL.Image import Resampling
from django.shortcuts import render
from django.http import HttpResponse
import json
from PIL import Image
from io import BytesIO
from .models import PredictionRequest
from django.core.files.base import ContentFile

IMAGE_SIZE = 224

# Create your views here.
def index(request):
    return render(request, "index.html")


def predict(request):
    if request.method == "POST":
        images = request.FILES.getlist('images')

        data_json = request.POST.get('data')
        data = json.loads(data_json) if data_json else {}

        resized_images = []
        for idx, img_file in enumerate(images):
            img = Image.open(img_file)
            min_side = min(img.width, img.height)
            scale = IMAGE_SIZE / min_side
            new_size = (int(img.width * scale), int(img.height * scale))
            img_resized = img.resize(new_size, Resampling.LANCZOS)

            x_offset = data[idx].get('xOffset', 0) * -1
            y_offset = data[idx].get('yOffset', 0) * -1

            img_cropped = img_resized.crop((
                x_offset,
                y_offset,
                x_offset + IMAGE_SIZE,
                y_offset + IMAGE_SIZE
            ))

            buffer = BytesIO()
            img_cropped.save(buffer, format=img.format)
            buffer.seek(0)
            resized_images.append(buffer)

        prediction_request = PredictionRequest.objects.create()

        for idx, buffer in enumerate(resized_images):
            buffer.seek(0)
            image_file = ContentFile(buffer.read(), name=f'{int(time.time())}_{idx}.png')
            prediction_request.images.create(image=image_file)

        return HttpResponse(f"Imágenes recibidas: {len(images)}, Data: {data}")

    return HttpResponse("Solo se permite POST", status=405)

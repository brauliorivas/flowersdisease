from django.shortcuts import redirect
from django.core.files.uploadedfile import UploadedFile
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from .constants import LABELS
from .models import PredictionRequest, PredictionImage, PredictionResponse, Prediction

from .services.image_resizer import resize_images
from .services.predictor import make_prediction
from .types import ResizeData


# Create your views here.
def index(request):
    return render(request, "index.html")


def predict(request):
    if request.method == "POST":
        images: list[UploadedFile] = request.FILES.getlist('images')

        data_json = request.POST.get('data')
        data: list[ResizeData] = json.loads(data_json) if data_json else []

        resized_images = resize_images(images, data)
        prediction_request = PredictionRequest.objects.create()
        prediction_response = PredictionResponse.objects.create(prediction_request=prediction_request)

        for idx, (resized_image_file, resized_image_array) in enumerate(resized_images):
            prediction_image = PredictionImage.objects.create(image=resized_image_file)
            prediction_request.images.add(prediction_image)
            prediction_request.save()

            prediction_result = make_prediction(resized_image_array)

            for label, confidence in prediction_result.items():
                prediction = Prediction.objects.create(
                    image=prediction_image,
                    label=LABELS[label],
                    confidence=confidence
                )
                prediction_response.predictions.add(prediction)
                prediction_response.save()

        return JsonResponse({'redirect_url': f"/results/{prediction_response.uuid}"})

    return HttpResponse("Solo se permite POST", status=405)

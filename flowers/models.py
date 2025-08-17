from django.db import models
import uuid


class PredictionRequest(models.Model):
    images = models.ManyToManyField('PredictionImage')


class PredictionImage(models.Model):
    image = models.ImageField(upload_to='prediction_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Prediction(models.Model):
    label = models.CharField(max_length=100, default=None)
    confidence = models.FloatField(default=0.0)
    image = models.ForeignKey('PredictionImage', on_delete=models.CASCADE, default=None)


class PredictionResponse(models.Model):
    uuid = models.UUIDField(primary_key=True, editable=False, auto_created=True, default=uuid.uuid4())
    prediction_request = models.ForeignKey(PredictionRequest, on_delete=models.CASCADE)
    predictions = models.ManyToManyField(Prediction)
    created_at = models.DateTimeField(auto_now_add=True)

from django.db import models

# Create your models here.

class Prediction(models.Model):
    result = models.CharField(max_length=200)

class PredictionRequest(models.Model):
    images = models.ManyToManyField('PredictionImage')

class PredictionImage(models.Model):
    image = models.ImageField(upload_to='prediction_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

from django.db import models

# Create your models here.

class Prediction(models.Model):
    result = models.CharField(max_length=200)


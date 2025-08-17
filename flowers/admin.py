from django.contrib import admin

from flowers.models import Prediction, PredictionRequest, PredictionImage, PredictionResponse

# Register your models here.

admin.site.register(Prediction)
admin.site.register(PredictionRequest)
admin.site.register(PredictionImage)
admin.site.register(PredictionResponse)
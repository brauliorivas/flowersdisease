from django.contrib import admin

from flowers.models import Prediction, PredictionRequest, PredictionImage

# Register your models here.

admin.site.register(Prediction)
admin.site.register(PredictionRequest)
admin.site.register(PredictionImage)
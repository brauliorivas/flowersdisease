from django.apps import AppConfig
from tensorflow.keras.models import load_model


class FlowersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'flowers'
    model = None

    def ready(self):
        try:
            if not self.model:
                self.model = load_model('flowers/trained_models/best_model.h5')
                print("Model loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {e}")

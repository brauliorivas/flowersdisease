from django.apps import apps
import numpy as np

from flowers.constants import LABELS
from flowers.services.image_preprocessor import preprocess_image

model = apps.get_app_config('flowers').model


def make_prediction(image_array: np.ndarray) -> dict[str, float]:
    pre_processed_image = preprocess_image(image_array)
    batch_of_images = np.vstack([pre_processed_image])

    result: dict[str, float] = {}
    prediction: list[float] = model.predict(batch_of_images)[0]

    for i in range(len(prediction)):
        label = list(LABELS.keys())[i]
        result[label] = prediction[i]

    return result

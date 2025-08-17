
import numpy as np

def preprocess_image(image_array: np.ndarray) -> np.ndarray:
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    if image_array.shape != (1, 224, 224, 3):
        image_array = np.resize(image_array, (1, 224, 224, 3))
    return image_array
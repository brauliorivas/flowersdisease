
import numpy as np

def preprocess_image(image_array: np.ndarray) -> np.ndarray:
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array
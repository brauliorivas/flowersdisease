export function init() {
	window.addEventListener("DOMContentLoaded", function () {

		const IMAGE_BOX_SIZE = 224;
		const WHEEL_SENSITIVITY = 0.1;

		const imageStyle = {
			height: "100%",
			width: "100%",
			objectFit: "cover",
		};

		const realFileInput = document.getElementById("realFileInput");
		const fileInput = document.getElementById("fileInput");
		const imageBox = document.getElementById("imageBox");
		const nextButton = document.getElementById("nextButton");
		const prevButton = document.getElementById("prevButton");
		const submitButton = document.getElementById("submitButton");
		const count = document.getElementById("count");

		let images = {};
		let currentImageIndex = 0;

		function getCookie(name) {
			let cookieValue = null;
			if (document.cookie && document.cookie !== "") {
				const cookies = document.cookie.split(";");
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].trim();
					if (cookie.substring(0, name.length + 1) === (name + "=")) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}

		const csrftoken = getCookie("csrftoken");

		fileInput.addEventListener("click", function () {
			if (realFileInput) {
				realFileInput.click();
			}
		});

		submitButton.addEventListener("click", function () {

			imageBox.innerHTML = `
				<span id="loader"
					class="absolute top-1/2 right-1/2 loading loading-infinity w-36"
					style="transform: translate(50%, -50%)"
        		></span>
			`;

			const formData = new FormData();
			Object.keys(images).forEach(key => {
				const imageData = images[key];
				formData.append("images", imageData.file);
			});
			formData.append("data", JSON.stringify(
				Object.values(images).map(image => ({
					xOffset: image.xOffset,
					yOffset: image.yOffset,
				}))
			));

			fetch("/predict", {
				method: "POST",
				body: formData,
				headers: {
					"X-CSRFToken": csrftoken
				}
			}).then(response => {
				if (response.ok) {
					console.log("Images uploaded successfully!");
				} else {
					console.log("Failed to upload images.");
				}
			}).catch(async () => {
				console.log("Failed to upload images.");
			}).finally(() => {

			});
		});

		function setUpMovement(imageData) {
			const imageElement = imageData.element;
			imageElement.onload = function () {
				imageData.width = imageElement.naturalWidth;
				imageData.height = imageElement.naturalHeight;
				if (imageData.width === IMAGE_BOX_SIZE && imageData.height === IMAGE_BOX_SIZE) {
					return;
				}
				if (imageData.width > imageData.height) {
					imageData.xOffsetLimit = IMAGE_BOX_SIZE - (imageData.width / (imageData.height / IMAGE_BOX_SIZE));
					imageElement.style.objectPosition = "0px 50%";
					imageElement.addEventListener("mousewheel", function (event) {
						event.preventDefault();
						const delta = event.deltaY * WHEEL_SENSITIVITY * -1;
						imageData.xOffset += delta;
						if (imageData.xOffset > 0) {
							imageData.xOffset = 0;
						} else if (imageData.xOffset < imageData.xOffsetLimit) {
							imageData.xOffset = imageData.xOffsetLimit;
						}
						imageElement.style.objectPosition = `${imageData.xOffset}px 50%`;
					});
				} else {
					imageData.yOffsetLimit = IMAGE_BOX_SIZE - (imageData.height / (imageData.width / IMAGE_BOX_SIZE));
					imageElement.style.objectPosition = "50% 0px";
					imageElement.addEventListener("mousewheel", function (event) {
						event.preventDefault();
						const delta = event.deltaY * WHEEL_SENSITIVITY * -1;
						imageData.yOffset += delta;
						if (imageData.yOffset > 0) {
							imageData.yOffset = 0;
						} else if (imageData.yOffset < imageData.yOffsetLimit) {
							imageData.yOffset = imageData.yOffsetLimit;
						}
						imageElement.style.objectPosition = `50% ${imageData.yOffset}px`;
					});
				}
			}
		}

		function updateImage() {
			const imageData = images[currentImageIndex];
			imageBox.innerHTML = "";
			imageBox.appendChild(imageData.element);
			count.textContent = `${currentImageIndex + 1} / ${Object.keys(images).length}`;
		}

		realFileInput.addEventListener("change", function () {
			if (realFileInput.files && realFileInput.files.length > 0) {
				images = {};
				for (let i = 0; i < realFileInput.files.length; i++) {
					const url = URL.createObjectURL(realFileInput.files[i]);
					const img = new Image();
					img.src = url;
					Object.assign(img.style, imageStyle);
					images[i] = {
						element: img,
						file: realFileInput.files[i],
						xOffset: 0,
						yOffset: 0,
						previewUrl: url
					};
					setUpMovement(images[i]);
				}
				currentImageIndex = 0;
				updateImage();
			}
		});

		function navigateImages(offset) {
			const numberOfImages = Object.keys(images).length;
			if (numberOfImages > 0) {
				let newImageIndex = currentImageIndex + offset;
				if (newImageIndex < 0) {
					newImageIndex = numberOfImages - 1;
				} else if (newImageIndex >= numberOfImages) {
					newImageIndex = 0;
				}
				currentImageIndex = newImageIndex;
				imageBox.innerHTML = "";
				updateImage();
			}
		}

		nextButton.addEventListener("click", () => navigateImages(1));
		prevButton.addEventListener("click", () => navigateImages(-1));

	});
}

const IMAGE_BOX_SIZE = 500;
const WHEEL_SENSITIVITY = 0.4;

const imageStyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
};

window.addEventListener("DOMContentLoaded", function () {

    var realFileInput = document.getElementById("realFileInput");
    var fileInput = document.getElementById("fileInput");
    var imageBox = document.getElementById("imageBox");
    var nextButton = document.getElementById("nextButton");
    var prevButton = document.getElementById("prevButton");

    var imageUrls = {};
    var currentImageIndex = 0;

    fileInput.addEventListener("click", function () {
        if (realFileInput) {
            realFileInput.click();
        }
    });

    function setUpMovement(imageData) {
        var imageElement = imageData.element;
        imageElement.onload = function () {
            if (imageElement.naturalWidth === IMAGE_BOX_SIZE && imageElement.naturalHeight === IMAGE_BOX_SIZE) {
                return;
            }
            if (imageElement.naturalWidth > imageElement.naturalHeight) {
                imageElement.style.objectPosition = "0px 50%";
                imageElement.addEventListener("mousewheel", function (event) {
                    event.preventDefault();
                    var delta = event.deltaY * WHEEL_SENSITIVITY * -1;
                    imageData.xOffset += delta;
                    imageElement.style.objectPosition = `${imageData.xOffset}px 50%`;
                });
            } else {
                imageElement.style.objectPosition = "50% 0px";
                imageElement.addEventListener("mousewheel", function (event) {
                    event.preventDefault();
                    var delta = event.deltaY * WHEEL_SENSITIVITY * -1;
                    imageData.yOffset += delta;
                    imageElement.style.objectPosition = `50% ${imageData.yOffset}px `;
                });
            }
        }
    }

    function updateImage() {
        var imageData = imageUrls[currentImageIndex];
        imageBox.innerHTML = "";
        imageBox.appendChild(imageData.element);
    }

    realFileInput.addEventListener("change", function () {
        if (realFileInput.files && realFileInput.files.length > 0) {
            imageUrls = {};
            for (var i = 0; i < realFileInput.files.length; i++) {
                var url = URL.createObjectURL(realFileInput.files[i]);
                var img = new Image();
                img.src = url;
                Object.assign(img.style, imageStyle);
                imageUrls[i] = {
                        element: img,
                        file: realFileInput.files[i],
                        height: img.height,
                        width: img.width,
                        xOffset: 0,
                        yOffset: 0,
                        previewUrl: url
                    };
                setUpMovement(imageUrls[i]);
            }
            currentImageIndex = 0;
            updateImage();
        }
    });

    function navigateImages(offset) {
        var numberOfImages = Object.keys(imageUrls).length;
        if (numberOfImages > 0) {
            var newImageIndex = currentImageIndex + offset;
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
window.addEventListener("DOMContentLoaded", function () {

    var realFileInput = document.getElementById("realFileInput");
    var fileInput = document.getElementById("fileInput");


    fileInput.addEventListener("click", function () {
        if (realFileInput) {
            realFileInput.click();
        }
    });
});
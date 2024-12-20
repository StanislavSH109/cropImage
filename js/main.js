import Cropper from "../node_modules/cropperjs";

document.addEventListener('DOMContentLoaded',  () => {
    const uploadButton = document.querySelector('.button__upload');
    const downloadButton = document.querySelector('.button__download');
    const resetButton = document.querySelector('.button__reset');
    const image  = document.querySelector('.view-window__photo');
    const viewWindow = document.querySelector('.view-window__preview');
    let cropper = null;
    
    uploadButton.addEventListener('change',  (e) => {
        const file = e.target.files[0];
        if(file) {
            const blobUrl = URL.createObjectURL(file);
            image.src = blobUrl;
        }

        image.onload = () => {
            if(cropper) {
                cropper.destroy();
            }

            viewWindow.classList.add('view-window__preview--active');
            cropper = new Cropper(image, {
                aspectRatio: 10 / 10,
                viewMode: 0,
                preview: '.view-window__preview',
                minCanvasHeight: 500,
                minCanvasWidth: 300,
            });
        }
    });

    resetButton.addEventListener('click', () => {
        if(cropper) {
            cropper.reset();
        } else {
            alert('Please, upload your image!');
        }
    });

    downloadButton.addEventListener('click', () => {
        if(cropper) {
            const canvas = cropper.getCroppedCanvas();
            const dataUrl =   canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'file-cropped.png';
            link.click();
        } else {
            alert('Please, upload and crop your image');
        }
    });
});



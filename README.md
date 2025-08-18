# RosAI

This is a Django app that uses a CNN to determine the condition of a rose based on an image of its leaves.


## Build and Run

1. **Create and activate a virtual environment**

Windows:
```bash
python -m venv .venv
.venv\Scripts\activate
```

Linux or MacOS:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

Make sure to keep the virtual environment activated for the rest of the steps.

2. **Install python dependencies**
   
```bash
pip install -r requirements.txt
```

If you are on Windows and get an error when installing numpy, try installing Visual Studio C++ Packages using Visual Studio Installer.

3. **Install npm dependencies**

```bash
npm install
```

4. **Build JS and CSS files**

```bash
npm run build
```

5. **Copy the model**

> [!NOTE]
> If you are an evaluator, you can skip this step as the project will already contain the model.

Copy the ```best_model.h5``` file to the ```flowers/trained_models/``` directory.
You can download it from [here](https://1drv.ms/u/c/9574bc705d4338eb/Efn-2j5Ze05KvFQMIN_FahsBSZArWWBSOREMKFYTm5m8Tg?e=QTlfpp).

7. **Apply the DB migrations**

```bash
python manage.py migrate
```

8. **Run the dev server**

```bash
python manage.py runserver
```

> [!WARNING]
> As this app serves images, please keep running in dev mode with ```runserver```.

## How to use
### Upload and focus images

Use the image button to select one or more images.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b6ee4257-8c07-48af-99f9-fc82cf8a5206" />

The square will show you which section of the image the CNN will actually analyze. 

You can use your mouse scroll wheel to determine where the focus should be. Use the arrow buttons to navigate through your selected images.

### Analyze images

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8e3298e3-7146-4cf7-83b9-0079e264fd5f" />

Use the network button to analyze your selected images. You will be redirected to the results view.

### Review results

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20762048-dd93-4dbc-bd3c-5f0434d9b21b" />

Hover on the polar chart to see the confidence values. Use the legend to hide/unhide one or more labels.

You can scroll on the rectangle to navigate through all the results (if you selected more than one image).

Use the plus button to go back to the main view and perform another analysis.

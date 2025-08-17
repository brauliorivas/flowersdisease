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

3. **Build JS and CSS files**

```bash
npm run build
```

5. **Apply the DB migrations**

```bash
python manage.py migrate
```

6. **Run the dev server**

```bash
python manage.py runserver
```

[!NOTE]
As this app serves images, please keep running in dev mode with ```runserver```.


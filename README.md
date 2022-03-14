# Issue Manager

## For Backend

1. Clone the repository and enter that directory

`git clone https://github.com/mahiworld/Issue-Manager.git`

2. Go inside api directory within main app
`cd api`

3. Create a virtual environment 

`virtualenv -p python3 flask-react-venv`

4. Activate the environment

`source './flask-react-venv/bin/activate'`

5. Install the requirments

`pip install -r requirements.txt`

6. Launch the server

`flask run`


## For Database
`python`

`from api import db`

`db.create_all()`

## For Frontend

### To run development enviroment in react

1. Go inside main app


2. Install npm dependencies

`npm install`

3. Run development server

`npm start`
 

### To compile the frontend changes before pushing to server

`npm run build`


<!-- ### For Setting up the DevServer Proxy in Practice
1. Added a proxy field to package.json file

`"proxy": "http://localhost:3000"`

2.   

`"start-flask-api": "cd api && flask-react-venv/bin/flask run"`

The DevServer Proxy will take care of the absolute paths in the development environment. -->

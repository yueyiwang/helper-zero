# helper-zero

## Setup steps

### Clone Repo

`git clone https://github.com/sonia-y/helper-zero.git`

`cd helper-zero`

### Backend-related setup
`cd backend`

`pip install pipenv`

#### Start up a shell
`pipenv shell` 
Press Ctrl-D to exit out of shell. Make sure to always start up a shell before coding in python.

`pipenv install` to install all dependencies

`python manage.py runserver` to start up a server

If you run `http://localhost:8000/api/organizations/` you should be able to see a UI where you can can directly POST/PUT/DELETE `organization` objects

### Frontend-related setup

`cd frontend`

`brew install yarn` if you don't have yarn

`yarn install` to install all dependencies

`yarn start` to spin up a server

If you go to `http://localhost:3000` you should be able to see the app!


### Other
When you make changes to the `model.py` file, make sure to run migrations by running `python manage.py makemigrations helper_zero`

# Port.er
Porter is a service that allows users to donate spare supplies to local organizations that are affected by COVID-19.

If you have unopened medical supplies, disinfectant, or toiletries and wish to donate them, Porter will attempt to find organizations in need near you.

If you're an organization affected by COVID-19, registering your organization and putting out requests for supplies is simple as well!

## Local Setup

### Clone Repo

`git clone https://github.com/sonia-y/helper-zero.git`

`cd helper-zero`

### Backend Setup
```
cd backend

# if you don't have pipenv
pip install pipenv

# control-D to exit the shell;
# always develop with a shell open
pipenv shell 

# install dependencies
pipenv install

# spin up the backend
python manage.py runserver
```

### Database Migrations
When you make changes to the `model.py` file, make sure to run migrations by running `python manage.py makemigrations` and `python manage.py migrate`

### Environment Variables
Port.er uses a few environment variables for setting up authentication and our integration with Twilio for SMS and email. You'll need to set up your own keys in either `.env` files or as a local environment variable in `~/.bashrc`:

```
# SMS Support
export TWILIO_ACCOUNT_SID= <YOUR_SID>
export TWILIO_AUTH_TOKEN= <AUTH_TOKEN>
export TWILIO_NUMBER= <TWILIO_NUMBER>

# Email Support
export SENDGRID_API_KEY= <SENDGRID_API_KEY>

# OAuth
export GOOGLE_CLIENT_ID= <GOOGLE_CLIENT_ID>
```

You'll also need the following in `porter/frontend/.env`:

`REACT_APP_GOOGLE_CLIENT_ID= <GOOGLE_CLIENT_ID>`

### Frontend Setup

```
cd frontend

# if you don't have yarn
brew install yarn

# install all dependencies
yarn install

# spin up a server
yarn start
```

Navigate to `http://localhost:3000` to see the main frontend entrypoint!

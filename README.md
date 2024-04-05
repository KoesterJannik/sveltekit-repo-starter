# Sveltekit starter repo

## Prerequisites
1. You need to have an AWS Account to get your credentials
2. In order to send emails, you need to connect your domain to ses and verify it
3. After that go to AWS Credentials and provide your access key and secret key in the .env. Better create a custom user with only the necessary permissions

## How to use

1. Clone the repo
2. Rename the .env.example file to .env and fill in your values
3. Run `docker-compose up -d` to start the development Postgres database. So make sure you have Docker installed.
4. Run `npm install` to install the dependencies
5. Run `npm run dev` to start the development server
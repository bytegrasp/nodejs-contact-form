# nodejs-contact-form

An example app showcasing an HTML contact form with Node.js that sends an email on success.
The form is implemented with Alpine and Tailwind, and the backend API is implemented with Express, Express-Validator and Nodemailer.

## Getting started

Run the app locally using the following commands:

```
yarn install
yarn start
```

## Docker image

The repository provides a Dockerfile that bundles the form and api inside a single Docker image based on Alpine Linux.
Use the following commands to build the image and run a Docker container:

```
yarn build
docker build -f .docker/Dockerfile -t flortsch/nodejs-contact-form:0.0.1-SNAPSHOT .
docker run -p 1234:80 flortsch/nodejs-contact-form:0.0.1-SNAPSHOT
```

## Production build

For production builds, change the SMTP connection settings and CORS origin URL in `src/api/config.production.js`.
You then have to pass `-e NODE_ENV="production"` to the Docker container for the production config to apply.


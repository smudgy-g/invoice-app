# Vue 3 Invoice App

## Description

The Vue 3 Invoice App is a small web application designed to help users track invoices easily. It allows users to create, draft, and track invoices based on their statuses, such as pending, paid, or draft. The app leverages the power of Vue.js 3 and TypeScript for frontend development and integrates with Google Firebase for data storage.
Features

- Create and manage invoices
- Track invoices based on statuses: pending, paid, or draft
- Store invoice data securely using Google Firebase
- Responsive design for seamless usage on desktop and mobile devices

## Configuration

Before using the app, you need to set up a Google Firebase project and configure Firebase credentials in the app. Follow these steps:

1. Create a new Firebase project at Firebase Console.

Obtain your Firebase configuration object, which includes the following variables:

- VUE_API_KEY
- VUE_AUTH_DOMAIN
- VUE_PROJECT_ID
- VUE_STORAGE_BUCKET
- VUE_MESSAGE_SENDER_ID
- VUE_APP_ID
- VUE_MEASUREMENT_ID

2. Create a .env file in the root directory of the project.

3. Add the Firebase configuration variables to the .env file in the following format:

```
VUE_API_KEY=your-api-key
VUE_AUTH_DOMAIN=your-auth-domain
VUE_PROJECT_ID=your-project-id
VUE_STORAGE_BUCKET=your-storage-bucket
VUE_MESSAGE_SENDER_ID=your-message-sender-id
VUE_APP_ID=your-app-id
VUE_MEASUREMENT_ID=your-measurement-id
```

Save the .env file.

With the .env file configured, the Vue 3 Invoice App will be able to connect to your Firebase project and use the provided credentials for authentication and data storage.

## Project Setup

After cloning the repository, install the dependancies. You will need a google firebase acount to access data.

```sh
npm install
```

# Elasticsearch with React JS 

Here we are building a node application with Elasticsearch
And a frontend application with Ract Js

## Getting Started

Here we are using Elastic search cloud trial.

### Create an Elasticsearch Cloud account

Create a trial account on Elasticsearch Cloud and update the `.elastic.env` file with the credentials.

### Install dependencies and run the backend

To install the dependencies and start the app, run the following commands:

```bash
cd backend
npm install
node create-index.js
node index.js
```

[Note: create-index will create the index. Rerunning it will error in resource already exists, hence only need to run firt time and only if new index is getting added]

### Install dependencies and run the frontend

To install the dependencies and start the app, run the following commands:

```bash
cd frontend
npm install
npm run dev
```

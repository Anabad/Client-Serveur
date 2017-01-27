# Client-Serveur

## Introduction

This app is a simple app of car management.
The server is made with EmberJS and use JSON API
The Client uses React, Redux and Foundation
We used webpack + babel for speeding up the dev flow

## Installation
```
cd Serveur
npm install
cd ../Client
npm install
```
## Start

```
cd ../Serveur
npm start
cd ../Client
npm start
```

[Test the app] (http://localhost:8080)

## Id
```
Username : Maxime
Password : ember
```
or
```
Username : Pierre-Aymeric
Password : react
```
## Additional infos

**Important** : We tried to get the client to refresh when deleting,adding or updating a car, we got some issues with accessing the state in callback functions, because of binding of issues. So after hitting a delete, add or update, **you have to reload the page** to see the changes :(

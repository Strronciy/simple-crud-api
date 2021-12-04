# Simple CRUD API

## Install:

Put host into .env file in format `PORT=host`  
For example:   
```PORT=4000```

Run app: `npm run start`  
Run app this watch: `npm run start:dev`  
Build and run app in production mode: `npm run start:prod`

## Details:

API path `/person`:  
    **GET**  
    `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`  
    **POST**  
    `/person` is used to create record about new person and store it in database  
    **PUT**  
    `/person/${personId}` is used to update record about existing person  
    **DELETE**  
    `/person/${personId}` is used to delete record about existing person from database

Person to POST/PUT methods is `object` that have following properties:  
    * `name` — person's name (`string`, **required**)  
    * `age` — person's age (`number`, **required**)  
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
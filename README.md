# Transporter

Transporter backend

## Prerequisite
- Node v8 or upper
- yarn or npm

## How to use
- copy dotenv from `./deploy/env/dev/dotenv` to .env
- first run this command if never do before : `npm install or yarn install`
- then start service : `npm start or yarn start`
- normally service will serve with port 6485 (http://localhost:6485)

## Provided API
- GET /shipping/:shippingId : for get shipping detail
- POST /shipping : for create new shipping detail
```
  Example request body for POST /shipping:
  {
	"from": "from string test",
	"to": "to string test",
	"itemDetail": "item string test"
  }
```
```
  Example response : 
  {
    "success": true,
    "developerMessage": "Success",
    "shippingId": "THF9SV636J"
}
```
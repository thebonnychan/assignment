# To view locally...

# Assumption: Node js is installed on pc.

# Open assignment folder and install modules

npm i

# Open terminal/cmd inside server folder, install modules and start server

npm i
npm run dev

# Create a .env file in server folder with Base64 encode workflow token and secret

VITE_API_KEY = "Basic base64_encode(workflow_token:workflow_secret)"

# cd into client folder, install modules and run

npm i
npm run dev

# Open localhost in browser

http://localhost:5173/

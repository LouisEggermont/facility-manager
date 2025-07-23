run frontend with npm run dev -w pwa
install package npm install @nuxt/ui -w pwa  
from the root of the project
make firebase application and add credentials to .env (look at .env.example)

run api: npm run start:dev -w api

run docker container: Use docker-compose up -d or the VS Code Docker extension to start the database. To check the database, I love to use MongoDB Compass

seeding: npx nestjs-command seed:database:buildings & npx nestjs-command seed:reset:buildings

for authentication of user with nestjs, download firebase project settings: Get a service account from the Firebase console: Project settings > Service accounts > Generate new private key: remame it to "firebase-project-settings.json" and add it to the /packages/api/secrets folder

get bearer token from frontend: "\_\_firebase.firebaseUser.value.getIdToken().then(token => console.log('Bearer ' + token))" in the browser console

header of graphql playground :
{
"authorization": "Bearer REPLACEMEWITHTOKEN"
}

credentials.json in i18n folder, see github issue #33

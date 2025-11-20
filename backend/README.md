# Backend (Spring Boot) for Recipe App


This is a minimal Spring Boot backend intended to work with the front-end in the parent folder.

Features implemented:
- Endpoints under `/auth` for register, login and getting the user from a token.
- Endpoints under `/recipes` for adding, listing (myRecipes), getting, deleting and updating recipes.
- H2 file-based database (development) so data persists across server restarts.
- Simple token-based auth (token stored on the user record). Not production secure — intended for dev.
- Image upload stored in `backend/uploads` and returned as file name in the recipe `imagePath`.

Run (Windows PowerShell)
From the `backend` folder run:

```powershell
mvn spring-boot:run
```

The server will start on http://localhost:3001

H2 console: http://localhost:3001/h2-console (JDBC URL: `jdbc:h2:file:./backend/data/recipedb`)

Notes:
- The front-end expects `Authorization: Bearer <token>` headers. The backend issues a simple UUID token at login/register and stores it on the user row.
- This is a simple development backend. For production use, swap to JWT, hash passwords, and secure file storage.
- Uploaded images are placed in `backend/uploads` and served under `/uploads/{filename}`.


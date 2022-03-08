- __GET /videogames__:
    Retrieves a list of the first 100 games listed on `https://api.rawg.io/api/games/`  
- __GET /videogames?name="..."__:
    Retrieves a list of the first 15 games matching the `name` query
- __GET /videogame/{idVideogame}__:
    Retrieves a game that matches the `id` parameter
- __GET /genres__:
    Retrieves all the genres from `https://api.rawg.io/api/genres/`  
- __POST /videogame__:
    Submits a new game to the database
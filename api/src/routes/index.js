const axios = require('axios');
const { Router } = require('express');
const Op = require('sequelize').Op;
const { Videogame, Genre, Platform } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const MAIN_API_KEY = 'e5f114eae8b64fbb890185bbb9dbee73';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getGames);
router.get('/videogame/:id', searchHandler);
router.post('/videogame', addGame);
router.get('/genres', getGenres);

router.get('/platforms', getPlatforms);

const template = (obj) => {
  return {
    id: obj.id,
    uuid: obj.uuid ?? null,
    title: obj.name ?? null,
    released: new Date(obj.released).toISOString() ?? null,
    description: obj.description_raw ?? obj.description ?? null,
    rating: obj.rating ?? null,
    thumbnail: obj.background_image ?? null,
    total_ratings: obj.ratings_count ?? null,
    reviews: obj.reviews_count ?? null,
    platforms: obj?.platforms?.map(platform => platform.platform.name) ?? null,
    Genres: obj.genres?.map(genre => ({ id: genre.id, name: genre.name })) ?? null,
    // tags: obj?.tags?.map(tag => tag.language === 'eng' && tag.name).filter(e => e) ?? null,
    ESRB: (obj.esrb_rating?.name || obj.esrb_rating) ?? null
  };
};

// - GET https://api.rawg.io/api/games
async function getGames(req, res) {
  const name = req.query?.name;

  const handlePagination = async (url, dest) => {

    await axios(url)
      .then(r => {
        r.data.results.map(e => dest.push(template(e)));
        if (dest.length !== 100) {
          console.log('[!] getGames => -1 request LuL ...');
          return handlePagination(r.data.next, dest);
        }
      }).catch(e => console.log(e));
  };

  let output = [];

  if (name) {
    output = await axios(`https://api.rawg.io/api/games?search=${encodeURIComponent(name)}&key=${MAIN_API_KEY}`)
      .then(r => {
        const results = r.data.results.slice(0, 15);
        return results.map(result => template(result));
      });

    return res.status(200).send(output);
  } else {
    await handlePagination(`https://api.rawg.io/api/games?key=${MAIN_API_KEY}`, output);
  }

  const dbResults = await Videogame.findAll()
    .then(result => Promise.all(result.map(async game => ({ ...template(game.dataValues), Genres: (await game.getGenres()).map(g => ({ id: g.id, name: g.name })), platforms: (await game.getPlatforms()).map(p => p.name) }))));

  output = output.concat(dbResults);

  if (output) {
    res.status(200).send(output);
  } else {
    res.status(503).send({ message: "Error fetching games." });
  }

}
// - GET https://api.rawg.io/api/games?search={game}
// - GET https://api.rawg.io/api/games/{id}
async function searchHandler(req, res) {
  const id = req.params.id;
  const validID = Number(id);

  if (!validID) return res.status(404).send({ message: "Invalid id format." });

  const url = `https://api.rawg.io/api/games/${id}?key=${MAIN_API_KEY}`;

  const apiResponse = await axios(url)
    .then(r => ({ success: true, data: template(r.data) }))
    .catch(e => ({ success: false, data: e?.response.data }));

  console.log('[!] searchHandler => -1 request LuL ...');

  //TODO: differentiate between api / db responses
  await Videogame.findOne({
    where: {
      id: id
    },
    include: Genre
  }).then(r => apiResponse.push({ ...template(r), Genres: r.Genres.map(genre => ({ id: genre.id, name: genre.name })) }))
    .catch((e) => console.log(e));

  if (apiResponse.success) {
    return res.status(200).send(apiResponse.data);
  } else {
    return res.status(503).send(apiResponse.data);
  }

}

// - GET https://api.rawg.io/api/genres
async function getGenres(req, res) {

  let genres = await Genre.findAll();

  if (!genres.length) {

    const apiGenres = await axios(`https://api.rawg.io/api/genres?key=${MAIN_API_KEY}`)
      .then(r => r.data.results)
      .catch(e => e.response.data);

    console.log('[!] getGenres => -1 request LuL ...');

    Promise.all(apiGenres.map(async genre => {
      const name = genre.name;
      const id = genre.id;
      await Genre.findOrCreate({
        where: {
          id,
          name
        }
      });
    })).then(async () => {
      genres = await Genre.findAll();
    }).catch(() => res.status(503).send({ message: "Error fetching genres" }));

  }
  
  return res.status(200).send(genres);
}


async function getPlatforms(req, res) {

  let platforms = await Platform.findAll();

  if (!platforms.length) {
    const apiPlatforms = await axios(`https://api.rawg.io/api/platforms?key=${MAIN_API_KEY}`)
      .then(r => r.data.results)
      .catch(e => e.response.data);

    console.log('[!] getPlatforms => -1 request LuL ...');

    Promise.all(apiPlatforms.map(async platform => {
      const name = platform.name;
      const id = platform.id;
      await Platform.findOrCreate({
        where: {
          id,
          name
        }
      }).then(async () => {
        platforms = await Platform.findAll();
      }).catch(() => res.status(503).send({ message: "Error fetching platforms" }));
    }));

  }

  return res.status(200).send(platforms);
}


//router.post('/videogame', addGame);
async function addGame(req, res) {
  let { name, description, release_date, rating, genres, platforms } = req.body.data;

  platforms = platforms.map(platform => platform.id);
  genres = genres.map(genre => Number(genre.id));

  const description_raw = description;
  const released = release_date;

  const response = await Videogame.findOrCreate({
    where: {
      name,
      description_raw,
      released,
      rating,
    }
  }).then(r => r[0]).catch((err) => {
    const errorString = String(err).replace(/(\w+): (.+)/g, '[$1] $2');
    console.log(errorString);
  });

  if (!response) {
    return res.status(500).send({
      message: 'Error posting data.',
      success: false,
    });
  }

  if (response._options.isNewRecord) {
    genres.forEach(id => response.setGenres(id));
    platforms.forEach(platform => response.setPlatforms(platform));
    return res.status(200).send({
      message: 'game added successfully!',
      success: true,
      data: { ...response.dataValues, genres: (await response.getGenres()).map(g => ({ id: g.id, name: g.name })), platforms: (await response.getPlatforms()).map(p => p.name) }
    });
  } else {
    return res.status(304).send({
      message: 'game already exists!',
      success: false,
      data: { ...response.dataValues, genres: await response.getGenres(), platforms: await response.getPlatforms() }
    });
  }

}


module.exports = router;
const express = require('express');
const router = express.Router();
const AnimeModel = require('../models/animeModel');

router.route('/search')
  .get((req, res) => {
    let animeSearch = req.query;
    AnimeModel.searchSeries(animeSearch, (err, series) => {
      res.status(err ? 400 : 200).send(err || series);
    });
  });

router.route('/watchlist')
  .post((req, res) => {
    let animeToWatch = req.body;
    AnimeModel.addToWatchList(animeToWatch, (err, watchList) => {
      res.status(err ? 400 : 200).send(err || watchList);
    });
  })
  .get((req, res) => {
    AnimeModel.readData('towatch', (err, toWatch) => {
      res.status(err ? 400 : 200).send(err || toWatch);
    });
  })
  .delete((req, res) => {
    let id = req.query;
    console.log('req.query: ', req.query);
    AnimeModel.deleteTowatch(id, (err, undeletedWatchList) => {
      res.status(err ? 400 : 200).send(err || undeletedWatchList);
    });
  });

router.route('/favorites')
  .post((req, res) => {
    let animeToWatch = req.body;
    AnimeModel.addFavorite(animeToWatch, (err, favorites) => {
      res.status(err ? 400 : 200).send(err || favorites);
    });
  })
  .get((req, res) => {
    AnimeModel.readData('favorites', (err, favorites) => {
      res.status(err ? 400 : 200).send(err || favorites);
    });
  })
  .delete((req, res) => {
    let id = req.query;
    AnimeModel.deleteFavorite(id, (err, undeletedFavorites) => {
      res.status(err ? 400 : 200).send(err || undeletedFavorites);
    });
  });

module.exports = router;

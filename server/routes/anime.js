const express = require('express');
const router = express.Router();
const AnimeModel = require('../models/animeModel');

router.route('/search')
  .get((req, res) => {
    let animeSearch = req.query;
    console.log('req.query in anime route: ', animeSearch);
    AnimeModel.searchSeries(animeSearch, (err, series) => {
      // console.log('series tof: ', typeof series);
      // res.send(series);
      res.status(err ? 400 : 200).send(err || series);
    });
  });

router.route('/watchlist')
  .post((req, res) => {
    let animeToWatch = req.body;
    console.log('animeToWatch in anime route: ', animeToWatch);
    AnimeModel.addToWatchList(animeToWatch, (err, watchList) => {
      res.status(err ? 400 : 200).send(err || watchList);
    });
  });

router.route('/favorites')
  .post((req, res) => {
    let animeToWatch = req.body;
    // console.log('animeToWatch in anime route: ', animeToWatch);
    AnimeModel.addFavorite(animeToWatch, (err, watchList) => {
      res.status(err ? 400 : 200).send(err || watchList);
    });
  });
  // .post((req, res) => {
  //   AnimeModel.saveTweet(req.body, (err, savedTweets) => {
  //     res.status(err ? 400 : 200).send(err || savedTweets);
  //   });
  // });

// router.route('/:keyWords')
//   .get((req, res) => {
//     let keyWords = req.params.keyWords;
//     AnimeModel.getTweets(keyWords, (err, tweets) => {
//       res.status(err ? 400 : 200).send(err || tweets);
//     })
//   });

// router.route('/save/:id')
//   .delete((req, res) => {
//     let id = req.params.id;
//     AnimeModel.deleteTweet(id, (err, undeletedTweets) => {
//       res.status(err ? 400 : 200).send(err || undeletedTweets);
//     })
//   });

module.exports = router;

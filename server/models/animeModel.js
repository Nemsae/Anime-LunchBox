// const axios = require('axios');
const { get } = require('axios');
require('dotenv').load();
const connection = require('../config/db');
const squel = require('squel').useFlavour('mysql');

const favoritesTable = 'favorites';
const toWatchTable = 'towatch';

// connection.query(`CREATE TABLE IF NOT EXISTS ${toWatchTable} (
//    animeId INT(100),
//    status VARCHAR(100),
//    title VARCHAR(100),
//    episodes VARCHAR(100),
//    image VARCHAR(500),
//    summary VARCHAR(2000),
//    type VARCHAR(100),
//    started VARCHAR(100),
//    finished VARCHAR(100),
//    rating INT(100),
//    rated VARCHAR(100),
//    genres VARCHAR(500),
//    id INT NOT NULL AUTO_INCREMENT,
//    PRIMARY KEY (id)
// )`, (err) => {
//   if (err) throw err;
// });

exports.searchSeries = (animeSearch, cb) => {
  get(`http://hummingbird.me/api/v1/search/anime?query=${animeSearch.anime}`)
    .then((res) => {
      console.log('res.data: ', res.data);
      cb(null, res.data);
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

exports.addFavorite = (favorite, cb) => {
  exports.readData(favoritesTable, (err, favorites) => {
    if (err) throw (err);
    let filter = (item) => {
      return item.id !== favorite.id;
    };
    if (favorites.every(filter)) {
      exports.create(favoritesTable, favorite, cb);
    }
  });
};

exports.deleteFavorite = (id, cb) => {
  let currId = parseInt(id.id);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${favoritesTable} WHERE animeId = ${currId}`, (err, undeletedFavorites) => {
      if (err) return reject(err);
      exports.readData(favoritesTable, (err, data) => {
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};

exports.deleteTowatch = (id, cb) => {
  let currId = parseInt(id.id);
  console.log('currId deleteToWatch: ', currId);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${toWatchTable} WHERE animeId = ${currId}`, (err, undeletedWatchList) => {
      if (err) return reject(err);
      exports.readData(toWatchTable, (err, data) => {
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};

exports.addToWatchList = (toWatch, cb) => {
  exports.readData(toWatchTable, (err, toWatchList) => {
    if (err) throw (err);
    let filter = (item) => {
      return item.id !== toWatch.id;
    };
    if (toWatchList.every(filter)) { // fix filter
      exports.create(toWatchTable, toWatch, cb);
    }
  });
};

exports.readData = function (tablename, cb) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, data) => {
      if (err) return reject(err);
      // resolve(favorites);
      cb(null, data);
    });
  });
};

exports.create = (tablename, anime, cb) => {
  let animeRow = {
    animeId: anime.id,
    status: anime.status,
    title: anime.title,
    episodes: anime.episode_count,
    image: anime.cover_image,
    summary: (anime.synopsis).replace(/'/g, "''"),
    type: anime.show_type,
    started: anime.started_airing,
    finished: anime.finished_airing,
    rating: anime.community_rating,
    rated: anime.age_rating,
    genres: JSON.stringify(anime.genres)
  };

  console.log('animeRow: ', animeRow);

  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename) //  insert tablename
      .setFields(animeRow)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
      exports.readData(tablename, (err, data) => { //  insert tablename
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};

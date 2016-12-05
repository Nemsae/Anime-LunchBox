const admin = require('./firebaseAdmin');

module.exports = function (req, res, next) {
  let token = req.headers['x-auth-token'];
  console.log('token: ', token);

  admin.auth().verifyIdToken(token || '')
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(401).send({error: 'Must be authenticated.'});
    });
};

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectByAccess } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  let query = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`
  console.log('req.user:', req.user);
  console.log('query', query);
    // let level = req.user.clearance_level;
    pool
      .query(query, [req.user.clearance_level])

      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log('Error making SELECT for secrets:', error);
        res.sendStatus(500);
      });
});

module.exports = router;

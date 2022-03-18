const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { id } = req.params;
    console.log("this is the whole req", req);

    db.query(`SELECT * FROM dishes;`)
      .then((data) => {
        const dishes = data.rows;
        res.json({ dishes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
  return router;
};
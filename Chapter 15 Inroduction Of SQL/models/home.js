// Core Modules
const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) { // update
      return db.query(
        'UPDATE airbnb.homes SET name=$1, price=$2, location=$3, rating=$4, imageurl=$5, description=$6 WHERE id=$7',
        [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]
      );
    } else { // insert
      return db.query(
        'INSERT INTO airbnb.homes (name, price, location, rating, imageurl, description) VALUES ($1, $2, $3, $4, $5, $6)',
        [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]
      );
    }
  }

  static fetchAll() {
    return db.query('SELECT * FROM airbnb.homes');
  }

  static findById(homeId) {
    return db.query('SELECT * FROM airbnb.homes WHERE id=$1', [homeId]);
  }

  static deleteById(homeId) {
    return db.query('DELETE FROM airbnb.homes WHERE id=$1', [homeId]);
  }
};
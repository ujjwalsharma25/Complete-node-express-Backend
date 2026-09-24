const getDb = require("../utils/databaseUtil").getDB;

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId; // home._id.toString() ke saath match karega
  }

  save() {
    const db = getDb();
    return db.collection("favourites").insertOne(this);
  }

  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(houseId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ houseId: houseId });
  }
};
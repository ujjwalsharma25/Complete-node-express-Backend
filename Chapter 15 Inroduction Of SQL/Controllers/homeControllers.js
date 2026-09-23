const Home = require("../models/home");

function mapHome(row) {
  return {
    id: row.id,
    houseName: row.name,
    price: row.price,
    location: row.location,
    rating: row.rating,
    photoUrl: row.imageurl,
    description: row.description,
  };
}

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(result => {
    const homes = result.rows.map(mapHome);
    const home = homes[0];
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(result => {
    const registeredHomes = result.rows.map(mapHome);
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(
    houseName,
    price === '' ? null : price,
    location,
    rating === '' ? null : rating,
    photoUrl,
    description
  );
  home.save().then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while adding home:', error);
    res.redirect("/host/add-home");
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(
    houseName,
    price === '' ? null : price,
    location,
    rating === '' ? null : rating,
    photoUrl,
    description,
    id
  );
  home.save().then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while editing home:', error);
    res.redirect("/host/host-home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting ', error);
  })
};
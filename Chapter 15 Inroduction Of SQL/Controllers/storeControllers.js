const Favourite = require("../models/favourite");
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

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(result => {
    const registeredHomes = result.rows.map(mapHome);
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(result => {
    const registeredHomes = result.rows.map(mapHome);
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll().then(result => {
    const registeredHomes = result.rows.map(mapHome);
    res.render("store/booking", {
      registeredHomes: registeredHomes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
    })
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll().then(result => {
      const registeredHomes = result.rows.map(mapHome);
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(String(home.id)));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })
};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  })
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(result => {
    const homes = result.rows.map(mapHome);
    const home = homes[0];
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  })
};
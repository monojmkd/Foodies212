const express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let db;
(async () => {
  db = await open({
    filename: './BD4_1/database.sqlite',
    driver: sqlite3.Database,
  });
  console.log('Database connected successfully');
})();

// Exercise 1
async function fetchAllRestaurants() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants', async (req, res) => {
  try {
    let results = await fetchAllRestaurants();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 2
async function getRestaurantById(id) {
  let query = 'SELECT * FROM restaurants WHERE id=?';
  let response = await db.get(query, [id]);
  return { restaurant: response };
}
app.get('/restaurants/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await getRestaurantById(id);
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 3
async function fetchRestaurantsByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine=?';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await fetchRestaurantsByCuisine(cuisine);
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 4
async function getRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg=? AND hasOutdoorSeating=? AND isLuxury=?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}
app.get('/restaurants/filter/', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let results = await getRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 5
async function getRestaurantsByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let results = await getRestaurantsByRating();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 6
async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes', async (req, res) => {
  try {
    let results = await fetchAllDishes();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 7
async function filterDishById(id) {
  let query = 'SELECT * FROM dishes WHERE id=? ';
  let response = await db.all(query, [id]);
  return { dishes: response };
}
app.get('/dishes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await filterDishById(id);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 8
async function getDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg=?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let results = await getDishesByFilter(isVeg);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Exercise 9
async function sortDishByPrice() {
  let query = 'SELECT * FROM dishes ORDER BY price';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let results = await sortDishByPrice();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found.' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

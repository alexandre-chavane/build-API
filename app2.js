const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware:

// Http func, url, status code time and size
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello From Middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'));

// Route Handlers
// Create - Tour
const createTour = (req, res) => {
  // Create new ID
  const newId = tours[tours.length - 1].id + 1;

  const idOj = { id: newId };

  // Add 2 objs together
  const newTour = Object.assign(idOj, req.body);

  // Add to the older obj
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
  console.log(req.body);
  // res.send('Done!');
};

// Read - Getting all tours
const getAllTours = (req, res) => {
  console.log(req.requestTime); // Was manipule on middle
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requstedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

// Read - Get One Tour
const getTour = (req, res) => {
  // convert from string to number
  let { id } = req.params;
  id *= 1;

  const tour = tours.find((el) => el.id === id);

  // if (id >= tours.length || id < 0) {
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID ',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Update Tour
const updateTour = (req, res) => {
  let { id } = req.params;
  id *= 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID ',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Placeholder>',
    },
  });
};

// Delete Tour
const deleteTour = (req, res) => {
  let { id } = req.params;
  id *= 1;

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID ',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Create User
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

// Get All users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

// Solution 1
/*
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

// Solution 2
app.route('/api/v1/tours').post(createTour).get(getAllTours);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Users
app.route('/api/v1/users').post(createUser).get(getAllUsers);

app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

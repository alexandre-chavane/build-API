const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

exports.checkId = (req, res, next, val) => {
  console.log(`Id is iqual to: ${val}`);

  if (req.params.id >= tours.length || req.params.id < 0) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID ',
    });
  }
  next();
};

// Challenge
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!(name && price)) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Bad Request',
    });
  }
  next();
};
// Route Handlers
// Create - Tour
exports.createTour = (req, res) => {
  //exports. Create new ID
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
exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
  // convert from string to number
  let { id } = req.params;
  id *= 1;

  const tour = tours.find((el) => el.id === id);

  // Some func
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Update Tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Placeholder>',
    },
  });
};

// Delete Tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

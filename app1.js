const fs = require('fs');
const express = require('express');

const app = express();

// Able to sand json file from a client
app.use(express.json());

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello World!');
//   res.status(200).json({ name: 'Alexandre', age: 45, date: Date.now() });
// });

// app.post('/', (req, res) => {
//   res.send('You Can Post to this URL');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

// Getting all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Get One Tour localhost/api/v1/tours/10   - /:x/:y
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// Create new tour
app.post('/api/v1/tours', (req, res) => {
  // Create new ID
  const newId = tours[tours.length - 1].id + 1;

  const idOj = { id: newId };

  // Add 2 objs together
  const newTour = Object.assign(idOj, req.body);

  // Add to the older obj
  tours.push(newTour);
  // fs.writeFile()
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  console.log(req.body);
  // res.send('Done!');
});

// Update
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// Delete
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

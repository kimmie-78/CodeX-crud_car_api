import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import path from 'path'; 

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const API_URL = 'https://bootcamp.projectcodex.co/cars.json';

let cars = [];


// Fetch all cars
app.get('/cars', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        cars = response.data;
        res.json(cars);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Create a new car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Update a car
app.put('/cars/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const updatedCar = req.body;

    const index = cars.findIndex(car => car.reg_number === reg_number);

    if (index !== -1) {
        cars[index] = updatedCar;
        res.json(updatedCar);
    } else {
        res.status(404).send('Car not found');
    }
});

// Delete a car
app.delete('/cars/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const initialLength = cars.length;

    cars = cars.filter(car => car.reg_number !== reg_number);

    if (cars.length < initialLength) {
        res.sendStatus(204);
    } else {
        res.status(404).send('Car not found');
    }
});

// Get the most popular car make
app.get('/cars/mostPopularMake', (req, res) => {
    const carMakes = cars.map(car => car.make);
    const makeCount = carMakes.reduce((acc, make) => {
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    const mostPopularMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);

    res.json({ mostPopularMake });
});
//checking
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


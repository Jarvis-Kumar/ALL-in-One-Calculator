const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const homeRoutes = require('./routes/home');
const financialRoutes = require('./routes/financial');
const healthRoutes = require('./routes/health');
const conversionRoutes = require('./routes/conversion');
const geometryRoutes = require('./routes/geometry');
const mathRoutes = require('./routes/math');

app.use('/', homeRoutes);
app.use('/financial', financialRoutes);
app.use('/health', healthRoutes);
app.use('/conversion', conversionRoutes);
app.use('/geometry', geometryRoutes);
app.use('/math', mathRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Allin1Calculator running on port ${PORT}`);
});
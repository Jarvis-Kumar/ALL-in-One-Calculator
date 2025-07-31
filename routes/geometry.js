const express = require('express');
const router = express.Router();

// Geometry calculators list
router.get('/', (req, res) => {
    const calculators = [
        { name: '2D Distance Calculator', url: '/geometry/distance-2d', icon: 'move' },
        { name: '3D Distance Calculator', url: '/geometry/distance-3d', icon: 'box' },
        { name: 'Circle Calculator', url: '/geometry/circle', icon: 'circle' },
        { name: 'Rectangle Calculator', url: '/geometry/rectangle', icon: 'square' },
        { name: 'Triangle Calculator', url: '/geometry/triangle', icon: 'triangle' },
        { name: 'Cube Calculator', url: '/geometry/cube', icon: 'box' },
        { name: 'Sphere Calculator', url: '/geometry/sphere', icon: 'circle' },
        { name: 'Cylinder Calculator', url: '/geometry/cylinder', icon: 'cylinder' },
        { name: 'Cone Calculator', url: '/geometry/cone', icon: 'triangle' },
        { name: 'Square Calculator', url: '/geometry/square', icon: 'square' }
    ];
    
    res.render('category', { 
        title: 'Geometry Calculators',
        category: 'Geometry',
        description: 'Calculate area, volume, perimeter for various shapes',
        calculators: calculators
    });
});

// Circle Calculator
router.get('/circle', (req, res) => {
    res.render('calculators/circle', { title: 'Circle Calculator' });
});

router.post('/circle', (req, res) => {
    const { radius } = req.body;
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    const diameter = 2 * radius;
    
    res.json({
        area: area.toFixed(2),
        circumference: circumference.toFixed(2),
        diameter: diameter.toFixed(2)
    });
});

// 2D Distance Calculator
router.get('/distance-2d', (req, res) => {
    res.render('calculators/distance-2d', { title: '2D Distance Calculator' });
});

router.post('/distance-2d', (req, res) => {
    const { x1, y1, x2, y2 } = req.body;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
    res.json({
        distance: distance.toFixed(4)
    });
});

// 3D Distance Calculator
router.get('/distance-3d', (req, res) => {
    res.render('calculators/distance-3d', { title: '3D Distance Calculator' });
});

router.post('/distance-3d', (req, res) => {
    const { x1, y1, z1, x2, y2, z2 } = req.body;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    
    res.json({
        distance: distance.toFixed(4)
    });
});

// Rectangle Calculator
router.get('/rectangle', (req, res) => {
    res.render('calculators/rectangle', { title: 'Rectangle Calculator' });
});

router.post('/rectangle', (req, res) => {
    const { length, width } = req.body;
    const area = length * width;
    const perimeter = 2 * (parseFloat(length) + parseFloat(width));
    const diagonal = Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2));
    
    res.json({
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        diagonal: diagonal.toFixed(2)
    });
});

// Triangle Calculator
router.get('/triangle', (req, res) => {
    res.render('calculators/triangle', { title: 'Triangle Calculator' });
});

router.post('/triangle', (req, res) => {
    const { a, b, c } = req.body;
    const s = (parseFloat(a) + parseFloat(b) + parseFloat(c)) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = parseFloat(a) + parseFloat(b) + parseFloat(c);
    
    res.json({
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2)
    });
});

// Cube Calculator
router.get('/cube', (req, res) => {
    res.render('calculators/cube', { title: 'Cube Calculator' });
});

router.post('/cube', (req, res) => {
    const { side } = req.body;
    const volume = Math.pow(side, 3);
    const surfaceArea = 6 * Math.pow(side, 2);
    const diagonal = side * Math.sqrt(3);
    
    res.json({
        volume: volume.toFixed(2),
        surfaceArea: surfaceArea.toFixed(2),
        diagonal: diagonal.toFixed(2)
    });
});

// Sphere Calculator
router.get('/sphere', (req, res) => {
    res.render('calculators/sphere', { title: 'Sphere Calculator' });
});

router.post('/sphere', (req, res) => {
    const { radius } = req.body;
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
    const diameter = 2 * radius;
    
    res.json({
        volume: volume.toFixed(2),
        surfaceArea: surfaceArea.toFixed(2),
        diameter: diameter.toFixed(2)
    });
});

// Cylinder Calculator
router.get('/cylinder', (req, res) => {
    res.render('calculators/cylinder', { title: 'Cylinder Calculator' });
});

router.post('/cylinder', (req, res) => {
    const { radius, height } = req.body;
    const volume = Math.PI * Math.pow(radius, 2) * height;
    const surfaceArea = 2 * Math.PI * radius * (parseFloat(radius) + parseFloat(height));
    
    res.json({
        volume: volume.toFixed(2),
        surfaceArea: surfaceArea.toFixed(2)
    });
});

// Cone Calculator
router.get('/cone', (req, res) => {
    res.render('calculators/cone', { title: 'Cone Calculator' });
});

router.post('/cone', (req, res) => {
    const { radius, height } = req.body;
    const volume = (1/3) * Math.PI * Math.pow(radius, 2) * height;
    const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
    const surfaceArea = Math.PI * radius * (parseFloat(radius) + slantHeight);
    
    res.json({
        volume: volume.toFixed(2),
        surfaceArea: surfaceArea.toFixed(2),
        slantHeight: slantHeight.toFixed(2)
    });
});

// Square Calculator
router.get('/square', (req, res) => {
    res.render('calculators/square', { title: 'Square Calculator' });
});

router.post('/square', (req, res) => {
    const { side } = req.body;
    const area = Math.pow(side, 2);
    const perimeter = 4 * side;
    const diagonal = side * Math.sqrt(2);
    
    res.json({
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        diagonal: diagonal.toFixed(2)
    });
});

module.exports = router;
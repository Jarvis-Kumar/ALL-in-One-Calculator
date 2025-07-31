const express = require('express');
const router = express.Router();

// Health calculators list
router.get('/', (req, res) => {
    const calculators = [
        { name: 'BMI Calculator', url: '/health/bmi', icon: 'activity' },
        { name: 'BMR Calculator', url: '/health/bmr', icon: 'zap' },
        { name: 'Calorie Calculator', url: '/health/calories', icon: 'apple' },
        { name: 'Body Fat Calculator', url: '/health/body-fat', icon: 'user' },
        { name: 'Ideal Weight Calculator', url: '/health/ideal-weight', icon: 'target' }
    ];
    
    res.render('category', { 
        title: 'Health & Fitness Calculators',
        category: 'Health & Fitness',
        description: 'Calculate BMI, calories, ideal weight and more health metrics',
        calculators: calculators
    });
});

// BMI Calculator
router.get('/bmi', (req, res) => {
    res.render('calculators/bmi', { title: 'BMI Calculator' });
});

router.post('/bmi', (req, res) => {
    const { weight, height, unit } = req.body;
    let bmi;
    
    if (unit === 'metric') {
        bmi = weight / ((height / 100) * (height / 100));
    } else {
        bmi = (weight / (height * height)) * 703;
    }
    
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    res.json({
        bmi: bmi.toFixed(1),
        category: category
    });
});

// BMR Calculator
router.get('/bmr', (req, res) => {
    res.render('calculators/bmr', { title: 'BMR Calculator' });
});

router.post('/bmr', (req, res) => {
    const { weight, height, age, gender, unit } = req.body;
    let bmr;
    
    if (unit === 'metric') {
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    } else {
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight * 0.453592) + (4.799 * height * 2.54) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight * 0.453592) + (3.098 * height * 2.54) - (4.330 * age);
        }
    }
    
    res.json({
        bmr: bmr.toFixed(0),
        sedentary: (bmr * 1.2).toFixed(0),
        light: (bmr * 1.375).toFixed(0),
        moderate: (bmr * 1.55).toFixed(0),
        active: (bmr * 1.725).toFixed(0),
        veryActive: (bmr * 1.9).toFixed(0)
    });
});

// Calorie Calculator
router.get('/calories', (req, res) => {
    res.render('calculators/calories', { title: 'Calorie Calculator' });
});

router.post('/calories', (req, res) => {
    const { weight, height, age, gender, activity, goal } = req.body;
    
    // Calculate BMR first
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Apply activity multiplier
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };
    
    const maintenanceCalories = bmr * activityMultipliers[activity];
    
    // Adjust for goal
    let targetCalories;
    switch(goal) {
        case 'lose':
            targetCalories = maintenanceCalories - 500;
            break;
        case 'gain':
            targetCalories = maintenanceCalories + 500;
            break;
        default:
            targetCalories = maintenanceCalories;
    }
    
    res.json({
        bmr: bmr.toFixed(0),
        maintenance: maintenanceCalories.toFixed(0),
        target: targetCalories.toFixed(0)
    });
});

// Body Fat Calculator
router.get('/body-fat', (req, res) => {
    res.render('calculators/body-fat', { title: 'Body Fat Calculator' });
});

router.post('/body-fat', (req, res) => {
    const { weight, height, age, gender, unit } = req.body;
    let bmi;
    
    if (unit === 'metric') {
        bmi = weight / ((height / 100) * (height / 100));
    } else {
        bmi = (weight / (height * height)) * 703;
    }
    
    // Using BMI-based body fat estimation
    let bodyFat;
    if (gender === 'male') {
        bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
        bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
    
    let category;
    if (gender === 'male') {
        if (bodyFat < 6) category = 'Essential Fat';
        else if (bodyFat < 14) category = 'Athletes';
        else if (bodyFat < 18) category = 'Fitness';
        else if (bodyFat < 25) category = 'Average';
        else category = 'Obese';
    } else {
        if (bodyFat < 14) category = 'Essential Fat';
        else if (bodyFat < 21) category = 'Athletes';
        else if (bodyFat < 25) category = 'Fitness';
        else if (bodyFat < 32) category = 'Average';
        else category = 'Obese';
    }
    
    res.json({
        bodyFat: Math.max(0, bodyFat).toFixed(1),
        category: category
    });
});

// Ideal Weight Calculator
router.get('/ideal-weight', (req, res) => {
    res.render('calculators/ideal-weight', { title: 'Ideal Weight Calculator' });
});

router.post('/ideal-weight', (req, res) => {
    const { height, gender, unit } = req.body;
    let heightInCm = unit === 'metric' ? height : height * 2.54;
    
    // Using Devine formula
    let idealWeight;
    if (gender === 'male') {
        idealWeight = 50 + 2.3 * ((heightInCm / 2.54) - 60);
    } else {
        idealWeight = 45.5 + 2.3 * ((heightInCm / 2.54) - 60);
    }
    
    // Convert to pounds if needed
    if (unit === 'imperial') {
        idealWeight = idealWeight * 2.20462;
    }
    
    res.json({
        idealWeight: Math.max(0, idealWeight).toFixed(1),
        unit: unit === 'metric' ? 'kg' : 'lbs'
    });
});

module.exports = router;
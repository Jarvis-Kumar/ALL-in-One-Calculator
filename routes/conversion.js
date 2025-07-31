const express = require('express');
const router = express.Router();

// Conversion calculators list
router.get('/', (req, res) => {
    const calculators = [
        { name: 'Length Converter', url: '/conversion/length', icon: 'ruler' },
        { name: 'Age Calculator', url: '/conversion/age', icon: 'calendar' },
        { name: 'Time Converter', url: '/conversion/time', icon: 'clock' },
        { name: 'Date Calculator', url: '/conversion/date', icon: 'calendar-days' },
        { name: 'GPA Calculator', url: '/conversion/gpa', icon: 'graduation-cap' },
        { name: 'Height Converter', url: '/conversion/height', icon: 'move-vertical' },
        { name: 'Password Generator', url: '/conversion/password', icon: 'key' },
        { name: 'Tip Calculator', url: '/conversion/tip', icon: 'dollar-sign' }
    ];
    
    res.render('category', { 
        title: 'Conversion Calculators',
        category: 'Conversion',
        description: 'Convert units, calculate dates, generate passwords and more',
        calculators: calculators
    });
});

// Length Converter
router.get('/length', (req, res) => {
    res.render('calculators/length-converter', { title: 'Length Converter' });
});

router.post('/length', (req, res) => {
    const { value, from, to } = req.body;
    
    // Conversion rates to meters
    const rates = {
        'mm': 0.001,
        'cm': 0.01,
        'm': 1,
        'km': 1000,
        'in': 0.0254,
        'ft': 0.3048,
        'yd': 0.9144,
        'mi': 1609.34
    };
    
    const meters = value * rates[from];
    const converted = meters / rates[to];
    
    res.json({
        result: converted.toFixed(6)
    });
});

// Age Calculator
router.get('/age', (req, res) => {
    res.render('calculators/age', { title: 'Age Calculator' });
});

router.post('/age', (req, res) => {
    const { birthDate } = req.body;
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    res.json({
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths
    });
});

// Time Converter
router.get('/time', (req, res) => {
    res.render('calculators/time', { title: 'Time Converter' });
});

router.post('/time', (req, res) => {
    const { value, from, to } = req.body;
    
    // Convert to seconds first
    const toSeconds = {
        'seconds': 1,
        'minutes': 60,
        'hours': 3600,
        'days': 86400,
        'weeks': 604800,
        'months': 2629746,
        'years': 31556952
    };
    
    const seconds = value * toSeconds[from];
    const result = seconds / toSeconds[to];
    
    res.json({
        result: result.toFixed(6)
    });
});

// Date Calculator
router.get('/date', (req, res) => {
    res.render('calculators/date', { title: 'Date Calculator' });
});

router.post('/date', (req, res) => {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    
    res.json({
        days: diffDays,
        weeks: diffWeeks,
        months: diffMonths,
        years: diffYears
    });
});

// GPA Calculator
router.get('/gpa', (req, res) => {
    res.render('calculators/gpa', { title: 'GPA Calculator' });
});

router.post('/gpa', (req, res) => {
    const { grades } = req.body;
    
    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    grades.forEach(grade => {
        const points = gradePoints[grade.grade] || 0;
        const credits = parseFloat(grade.credits) || 0;
        totalPoints += points * credits;
        totalCredits += credits;
    });
    
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    res.json({
        gpa: gpa.toFixed(2),
        totalCredits: totalCredits
    });
});

// Height Converter
router.get('/height', (req, res) => {
    res.render('calculators/height', { title: 'Height Converter' });
});

router.post('/height', (req, res) => {
    const { feet, inches, cm } = req.body;
    
    let result = {};
    
    if (cm) {
        // Convert from cm to feet/inches
        const totalInches = cm / 2.54;
        const feetPart = Math.floor(totalInches / 12);
        const inchesPart = totalInches % 12;
        
        result = {
            feet: feetPart,
            inches: inchesPart.toFixed(1),
            cm: cm,
            totalInches: totalInches.toFixed(1)
        };
    } else {
        // Convert from feet/inches to cm
        const totalInches = (parseFloat(feet) * 12) + parseFloat(inches);
        const centimeters = totalInches * 2.54;
        
        result = {
            feet: feet,
            inches: inches,
            cm: centimeters.toFixed(1),
            totalInches: totalInches.toFixed(1)
        };
    }
    
    res.json(result);
});

// Password Generator
router.get('/password', (req, res) => {
    res.render('calculators/password', { title: 'Password Generator' });
});

router.post('/password', (req, res) => {
    const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = req.body;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    res.json({
        password: password,
        strength: length >= 12 ? 'Strong' : length >= 8 ? 'Medium' : 'Weak'
    });
});

// Tip Calculator
router.get('/tip', (req, res) => {
    res.render('calculators/tip', { title: 'Tip Calculator' });
});

router.post('/tip', (req, res) => {
    const { billAmount, tipPercentage, numberOfPeople } = req.body;
    
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = parseFloat(billAmount) + tipAmount;
    const perPerson = totalAmount / numberOfPeople;
    const tipPerPerson = tipAmount / numberOfPeople;
    
    res.json({
        tipAmount: tipAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        perPerson: perPerson.toFixed(2),
        tipPerPerson: tipPerPerson.toFixed(2)
    });
});

module.exports = router;
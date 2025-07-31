const express = require('express');
const router = express.Router();

// Math calculators list
router.get('/', (req, res) => {
    const calculators = [
        { name: 'Percentage Calculator', url: '/math/percentage', icon: 'percent' },
        { name: 'Factorization Calculator', url: '/math/factorization', icon: 'hash' },
        { name: 'Cube Calculator', url: '/math/cube', icon: 'box' },
        { name: 'Cube Root Calculator', url: '/math/cube-root', icon: 'square-root' },
        { name: 'Complex Number Calculator', url: '/math/complex', icon: 'calculator' },
        { name: 'Exponential Calculator', url: '/math/exponential', icon: 'trending-up' },
        { name: 'Boolean Algebra', url: '/math/boolean', icon: 'binary' },
        { name: 'Inequality Calculator', url: '/math/inequality', icon: 'greater-than' }
    ];
    
    res.render('category', { 
        title: 'Math & Algebra Calculators',
        category: 'Math & Algebra',
        description: 'Solve complex equations, calculate percentages and more',
        calculators: calculators
    });
});

// Percentage Calculator
router.get('/percentage', (req, res) => {
    res.render('calculators/percentage', { title: 'Percentage Calculator' });
});

router.post('/percentage', (req, res) => {
    const { value, total, type } = req.body;
    let result;
    
    switch(type) {
        case 'percent_of':
            result = (value / 100) * total;
            break;
        case 'what_percent':
            result = (value / total) * 100;
            break;
        case 'percent_change':
            result = ((total - value) / value) * 100;
            break;
    }
    
    res.json({
        result: result.toFixed(2)
    });
});

// Factorization Calculator
router.get('/factorization', (req, res) => {
    res.render('calculators/factorization', { title: 'Factorization Calculator' });
});

router.post('/factorization', (req, res) => {
    const { number } = req.body;
    const num = parseInt(number);
    const factors = [];
    
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    
    // Prime factorization
    const primeFactors = [];
    let n = num;
    for (let i = 2; i <= n; i++) {
        while (n % i === 0) {
            primeFactors.push(i);
            n = n / i;
        }
    }
    
    res.json({
        factors: factors,
        primeFactors: primeFactors,
        isPrime: factors.length === 2
    });
});

// Cube Calculator
router.get('/cube', (req, res) => {
    res.render('calculators/cube-number', { title: 'Cube Calculator' });
});

router.post('/cube', (req, res) => {
    const { number } = req.body;
    const cube = Math.pow(number, 3);
    
    res.json({
        number: number,
        cube: cube
    });
});

// Cube Root Calculator
router.get('/cube-root', (req, res) => {
    res.render('calculators/cube-root', { title: 'Cube Root Calculator' });
});

router.post('/cube-root', (req, res) => {
    const { number } = req.body;
    const cubeRoot = Math.cbrt(number);
    
    res.json({
        number: number,
        cubeRoot: cubeRoot.toFixed(6)
    });
});

// Complex Number Calculator
router.get('/complex', (req, res) => {
    res.render('calculators/complex', { title: 'Complex Number Calculator' });
});

router.post('/complex', (req, res) => {
    const { a1, b1, a2, b2, operation } = req.body;
    let result = {};
    
    switch(operation) {
        case 'add':
            result = {
                real: parseFloat(a1) + parseFloat(a2),
                imaginary: parseFloat(b1) + parseFloat(b2)
            };
            break;
        case 'subtract':
            result = {
                real: parseFloat(a1) - parseFloat(a2),
                imaginary: parseFloat(b1) - parseFloat(b2)
            };
            break;
        case 'multiply':
            result = {
                real: (a1 * a2) - (b1 * b2),
                imaginary: (a1 * b2) + (b1 * a2)
            };
            break;
    }
    
    res.json({
        result: result,
        formatted: `${result.real} ${result.imaginary >= 0 ? '+' : ''}${result.imaginary}i`
    });
});

// Exponential Calculator
router.get('/exponential', (req, res) => {
    res.render('calculators/exponential', { title: 'Exponential Calculator' });
});

router.post('/exponential', (req, res) => {
    const { base, exponent } = req.body;
    const result = Math.pow(base, exponent);
    
    res.json({
        base: base,
        exponent: exponent,
        result: result
    });
});

// Boolean Algebra
router.get('/boolean', (req, res) => {
    res.render('calculators/boolean', { title: 'Boolean Algebra Calculator' });
});

router.post('/boolean', (req, res) => {
    const { a, b, operation } = req.body;
    const valA = a === 'true';
    const valB = b === 'true';
    let result;
    
    switch(operation) {
        case 'and':
            result = valA && valB;
            break;
        case 'or':
            result = valA || valB;
            break;
        case 'not_a':
            result = !valA;
            break;
        case 'xor':
            result = valA !== valB;
            break;
    }
    
    res.json({
        result: result,
        operation: operation
    });
});

// Inequality Calculator
router.get('/inequality', (req, res) => {
    res.render('calculators/inequality', { title: 'Inequality Calculator' });
});

router.post('/inequality', (req, res) => {
    const { a, b, operator } = req.body;
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let result;
    
    switch(operator) {
        case '>':
            result = numA > numB;
            break;
        case '<':
            result = numA < numB;
            break;
        case '>=':
            result = numA >= numB;
            break;
        case '<=':
            result = numA <= numB;
            break;
        case '==':
            result = numA === numB;
            break;
        case '!=':
            result = numA !== numB;
            break;
    }
    
    res.json({
        result: result,
        statement: `${a} ${operator} ${b} is ${result ? 'TRUE' : 'FALSE'}`
    });
});

module.exports = router;
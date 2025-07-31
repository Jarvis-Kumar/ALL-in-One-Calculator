const express = require('express');
const axios = require('axios');
const router = express.Router();

// Financial calculators list
router.get('/', (req, res) => {
    const calculators = [
        { name: 'Simple Interest', url: '/financial/simple-interest', icon: 'percent' },
        { name: 'Compound Interest', url: '/financial/compound-interest', icon: 'trending-up' },
        { name: 'Currency Converter', url: '/financial/currency-converter', icon: 'dollar-sign' },
        { name: 'Salary Calculator', url: '/financial/salary-calculator', icon: 'briefcase' },
        { name: 'Retirement Calculator', url: '/financial/retirement-calculator', icon: 'calendar' },
        { name: 'Tax Calculator', url: '/financial/tax-calculator', icon: 'receipt' },
        { name: 'Investment Calculator', url: '/financial/investment-calculator', icon: 'bar-chart' }
    ];
    
    res.render('category', { 
        title: 'Financial Calculators',
        category: 'Financial',
        description: 'Calculate interest, convert currencies, plan investments and more',
        calculators: calculators
    });
});

// Simple Interest Calculator
router.get('/simple-interest', (req, res) => {
    res.render('calculators/simple-interest', { title: 'Simple Interest Calculator' });
});

router.post('/simple-interest', (req, res) => {
    const { principal, rate, time } = req.body;
    const interest = (principal * rate * time) / 100;
    const total = parseFloat(principal) + interest;
    
    res.json({
        interest: interest.toFixed(2),
        total: total.toFixed(2)
    });
});

// Compound Interest Calculator
router.get('/compound-interest', (req, res) => {
    res.render('calculators/compound-interest', { title: 'Compound Interest Calculator' });
});

router.post('/compound-interest', (req, res) => {
    const { principal, rate, time, compound } = req.body;
    const amount = principal * Math.pow((1 + rate / (100 * compound)), compound * time);
    const interest = amount - principal;
    
    res.json({
        interest: interest.toFixed(2),
        total: amount.toFixed(2)
    });
});

// Currency Converter
router.get('/currency-converter', (req, res) => {
    res.render('calculators/currency-converter', { title: 'Currency Converter' });
});

router.post('/currency-converter', async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        // Using a free API for currency conversion
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        const converted = (amount * rate).toFixed(2);
        
        res.json({
            converted: converted,
            rate: rate.toFixed(4)
        });
    } catch (error) {
        res.json({ error: 'Unable to fetch exchange rates' });
    }
});

// Salary Calculator
router.get('/salary-calculator', (req, res) => {
    res.render('calculators/salary-calculator', { title: 'Salary Calculator' });
});

router.post('/salary-calculator', (req, res) => {
    const { salary, period } = req.body;
    let hourly, daily, weekly, monthly, yearly;
    
    switch(period) {
        case 'hourly':
            hourly = parseFloat(salary);
            daily = hourly * 8;
            weekly = daily * 5;
            monthly = weekly * 4.33;
            yearly = monthly * 12;
            break;
        case 'daily':
            daily = parseFloat(salary);
            hourly = daily / 8;
            weekly = daily * 5;
            monthly = weekly * 4.33;
            yearly = monthly * 12;
            break;
        case 'weekly':
            weekly = parseFloat(salary);
            daily = weekly / 5;
            hourly = daily / 8;
            monthly = weekly * 4.33;
            yearly = monthly * 12;
            break;
        case 'monthly':
            monthly = parseFloat(salary);
            yearly = monthly * 12;
            weekly = monthly / 4.33;
            daily = weekly / 5;
            hourly = daily / 8;
            break;
        case 'yearly':
            yearly = parseFloat(salary);
            monthly = yearly / 12;
            weekly = monthly / 4.33;
            daily = weekly / 5;
            hourly = daily / 8;
            break;
    }
    
    res.json({
        hourly: hourly.toFixed(2),
        daily: daily.toFixed(2),
        weekly: weekly.toFixed(2),
        monthly: monthly.toFixed(2),
        yearly: yearly.toFixed(2)
    });
});

// Retirement Calculator
router.get('/retirement-calculator', (req, res) => {
    res.render('calculators/retirement-calculator', { title: 'Retirement Calculator' });
});

router.post('/retirement-calculator', (req, res) => {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn } = req.body;
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = annualReturn / 100 / 12;
    
    // Future value of current savings
    const futureCurrentSavings = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);
    
    // Future value of monthly contributions
    const futureContributions = monthlyContribution * (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn;
    
    const totalSavings = futureCurrentSavings + futureContributions;
    
    res.json({
        totalSavings: totalSavings.toFixed(2),
        yearsToRetirement: yearsToRetirement
    });
});

// Tax Calculator
router.get('/tax-calculator', (req, res) => {
    res.render('calculators/tax-calculator', { title: 'Tax Calculator' });
});

router.post('/tax-calculator', (req, res) => {
    const { income, taxRate } = req.body;
    const tax = (income * taxRate) / 100;
    const afterTax = income - tax;
    
    res.json({
        tax: tax.toFixed(2),
        afterTax: afterTax.toFixed(2),
        taxRate: taxRate
    });
});

// Investment Calculator
router.get('/investment-calculator', (req, res) => {
    res.render('calculators/investment-calculator', { title: 'Investment Calculator' });
});

router.post('/investment-calculator', (req, res) => {
    const { principal, rate, time, compoundFreq } = req.body;
    const amount = principal * Math.pow((1 + rate / (100 * compoundFreq)), compoundFreq * time);
    const profit = amount - principal;
    
    res.json({
        finalAmount: amount.toFixed(2),
        profit: profit.toFixed(2),
        totalReturn: ((profit / principal) * 100).toFixed(2)
    });
});

module.exports = router;
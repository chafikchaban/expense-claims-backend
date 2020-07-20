var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Expense = require('./Expense.model')

var db = 'mongodb://localhost:27017/example';

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
var PORT = process.env.PORT || 8080;

const names = ["Chafik", "John", "Selena", "Patrick", "Yasmine"];

/*

// here's a script to quickly add some data 
 
const descriptions= ['Book a flight', 'Food', 'Took a taxi', 'random stuff']

 for (let i = 0; i < 20; i++) {
    let randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    Expense.create(
        {
            name: `Yasmine`,
            amount: Math.floor(Math.random() * (300 - 5 + 1) + 5),
            description: randomDescription,
            startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toDateString(),
            approved: false
        }, function (err, expense) {
            if (err) {
                console.log('error saving expense');
            } else {
                console.log('expense saved successfully ', expense);
            }
        })
} */

app.get('/names', function (req, res) {
    console.log('getting all names');
    res.json(names)
});

app.get('/expenses', function (req, res) {
    console.log('getting all expenses');
    Expense.find({})
        .exec(function (err, expenses) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(expenses);
                res.json(expenses);
            }
        });
});

app.get('/expenses/:id', function (req, res) {
    console.log('getting all expenses');
    Expense.findOne({
        _id: req.params.id
    })
        .exec(function (err, expenses) {
            if (err) {
                res.send('error occured')
            } else {
                console.log(expenses);
                res.json(expenses);
            }
        });
});

app.post('/expense', function (req, res) {
    Expense.create(req.body.expense, function (err, expense) {
        if (err) {
            res.send('error saving expense');
        } else {
            console.log('expense saved successfully ', expense);
            res.send(expense);
        }
    });
});

app.put('/expense/:id', function (req, res) {
    Expense.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body.expense }
        , { upsert: true, new: true },
        function (err, newExpense) {
            if (err) {
                res.send('error updating ');
            } else {
                console.log('successfully updated:', newExpense);
                res.send(newExpense);
            }
        });
});

app.delete('/expense/:id', function (req, res) {
    Expense.findOneAndRemove({
        _id: req.params.id
    }, function (err, expense) {
        if (err) {
            res.send('error removing')
        } else {
            console.log('done', expense);
            res.status(204);
            res.send(expense);
        }
    });
});

app.listen(PORT, function () {
    console.log('listening on port: ', PORT)
})
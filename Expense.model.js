var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    name: String,
    amount: Number,
    description: String,
    startDate: String,
    approved: Boolean
})

module.exports = mongoose.model('Expense', ExpenseSchema);
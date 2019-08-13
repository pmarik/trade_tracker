const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema


/**
 * 
 * Change the following properties:
 *  date --> entryDate 
 *  fees --> stopPrice
 *
 * 
 * Added the following properties:
 *  exitDate --> date object
 *  strategy --> '' string
 *  target   --> num
 *  winLose  --> num
 *  note   --> '' string
 *  numShares --> num
 * 
 */

const ItemSchema = new Schema({
   ticker: { type: String, required: true},
   entry: { type: Number, required: true},
   exit: {type: Number, required: true},
   fees: {type: Number, required: true},
   pL: {type: Number, required: true},
   date: {type: Date, required: true}
}, {
    timestamps: true,
});

module.exports = Item = mongoose.model('item', ItemSchema);





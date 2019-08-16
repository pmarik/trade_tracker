const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ItemSchema = new Schema({
   ticker: { type: String, required: true},
   numShares: {type: Number, required: true},
   entry: { type: Number, required: true},
   exit: {type: Number, required: true},
   stopPrice: {type: Number, required: true},
   pL: {type: Number, required: true},
   entryDate: {type: Date, required: true},
   exitDate: {type: Date, required: true},
   winLose: {type: String, required: true},
   note: {type: String, required: true},
   risk: {type: Number, required: true},
   rMultiple: {type: Number, required: true},
   tradeIMG: {type: String, required: true}
}, {
    timestamps: true,
});

module.exports = Item = mongoose.model('item', ItemSchema);








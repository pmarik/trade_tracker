const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//Item Model
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))
    
})


// @route UPDATE api/items
// @desc Update A Item
// @access Public
// router.post('/update/:id', auth, (req, res) => {
//     Item.findById(req.params.id)
//         .then(trade => {
//             trade.ticker = req.body.ticker,
//             trade.numShares = req.body.numShares,
//             trade.entry = req.body.entry,
//             trade.exit = req.body.exit,
//             trade.stopPrice = req.body.stopPrice,
//             trade.pL = req.body.pL,
//             trade.entryDate = Date.parse(req.body.entryDate),
//             trade.exitDate = Date.parse(req.body.exitDate),
//             trade.strategy = req.body.strategy,
//             trade.winLose = req.body.winLose,
//             trade.note = req.body.note,
//             trade.risk = req.body.risk,
//             trade.rMultiple = req.body.rMultiple,
//             trade.tradeIMG = req.body.tradeIMG

//             trade.save()
//                 .then(() => res.json('Trade Updated'))
//                 .catch(err => res.status(400).json('Error: '+err ))
//         })
//         .catch(err => res.statusMessage(400).json('Error: ' + err))
// })
router.route('/update/:id').post( (req, res) => {
    Item.findById(req.params.id)
        .then(trade => {
            trade.ticker = req.body.ticker,
            trade.numShares = req.body.numShares,
            trade.entry = req.body.entry,
            trade.exit = req.body.exit,
            trade.stopPrice = req.body.stopPrice,
            trade.pL = req.body.pL,
            trade.entryDate = Date.parse(req.body.entryDate),
            trade.exitDate = Date.parse(req.body.exitDate),
            trade.strategy = req.body.strategy,
            trade.winLose = req.body.winLose,
            trade.note = req.body.note,
            trade.risk = req.body.risk,
            trade.rMultiple = req.body.rMultiple,
            trade.tradeIMG = req.body.tradeIMG

            trade.save()
                .then(() => res.json('Trade Updated'))
                .catch(err => res.status(400).json('Error: '+err ))
        })
        .catch(err => res.statusMessage(400).json('Error: ' + err))
})


// @route POST api/items
// @desc Create A Item
// @access Private
router.post('/', auth,  (req, res) => {
   const newItem = new Item({
    ticker: req.body.ticker,
    numShares: req.body.numShares,
    entry: req.body.entry,
    exit: req.body.exit,
    stopPrice: req.body.stopPrice,
    pL: req.body.pL,
    entryDate: Date.parse(req.body.entryDate),
    exitDate: Date.parse(req.body.exitDate),
    winLose: req.body.winLose,
    note: req.body.note,
    risk: req.body.risk,
    rMultiple: req.body.rMultiple,
    tradeIMG: req.body.tradeIMG
   });

   newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err ));
    
})



// @route GET api/item
// @desc Get A Item
// @access Public
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
    .then(trade => res.json(trade))
    .catch(err => res.status(400).json('Error: ' + err));
})



// @route DELETE api/items
// @desc Delete A Item
// @access Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true}))) .catch(err => res.status(404).json({success: false}))

     
 })

module.exports = router; 
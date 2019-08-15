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
router.post('/update/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(trade => {
            trade.ticker = req.body.ticker;
            trade.entry = req.body.entry;
            trade.exit = req.body.exit;
            trade.fees = req.body.fees;
            trade.pL = req.body.pL;
            trade.date = Date.parse(req.body.date);

            trade.save()
                .then(() => res.json('Trade Updated'))
                .catch(err => res.status(400).json('Error: '+err ))
        })
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
    strategy: req.body.strategy,
    winLose: req.body.winLose,
    note: req.body.note,
    risk: req.body.risk,
    rMultiple: req.body.rMultiple
   });

   newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err ));
    
})

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
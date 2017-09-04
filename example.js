const leveldb = require('level')
const VM = require('ethereumjs-vm')
const Blockchain = require('ethereumjs-blockchain')
const syncBlockchain = require('./index.js')


var blockchain = new Blockchain(leveldb('./blockchaindb'), false)

syncBlockchain({
  blockchain: blockchain,
})

var vm = new VM(null, blockchain)
vm.runBlockchain(function(){
  console.log('complete', arguments)
})

vm.on('beforeBlock', function(block){
  console.log('beforeBlock', block.header.number.toString('hex'))
})

vm.on('afterBlock', function(block){
  // console.log('afterBlock', block.header.number.toString('hex'))
  console.log('afterBlock')
})

// blockchain.iterator('blockchain', processBlock, function(){
//   console.log('complete', arguments)
// })

// function processBlock (block, reorg, cb) {
//   console.log('processBlock:', {
//     hex: block.header.number.toString('hex'),
//     reorg: reorg,
//   })
//   cb()
// }
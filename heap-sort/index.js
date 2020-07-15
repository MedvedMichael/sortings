const heapsort = require('./heap-sort')

const array = Array.from({length:1000000}, ()=>Math.round(Math.random()*200000))
const sortedArray = heapsort(array)
sortedArray.forEach(item => console.log(item))
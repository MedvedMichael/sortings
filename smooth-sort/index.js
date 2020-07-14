const smoothsort = require('./smooth-sort')
const array = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000))
console.log(smoothsort(array))

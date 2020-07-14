const mergesort = require('./merge-sort')
const array = Array.from({ length: 500000 }, () => Math.floor(Math.random() * 10000))
console.log(mergesort(array))
// for (let i = 0; i < array.length - 1; i++) {
//     for (let j = i+1; j < array.length; j++) {
//         if (array[i] > array[j]) {
//             const delta = array[i]
//             array[i] = array[j]
//             array[j] = delta
//         }
//     }
// }
// console.log(JSON.stringify(array))
// console.log(JSON.stringify(array.sort()))
const mergesort = (array) => {
    if (array.length < 2)
        return array;
    const arrays = splitArray(array)
    const firstPart = mergesort(arrays[0]), secondPart = mergesort(arrays[1])
    return merge(firstPart, secondPart)
}
const merge = (arr1, arr2) => {
    const result = []
    while (arr1.length !== 0 || arr2.length !== 0) {
        if (arr1.length === 0)
            result.push(arr2.splice(0, 1)[0])
        else if (arr2.length === 0)
            result.push(arr1.splice(0, 1)[0])
        else { 
            if (arr1[0] < arr2[0]) result.push(arr1.splice(0, 1)[0])
            else result.push(arr2.splice(0, 1)[0])
        }
    }
    return result
}
const splitArray = (array) => [array.slice(0, Math.ceil(array.length / 2)), array.slice(Math.ceil(array.length / 2))]
module.exports = mergesort

const heapsort = array => {
    const sortedArray = [...array]
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--)
        downheap(sortedArray, i, sortedArray.length)

    for (let i = sortedArray.length - 1; i > 0; i--) {
        const delta = sortedArray[i]
        sortedArray[i] = sortedArray[0]
        sortedArray[0] = delta

        downheap(sortedArray, 0, i)
    }
    return sortedArray
}

const downheap = (array, index, size) => {
    const startElement = array[index]
    while (index < Math.floor(size / 2)) {
        const child = (2 * index + 1 < size - 1 && array[2 * index + 1] < array[2 * index + 2]) ? 2 * index + 2 : 2 * index + 1
        if (child >= size || startElement >= array[child])
            break;
        array[index] = array[child]
        index = child
    }
    array[index] = startElement
}

module.exports = heapsort
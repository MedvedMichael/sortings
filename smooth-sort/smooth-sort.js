//Info from http://cppalgo.blogspot.com/2010/10/smoothsort.html

const smoothsort = (array) => {
    const table = getLeonardosNumbers(array.length).map(number => { return { number, isDone: false, heap: null } })
    array.forEach((number, index) => addNode(number, table, index))
    return getSortedArrayFromTable(table)
    // sortedArray.forEach(item => console.log(item))
    // console.log(JSON.stringify(table))
}


const addNode = (number, table, index) => {
    const numbers = table.map(item => item.number)
    if (index !== 0) {
        const heaps = []
        for(let i=0;i<table.length;i++){
            if(table[i].isDone){
                heaps.push(table[i])
                if(heaps.length===2)
                    break
            }
        }
        
        if (heaps.length === 2 && numbers.includes(heaps[0].number + heaps[1].number + 1)) {
            const newHeap = sifting({ number, left: heaps[0].heap, right: heaps[1].heap })
            const leoIndex = table.findIndex(item => item.number === heaps[0].number + heaps[1].number + 1)
            table[leoIndex].isDone = true
            table[leoIndex].heap = newHeap
            heaps[0].heap = null
            heaps[1].heap = null
            heaps[0].isDone = false
            heaps[1].isDone = false
            return;
        }
    }

    const i = table[0].isDone ? 1 : 0
    table[i].isDone = true
    table[i].heap = { number, left: null, right: null }
}

const sifting = node => {
    const {left, right} = node
    if (left && right) {
        // console.log('LEFT RIGHT')
        // console.log(left)
        // console.log(right)
        const max = (...values) => values.find(item => item.number === Math.max(...values.map(item => item.number)))
        const currentMax = max(left,right,node) 
        if(currentMax === node)
            return node;
        const deltaNumber = currentMax.number
        currentMax.number = node.number
        node.number = deltaNumber
        sifting(currentMax)
    }
    return node
}

const getLeonardosNumbers = (length) => {
    const start = [1,1]
    
    while (start[start.length - 1] < length) {
        const newNumber = start[start.length-1] + start[start.length-2] + 1
        start.push(newNumber)
    }
    return start
}

const getSortedArrayFromTable = table => {
    const array = []
    while(table.find(item => item.isDone)){

    // for(let i=0;i<10;i++){
        // console.log(table)
        let max
        table.forEach((current,index) => {
            if (current.isDone && (!max || max.number <= current.heap.number)){
                // console.log('CUR')
                // console.log(current)
                max = {number:current.heap.number, index}
            }
        })
        // console.log('MAX')
        // console.log(max)
        array.splice(0,0,max.number)
        // console.log(array)
        // console.log(max)
        deleteRoot(table, max.number)
        // console.log('TABLE')
        // console.log(table)
    }
    return array
}

const deleteRoot = (table, number) => {
    const leoNumbers = table.filter(item => item.isDone)
    const currentIndex = table.findIndex(item => item.heap && item.heap.number === number)
    // console.log(number)
    const currentNumber = table[currentIndex]
    const delta = currentNumber.heap.number
    currentNumber.heap.number = leoNumbers[0].heap.number
    leoNumbers[0].heap.number = delta
    const sifted = sifting(currentNumber.heap)
    // console.log(currentNumber)
    // console.log('SIFT')
    // console.log(sifted)
    table[currentIndex].heap = sifted
    const {heap} = leoNumbers[0]
    if(heap.left || heap.right){
        const leftSize = getHeapSize(heap.left), rightSize = getHeapSize(heap.right)
        let leftIndex = table.findIndex(item => item.number === leftSize)
        const rightIndex = table.findIndex(item => item.number === rightSize)
        if(leftIndex === rightIndex && leftIndex === 0)
            leftIndex = 1
        table[leftIndex].isDone = true
        table[leftIndex].heap = heap.left
        table[rightIndex].isDone = true
        table[rightIndex].heap = heap.right
    }
    leoNumbers[0].isDone = false
    leoNumbers[0].heap = null

}

const getHeapSize = heap => {
    if(heap.left)
        return getHeapSize(heap.left) + getHeapSize(heap.right) + 1
    
    return 1;
}

module.exports = smoothsort
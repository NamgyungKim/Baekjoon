/* ! 테스트 */
const path = './input.txt'
const fs = require('fs');

const readline = require("readline");
const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
});

/* ! 제출용 */
// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

class Heap {
    #heapTree = []

    push(num) {
        this.#heapTree.push(num)
        this.bubbleUp()
    }

    getNum() {
        if (this.#heapTree.length === 0) {
            return 0
        }
        const num = this.#heapTree.shift()
        this.bubbleDown()
        return num
    }

    swap(index1, index2) {
        [this.#heapTree[index1], this.#heapTree[index2]] = [this.#heapTree[index2], this.#heapTree[index1]]
    }

    bubbleUp() {
        let index = this.#heapTree.length - 1
        let parentIdx = Math.floor((index - 1) / 2);
        while (this.#heapTree[parentIdx] && this.#heapTree[index] < this.#heapTree[parentIdx]) {
            this.swap(index, parentIdx)
            index = parentIdx;
            parentIdx = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let index = 0;
        let leftIdx = index * 2 + 1;
        let rightIdx = index * 2 + 2;

        while (
            (this.#heapTree[leftIdx] && this.#heapTree[leftIdx] < this.#heapTree[index]) ||
            (this.#heapTree[rightIdx] && this.#heapTree[rightIdx] < this.#heapTree[index])
            ) {
            let smallerIdx = leftIdx;
            if (
                this.#heapTree[rightIdx] &&
                this.#heapTree[rightIdx] < this.#heapTree[smallerIdx]
            ) {
                smallerIdx = rightIdx;
            }
            this.swap(index, smallerIdx);
            index = smallerIdx;
            leftIdx = index * 2 + 1;
            rightIdx = index * 2 + 2;
        }
    }
}

let lineNum = 0
let print = []
let heap = new Heap()

rl.on("line", function (line) {
    lineNum++
    if (lineNum === 1) return
    if (line === '0') {
        print.push(heap.getNum())
    } else {
        heap.push(BigInt(line))
    }
}).on("close", function () {
    console.log(print.join("\n"))
    process.exit(); // 프로세스 종료
});






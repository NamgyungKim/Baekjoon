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


let lineNum = 0
let caseNum = -1
let testCase = []

rl.on("line", function (line) {
    lineNum++
    const input = line.split(' ')
    if (lineNum === 1) return
    if (input.length === 1) {
        testCase.push([])
        caseNum++
    }
    if (input.length === 2) {
        testCase[caseNum].push(input)
    }
}).on("close", function () {
    solution()
    process.exit(); // 프로세스 종료
});


function solution() {
    let result = []
    testCase.forEach((aCase) => {
        if (aCase.length === 0) {
            result.push(0)
            return
        }
        let arr = makeArr(aCase)
        result.push(numOfCase(arr))
    })
    console.log(result.join('\n'))
}

function numOfCase(caseArr) {
    let result = 0

    const callback = (x, memo) => {
        if (x === caseArr[0].length) {
            result++
            return
        }
        callback(x + 1, memo)
        for (let y = 0; y < caseArr.length; y++) {
            if (caseArr[y][x] === 'x') continue
            if (memo[y + 1]) continue
            callback(x + 1, {...memo, [y + 1]: x + 1})
        }
    }

    callback(0, {})
    return result - 1
}

function makeArr(arr) {
    let clothes = new Map()
    let types = new Map()
    arr.forEach(([type, aClothes]) => {
        if (typeof types.get(type) === 'undefined') {
            types.set(type, types.size)
        }
        if (typeof clothes.get(aClothes) === 'undefined') {
            clothes.set(aClothes, clothes.size)
        }
    })

    let result = Array.from({length: types.size}, () => Array.from({length: clothes.size}, () => 'x')); // [0,0,0,0,0]
    arr.forEach(([type, aClothes]) => {
        result[types.get(type)][clothes.get(aClothes)] = 0
    })
    return result
}


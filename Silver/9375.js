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
    console.log(solution().join('\n'))
    process.exit(); // 프로세스 종료
});


function solution() {
    return testCase.map((test) => {
        let result = 1
        let caseNum = 0;
        let obj = {}
        test.forEach(([clothe, type]) => {
            if (obj[type]) {
                obj[type].push(clothe)
            } else {
                obj[type] = [clothe]
            }
        })

        Object.values(obj).forEach((clothes) => {
            result = result * (clothes.length + 1)
        })

        return result - 1
    })
}


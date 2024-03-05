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
let stNum, edNum
let result = 0

rl.on("line", function (line) {
    const input = line.split(' ').map((v) => Number(v))
    stNum = input[0]
    edNum = input[1]
}).on("close", function () {
    solution()
    console.log(result)
    process.exit(); // 프로세스 종료
});

function solution() {

}

function binaryOneNum(num, depth) {
    const patton = [1, 2, 2, 3]

    binaryOneNum()
}


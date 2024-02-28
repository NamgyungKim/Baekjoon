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
let input = []

rl.on("line", function (line) {
    lineNum++
    if (lineNum === 1) return
    input = line.split(' ').map(n => Number(n))

}).on("close", function () {
    solution()
    process.exit(); // 프로세스 종료
});


function solution() {
    let frequency = {}
    input.forEach((n, index) => {
        if (frequency[n]) {
            frequency[n].count++
        } else {
            frequency[n] = {count: 1, index}
        }
    })

    const sortNum = Object.keys(frequency).sort((a, b) => {
            if (frequency[b].count - frequency[a].count === 0) {
                return frequency[a].index - frequency[b].index
            } else {
                return frequency[b].count - frequency[a].count
            }
        }
    )

    const result = []
    sortNum.forEach((num) => {
        for (let i = 0; i < frequency[num].count; i++) {
            result.push(num)
        }
    })
    console.log(result.join(' '))
}


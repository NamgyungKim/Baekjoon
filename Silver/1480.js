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
let gemsLength, bagsNum, maxWeight;
let gams = [];

rl.on("line", function (line) {
    lineNum++
    const input = line.split(' ').map((n) => +n)
    if (lineNum === 1) {
        gemsLength = input[0]
        bagsNum = input[1]
        maxWeight = input[2]
    } else {
        gams = input
    }
}).on("close", function () {
    solution()
    process.exit(); // 프로세스 종료
});


function solution() {
    console.log(solve(0, 0, 0));
}

// visited : 0000 각각 보석을 가리킴. 1일 경우 가방에 넣은 보석을 가리킴
function solve(bag, weight, visited) {
    if (bag === bagsNum) return -1; // 가방이 주어진 가방 보다 더 쓸 경우 return
    if (visited === (1 << gemsLength) - 1) return 0; // 보석을 가방에 다 넣은경우.

    let ret = 0; // 캐시에 0으로 저장 하기 위해
    for (let i = 0; i < gemsLength; i++) { // i는 보석 위치
        if (visited & (1 << i)) continue;  // 이미 모든 보석을 다 가방에 넣은 경우
        else if (gams[i] > maxWeight) continue; //
        else if (weight + gams[i] > maxWeight) {  //
            ret = Math.max(ret, solve(bag + 1, gams[i], visited | (1 << i)) + 1);
        } else {
            ret = Math.max(ret, solve(bag, weight + gams[i], visited | (1 << i)) + 1);
        }
    }
    return ret;
}
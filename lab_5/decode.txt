const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
// 0111111111111
// 0111111111110
// 0111

// 111111110
// 1100

(async () => {
    const insertions = [1,2,4,8]

    const commandLine = await prompt('Enter command: ')
    const sequence = commandLine.split(' ')[0].split('').map(x => +x)
    const inserted = [...sequence]
    const maxLength = inserted.length

    const checkers = []
    for (const pos of insertions) {
        const arr = []
        for (let i = 1; i < maxLength+1;) {
            arr.push(...'0'.repeat(pos).split(''))
            arr.push(...'1'.repeat(pos).split(''))
            i += pos*2
        }
        checkers.push(arr.slice(1, maxLength+1).map(x => +x))
    }

    for (const pos of insertions) {
        inserted.splice(pos-1, 0, 0)
    }

    const copy = [...inserted]
    const code = []
    for (let i = 0; i < insertions.length; i++) {

        const value = checkers[i].reduce((acc, value, j) => acc + value * inserted[j], 0)
        // console.log(value)
        copy[insertions[i]-1] = value % 2
        code.push(value % 2)
    }

    console.log(code)
    const needRepair = code.indexOf(1) !== -1
    const copyForCheck = [...inserted]

    if (needRepair) {
        let repairPos = 0;
        for(let i = 0; i < insertions.length; i++) {
            if (code[i]) repairPos+=insertions[i]
        }

        console.log("Error in: " + repairPos)
        console.log("---Result of repairing---")
        copyForCheck[repairPos-1] = (copyForCheck[repairPos-1] + 1) % 2
        // Remove safe code
        for (let i = insertions.length-1; i >= 0; i--) {
            copyForCheck.splice(insertions[i]-1, 1)
        }
        console.table([copyForCheck])

    }
})()



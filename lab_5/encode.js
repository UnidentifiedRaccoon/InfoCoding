const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// 111111111

(async () => {
    const insertions = [1,2,4,8]

    const commandLine = await prompt('Enter command: ')
    const sequence = commandLine.split(' ')[0].split('').map(x => +x)
    const inserted = sequence
    const maxLength = sequence.length + insertions.length
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
    console.table([inserted, ...checkers])
    console.table([copy])
    console.log("Safe code:", code.join(''))

})()




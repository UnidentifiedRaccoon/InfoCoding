const readline = require('readline');
const {encode} = require("./archive/encode");
const {decode} = require("./archive/decode");
const fs = require("fs");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

rl.on('close', () => process.exit(0))

class ErrorInvalidAttributes extends Error {
    constructor() {
        super('there is unknown error in attrs` record');
    }
}

function beautify(str) {
    const arr = str.trim().split(' ')
    const newstr = []
    newstr.push(`\x1b[36m${arr[0]}\x1b[0m`)
    newstr.push(`\x1b[36m${arr[1]}\x1b[0m`)
    for (let i = 2; i < arr.length; i++) {
        newstr.push(`\x1b[33m${arr[i]}\x1b[0m`)
    }
    return newstr.join(' ')
}

module.exports = class ConsoleInterface {

    static runCommand(commandStr) {
        try {
            const input = commandStr.split(' ')
            const command = input[0]
            const args = input.slice(1)
            ConsoleInterface.exec(command, args)
        } catch (error) {
                console.error('\x1b[31m%s\x1b[0m', error.message)
        }
    }

     static async init() {
        try {
            let commandLine = ''
            while (commandLine.split(' ')[0] !== 'exit') {
                commandLine = await prompt('Enter command: ')
                ConsoleInterface.runCommand(commandLine)
            }
            rl.close()
        } catch (error) {
            console.error('Enable to prompt: ' + error)
        }
    }

    static exec = (command, args) => {
        switch (command) {
            case 'encode': {
                console.log()
                const buffer = fs.readFileSync(args[0] || './custom.txt')
                const archive = encode(buffer)
                fs.writeFileSync('./archive.txt', archive)
                break
            }
            case 'decode': {
                const archive = fs.readFileSync(args[0] ||'./archive.txt' )
                const copy = []
                for (let i = 0; i < archive.length; i++) {
                    if (i > 5000 && i < 6000) continue
                    copy.push(archive[i])
                }

                const buffer = decode(copy)
                fs.writeFileSync(args[1] || './d.txt', buffer)
                break
            }
            case 'help': {
                ConsoleInterface.help()
                break
            }
            default: break
        }
    }

    static help = () => {
        const required = `\x1b[31m!\x1b[0m`
        console.group('Info')
        console.log(`\x1b[31m!\x1b[0m`, '- for required attrs (specify attrs with allowed value or error will be thrown)')
        console.groupEnd()

        console.log('Commands list:')
        console.log(" " + beautify(' - help'))
        // encode
        console.group(" " + beautify( ' - encode <path>') + `: \n\t -- Encode file`)
        console.groupEnd()
        // decode
        console.group(" " + beautify( ' - decode <path>  <newFileName>') + `: \n\t -- Decode file`)
        console.groupEnd()

        console.log(" " + beautify(' - exit'))
        console.log()
    }
}


// encode custom.txt
// decode archive.txt dec.txt

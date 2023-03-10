const logFormat = (str, arg) => {
    const offset = 17
    console.log(`\x1b[33m${str}`, ' '.repeat(offset-str.length), `\x1b[32m:\x1b[0m`, `\x1b[34m${arg}`, )
}


module.exports = class BeautyLogs {
    constructor() {}
    static log(text, mode = 'color', fill = 'white') {
        console.log(text)
    }
    static title(text) {
        console.error('\x1b[35m%s\x1b[0m', text)
    }
    static error(text) {
        console.error('\x1b[31m%s\x1b[0m', text)
    }
    static createHeaderLogTable = (bmpHandler) => {
        const bmp = bmpHandler.bmp
        console.log()
        console.log(`\x1b[35m~~~~~~~File Header~~~~~~~`)
        logFormat('Type', bmp.flag)
        logFormat('File size', bmp.fileSize)
        logFormat('Offset', bmp.offset)
        console.log()
        console.log(`\x1b[35m~~~~~~~~IMG Header~~~~~~~`)
        logFormat('Header size', bmp.headerSize)
        logFormat('Width', bmp.width)
        logFormat('Height', bmp.height)
        logFormat('Planes', bmp.planes)
        logFormat('BitPP', bmp.bitPP)
        logFormat('IsCompressed', bmp.compress)
        logFormat('Raw size', bmp.rawSize)
        logFormat('Colors colors', bmp.colors)
        logFormat('Important colors', bmp.importantColors)
        console.log()
    }
}

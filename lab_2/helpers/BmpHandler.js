const bmp = require("bmp-js");
const fs = require("fs");

const replaceColor = (bmpData, color, placeholder) => {
    let colorNumber = 0
    switch(color) {
        case 'blue': {
            colorNumber = 1
            break;
        }
        case 'green': {
            colorNumber = 2
            break;
        }
        case 'red': {
            colorNumber = 3
            break;
        }
    }

    for (let y = bmpData.height - 1; y >= 0; y--) {
        for (let x = 0; x < bmpData.width; x++) {
            const location = y * bmpData.width * 4 + x * 4;
            if (bmpData.data[location + colorNumber] !== 0) {
                bmpData.data[location + colorNumber] = placeholder;
            }
        }
    }
}

const bitSlice = (bmpData, mask) => {
    for (let i = 0; i < bmpData.data.length; i += 4) {
        const bluei = i + 1;
        const greeni = i + 2;
        const redi = i + 3;
        // const averageBW = 0.3 * bmpData.data[redi] + 0.6 * bmpData.data[greeni] + 0.1 * bmpData.data[bluei];
        // bmpData.data[bluei] = averageBW & mask;
        // bmpData.data[greeni] = averageBW & mask;
        // bmpData.data[redi] = averageBW & mask;
        // Как я думал {
        bmpData.data[bluei] &= mask;
        bmpData.data[greeni] &= mask;
        bmpData.data[redi] &= mask;
        // }
    }
}

const insert = (bmpData, message) => {
    let pos = -1
    for (let i = 0; i < message.length; i++) {
        let bits = message[i].toString(2)
        while (bits.length < 8) {
            bits = "0" + bits
        }
        for (const bit of bits) {
            pos += 4
            if (bmpData.data[pos] % 2 > +bit) bmpData.data[pos]-= 1
            if (bmpData.data[pos] % 2 < +bit) bmpData.data[pos]+= 1
        }
    }
}

const insertRobust = (bmpData, buffer) => {
    let pos = -1
    for (let i = 0; i < buffer.length; i++) {
        let bits = buffer[i].toString(2)
        while (bits.length < 8) {
            bits = "0" + bits
        }
        for (const bit of bits) {
            pos += 4
            if (bmpData.data[pos] % 2 > +bit) bmpData.data[pos]-= 1
            if (bmpData.data[pos] % 2 < +bit) bmpData.data[pos]+= 1
        }
    }
}

const extract = (bmpData) => {
    const buffer = new ArrayBuffer(bmpData.data.length/4/8)
    const data = new Uint8Array(buffer)
    let decodedByte = ''
    let i = 0
    for (let pos = 3; pos < bmpData.data.length; pos+=4) {
        let bits = bmpData.data[pos].toString(2)
        while (bits.length < 8) {
            bits = "0" + bits
        }
        decodedByte += bits[7]
        if (decodedByte.length >= 8) {
            data[i++] = parseInt(decodedByte, 2)
            decodedByte = ''
        }
    }
    return data
}


const createBmp = (bmpData, filename, suffix = 'bmp') => {
    const rawData = bmp.encode(bmpData);
    fs.writeFile(`modifications/${filename}.${suffix}`, rawData.data, {}, () => {
        console.log(`Create ${filename}.bmp`)
    })
}



module.exports = class BmpHandler {
    constructor(path) {
        const bmp = require("bmp-js");
        const bmpBuffer = fs.readFileSync(path);
        this.bmp = bmp.decode(bmpBuffer);
        return this
    }

    replace(color) {
        return (placeholder) =>  {
            replaceColor(this.bmp, color, placeholder);
            return this
        }
    }

    makeSlice(mask) {
        bitSlice(this.bmp, mask);
        return this
    }

    insertMessage(buffer) {
        insert(this.bmp, buffer)
        return this
    }

    extractMessageTo(filename, suffix = 'bmp') {
        const messageBuffer = Buffer.from(extract(this.bmp))
        fs.writeFile(`modifications/${filename}.${suffix}`, messageBuffer, {}, () => {
            console.log(`Create ${filename}.bmp`)
        })
        return this
    }

    createFile(filename) {
        createBmp(this.bmp, filename)
        return this
    }

}


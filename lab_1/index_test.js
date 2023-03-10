const fs = require("fs");
const {encode} = require("./archive/encode");
const {decode} = require("./archive/decode");

const buffer = fs.readFileSync('./text.en.txt')
const archive = encode(buffer)

fs.writeFileSync('a.txt', archive)

const decoded = decode(archive)
fs.writeFileSync('d.txt', decoded)

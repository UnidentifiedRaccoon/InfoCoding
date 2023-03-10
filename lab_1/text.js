function updToBytes(num) {
    const converted = (num).toString(2).split("")
    while (converted.length < 16) {
        converted.unshift('0')
    }
    return [
        parseInt(converted.slice(8, 16).join(""), 2),
        parseInt(converted.slice(0, 8).join(""), 2),
    ]
}

console.log(updToBytes(128))
console.log(updToBytes(129))
console.log(updToBytes(149))
console.log(updToBytes(255))
console.log(updToBytes(256))
console.log(updToBytes(265))
console.log(updToBytes(512))
console.log(updToBytes(513))

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

//'100001001'


// function toBytes(num) {
//     const bytes = []
//     while (num >= 255) {
//         num -= 255
//         bytes.push(255)
//     }
//     bytes.push(num)
//     return bytes
// }

module.exports = {
    LZ78_encode(arr){

        const strArr = arr.map(x => String.fromCharCode(x))
        const finalArr = [];
        const dict = new Map(); // массив с последовательностями байт
        dict.set('', 0)
        for (let i = 0; i < strArr.length; i++) {
            let refIndex = 0
            let seq = strArr[i]
            while(dict.has(seq)) {
                refIndex = dict.get(seq)
                i++
                seq += strArr[i]
            }
            dict.set(seq, dict.size)

            finalArr.push([...updToBytes(refIndex), seq[seq.length - 1].charCodeAt(0)])
        }
        const acc = []
        for(const x of finalArr) {
            acc.push(...x)
        }
        return acc
    },
}

function fromBytes(seq) {
    return seq.reduce((acc, x, i) => acc+x*Math.pow(256, i), 0)
}

module.exports =  {
    LZ78_decode(arr) {
        const dict = [[0]]
        const finalArr = [];
        for (let i = 0; i < arr.length; i++) {
            const seq = [arr[i], arr[i+1]]
            i+=2
            const refIndex = fromBytes(seq)
            const char = arr[i]
            let refValue = []
            if (refIndex && refIndex < dict.length) refValue = dict[refIndex];
            finalArr.push(...refValue, char)
            dict.push([...refValue, char])
        }

        return finalArr
    }
}

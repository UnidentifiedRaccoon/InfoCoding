const fs = require('fs');



module.exports =  { X_decode(buffer) {
        const table = fs.readFileSync('./table.txt', {encoding: 'utf8'})

        const string = []

        const list = JSON.parse(table)
        let node = list[0]
        let count = 0
        let byte = buffer[0]
        for (let i = 1; i < buffer.length; i++) {
            let b = byte & (1 << (7-count))
            b === 0 ? node = node.left : node = node.right
            if (!node) node = list[0]
            if (node.key !== null) {
                string.push(node.key)
                node = list[0]
            }
            count++
            if (count === 8) {
                count = 0
                byte = buffer[i]
            } else { i-- }
        }
        return string
    }
}


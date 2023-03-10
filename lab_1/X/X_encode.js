const fs = require('fs');


module.exports =  { X_encode(buffer) {
        // Символы -> кол-во вхожденией
        const map = new Map()
        for (let i = 0; i < buffer.length; i++) {
            const char = buffer[i]
            let value = map.get(char)
            if (!value) value = 0
            map.set(char, value+1)
        }
        // console.log(map)

        // Создание узлов
        class Node {
            constructor (left = null, right = null) {
                this.left = left
                this.right = right
                this.key = null
                this.code = null
            }
        }

        const list = []
        for (const [key, count] of map) {
            const node = new Node()
            node.key = key
            node.count = count
            list.push(node)
        }
        // console.log(list)


        // Сортировка узлов
        while (list.length !== 1) {
            list.sort((a,b) => a.count - b.count)
            const left = list.shift()
            const right = list.shift()
            const node = new Node(left, right)
            node.count = left.count + right.count
            list.unshift(node)
        }

        // console.log(list)

        // Построение таблицы кодов
        const code = []
        const table = new Map()
        function buildTable (node) {
            if (node.left) {
                code.push(0)
                buildTable(node.left)
            }
            if (node.right) {
                code.push(1)
                buildTable(node.right)
            }
            if (node.key !== null) table.set(node.key, code.join(''))
            code.pop()
        }
        buildTable(list[0])
        // console.log(table)

        // Кодирование данных с помощью таблицы
        const Xarr = []
        let byte = ''
        for (let i = 0; i < buffer.length; i++) {
            const char = buffer[i]
            byte += table.get(char)
            if (byte.length >= 8) {
                Xarr.push(parseInt(byte.slice(0, 8), 2))
                byte = byte.slice(8)
            }
        }
        if (byte) Xarr.push(parseInt(byte, 2))

        // Запись таблицы в файл
        // fs.writeFileSync('./table.txt', JSON.stringify([...table]))
        fs.writeFileSync('./table.txt', JSON.stringify([...list]))
        return Xarr
    }
}





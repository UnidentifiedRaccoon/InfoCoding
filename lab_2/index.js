const Picture = require("./helpers/Picture");
const BeautyLogs = require("./helpers/BeautyLogs");
const fs = require("fs");
console.log(fs.readFileSync('rgb-circles.bmp'))


BeautyLogs.createHeaderLogTable(Picture.bmp('rgb-circles.bmp'))
//
// Picture.bmp()
//     .replace('blue')(0)
//     .replace('green')(0)
//     .createFile('R')
// Picture.bmp()
//     .replace('red')(0)
//     .replace('blue')(0)
//     .createFile('G')
// Picture.bmp()
//     .replace('red')(0)
//     .replace('green')(0)
//     .createFile('B')
//
//
// Picture.bmp().makeSlice(128).createFile('128')
// Picture.bmp().makeSlice(64).createFile('64')
// Picture.bmp().makeSlice(32).createFile('32')
// Picture.bmp().makeSlice(16).createFile('16')
// Picture.bmp().makeSlice(8).createFile('8')
// Picture.bmp().makeSlice(4).createFile('4')
// Picture.bmp().makeSlice(2).createFile('2')
// Picture.bmp().makeSlice(1).createFile('1')


// lab_3
// const messageBuffer_1 = fs.readFileSync('message_1.bmp');
const messageBuffer_2 = fs.readFileSync('message_2.bmp');
// const messageBuffer_3 = fs.readFileSync('message_3.bmp');

// // Extract
Picture.bmp('container_1.bmp')
    .insertMessage(messageBuffer_2)
    .createFile('withMessage_1')
    .extractMessageTo('retrievedMessage_1', 'bmp')
//
Picture.bmp('container_2.bmp')
    .insertMessage(messageBuffer_2)
    .createFile('withMessage_2')
    .extractMessageTo('retrievedMessage_2', 'bmp')



// Extract forward
// Picture.bmp('modifications/withMessage_1.bmp')
//     .extractMessageTo("retrievedMessageWithForward_1")
// Picture.bmp('modifications/withMessage_2.bmp')
//     .extractMessageTo("retrievedMessageWithForward_2")

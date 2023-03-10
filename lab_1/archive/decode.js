const fs = require("fs");
const {LZ78_decode} = require("../LZ78/LZ78_decode");
const {X_decode} = require("../X/X_decode");

module.exports = {
    decode(buffer) {
        try {
            console.time('decode');

            console.time('LZ78arr_decode');
            const LZ78arr_decode = LZ78_decode(buffer)
            console.timeEnd('LZ78arr_decode');
            console.log(`LZ78arr_decode: ${buffer.length} bytes to ${LZ78arr_decode.length} bytes`);

            console.time('Xarr_decode');
            const Xarr_decode = X_decode(LZ78arr_decode)
            console.timeEnd('Xarr_decode');
            console.log(`Xarr_decode: ${LZ78arr_decode.length} bytes to ${Xarr_decode.length} bytes`);


            console.timeEnd('decode');
            return Buffer.from(Xarr_decode)
        } catch (error) {
            console.error('Enable to decode: ' + error)
            return new Buffer()
        }
    }
}


const fs = require("fs");
const {LZ78_encode} = require("../LZ78/LZ78_encode");
const {X_encode} = require("../X/X_encode");


module.exports = {
    encode(buffer) {

        try {
            console.time('encode');

            console.time('X_encode');
            const Xarr_encode = X_encode(buffer)
            console.timeEnd('X_encode');
            console.log(`X_encode: ${buffer.length} bytes to ${Xarr_encode.length} bytes`);


            console.time('LZ78arr_encode');
            const LZ78arr_encode = LZ78_encode(Xarr_encode)
            console.timeEnd('LZ78arr_encode');
            console.log(`LZ78arr_encode: ${Xarr_encode.length} bytes to ${LZ78arr_encode.length} bytes`);

            console.timeEnd('encode');
            return Buffer.from(LZ78arr_encode)
        } catch (error) {
            console.error('Enable to encode: ' + error)
        }

    }
}




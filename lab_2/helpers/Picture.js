const BmpHandler = require("./BmpHandler");

module.exports = class Picture {
    static bmp(filename = 'rgb-circles.bmp') {
        return new BmpHandler(filename)
    }
}

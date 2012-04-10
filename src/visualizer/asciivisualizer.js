var BasicColors = {
    'blue'      : ['\033[34m', '\033[39m'],
    'cyan'      : ['\033[36m', '\033[39m'],
    'green'     : ['\033[32m', '\033[39m'],
    'magenta'   : ['\033[35m', '\033[39m'],
    'red'       : ['\033[31m', '\033[39m'],
    'yellow'    : ['\033[33m', '\033[39m']
}

function ASCIIVisualizer(opts) {
    this.opts = underscore.extend({
        colorize: false,
        palette: {
            1: BasicColors.green,
            2: BasicColors.yellow,
            3: BasicColors.red
        }
    }, opts);
}

ASCIIVisualizer.prototype.visualizeTo = function(map, output) {
    
    var numRows = map.getHeight(),
        row = null,
        rep = "",
        colour = this.opts.colorize || false;
    
    for (var i = 0; i < numRows; i++) {
        rep = "";
        row = map.getRow(i);
        
        for (var j = 0; j < row.length; j++) {
            var value = (row[j] ? row[j].tn || '?' : '*');
            if (colour) {
                var pal = this.opts.palette[value];
                if (pal) value = pal[0] + value + pal[1];
            }
            rep += value;
        }        
        output.write(rep + '\n');
    }
}
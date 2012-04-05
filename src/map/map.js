var _ = require('underscore'),
    Tile = require('./tile');

/**
  The 2dMap contains all the information related to a 2d map
 **/
function Map2D(opts) {
    
    opts = opts || {};
    this.size = opts.size || {width: 300, height: 300};
    
    this.initialise();    
}

Map2D.prototype.initialise = function() {
    
    this.tiles = new Array(this.size.width);
    for (var i = 0; i < this.size.width; i++) {
        this.tiles[i] = new Array(this.size.height);
    }
}

/**
  Gets the tile at the given coordinates
 **/
Map2D.prototype.getTile = function(x, y) {
    return this.tiles[x][y] = tile;
}

/**
  Sets the tile at the given coordinates
 **/
Map2D.prototype.setTile = function(x, y, tile) {
    this.tiles[x][y] = tile;
}

Map2D.prototype.toJSON = function() {
    var results = {world: {size: this.size}, tiles: []};
    
    for (var i = 0; i < this.tiles.length; i++) {
        var column = this.tiles[i];
        for (var j = 0; j < column.length; j++) {
            results.tiles.push(column[j]);
        }
    }
    return results;
}

module.exports = Map2D;
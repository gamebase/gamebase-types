/**
  The 2dMap contains all the information related to a 2d map
 **/
function Map2D(opts) {
    
    opts = opts || {};
    this.size = opts.size || {width: 300, height: 300};
    
    this.initialise();    
}

Map2D.prototype.initialise = function() {
    
    this.tiles = new Array(this.size.height);
    for (var i = 0; i < this.size.height; i++) {
        this.tiles[i] = new Array(this.size.width);
    }
}

/**
  Gets the tile at the given coordinates
 **/
Map2D.prototype.getTile = function(x, y) {
    return this.tiles[y][x] = tile;
}

/**
  Sets the tile at the given coordinates
 **/
Map2D.prototype.setTile = function(x, y, tile) {
    this.tiles[y][x] = tile;
}

/**
  Returns the size as an object
 **/
Map2D.prototype.getSize = function() {
    return this.size;
}

/**
  Returns the width of the map
 **/
Map2D.prototype.getWidth = function() {
    return this.size.width;
}

/**
  Returns the height of the map
 **/
Map2D.prototype.getHeight = function() {
    return this.size.height;
}

/**
  Returns the row given by y
 **/
Map2D.prototype.getRow = function(y) {
    if (y >= this.getHeight()) return null;
    return this.tiles[y];
}

Map2D.prototype.toJSON = function() {
    var results = {world: {size: this.size}, tiles: []};
    
    for (var i = 0; i < this.tiles.length; i++) {
        var row = this.tiles[i];
        for (var j = 0; j < row.length; j++) {
            results.tiles.push(row[j]);
        }
    }
    return results;
}
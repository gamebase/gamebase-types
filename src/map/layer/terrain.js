/**
  A terrain layer contains an array containing all the tiles
 **/
function TerrainLayer(id, size, opts) {
    this.id = id;
    this.size = size;
    this.type = 'terrain';
    this.tiles = new Array(size.width * size.height);
}

/**
  Returns the tile at x,y
 **/
TerrainLayer.prototype.getTile = function(x, y) {
    if (arguments.length == 1) {
        y = x.y;
        x = x.x;
    }
    var index = this.getTileIndex(x,y);
    return (index < 0) ? null : this.tiles[index];
}

/**
  Sets the tile at x,y
 **/
TerrainLayer.prototype.setTile = function(x, y, tile) {
    this.tiles[this.getTileIndex(x,y)] = tile;
}

/**
  Returns the array index of the tile
 **/
TerrainLayer.prototype.getTileIndex = function(x, y) {
    return (y * this.size.width) + x;
}

/**
  Converts a tile index to x,y tile coordinates
 **/
TerrainLayer.prototype.getIndexPosition = function(tileIndex) {
    return {
        x: tileIndex % this.size.width,
        y: Math.floor(tileIndex / this.size.width)
    }
}

/**
  Return surrounds
 **/
TerrainLayer.prototype.getSurrounds = function(x, y) {
    return [
        this.getTile(x-1, y-1), this.getTile(x, y-1), this.getTile(x + 1, y - 1),
        this.getTile(x-1, y), this.getTile(x, y), this.getTile(x+1, y),
        this.getTile(x-1, y+1), this.getTile(x, y+1), this.getTile(x+1, y+1)
    ];    
}

/**
  Exports the terrain layer to JSON
 **/
TerrainLayer.prototype.toJSON = function() {
    return {id: this.id, type: this.type, size: this.size, tiles: this.tiles};
}
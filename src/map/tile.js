function Tile(opts) {
    
    opts = opts || {};    
    this.update(opts);    
}

Tile.prototype.update = function(opts) {
    if (!opts) return;
    if (opts.elevation) this.el = opts.elevation;
    if (opts.terrain) this.tn = opts.terrain;
}

/**
  Sets the height of the tile
 **/
Tile.prototype.setElevation = function(elevation) {
    this.el = elevation;
}

/**
  Sets the terrain of the tile
 **/
Tile.prototype.setTerrain = function(terrain) {
    this.tn = terrain;
}

/**
  Returns the terrain
**/
Tile.prototype.getTerrain = function() {
    return this.tn;
}
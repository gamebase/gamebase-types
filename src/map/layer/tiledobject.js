/**
  A tiled object layer holds a tile layer, where a collection of tiles
  may comprises an object
  
  For example: A tree may occupy tiles (donoted by X, with a collision grid given by +)
  XXX   
  XXX   +
   X    +
   
  This layer will have a reference to the tree, the tiles it occupies,
  and any potential collisions.
  
  Additionally, the TiledObjectLayer prevents any other object in the layer
  from occupying any tile that is currently taken by any other object
 **/
function TiledObjectLayer(id, size, opts) {
    this.id = id;
    this.size = size;
    this.type = 'tiledobject';
    this.tiles = new Array(size.width * size.height);
    this.objects = {};
}

/**
  Returns the tile at x,y
 **/
TiledObjectLayer.prototype.getTile = function(x, y) {
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
TiledObjectLayer.prototype.setTile = function(x, y, tile) {
    this.tiles[this.getTileIndex(x,y)] = tile;
}

/**
  Returns the array index of the tile
 **/
TiledObjectLayer.prototype.getTileIndex = function(x, y) {
    return (y * this.size.width) + x;
}

/**
  Converts a tile index to x,y tile coordinates
 **/
TiledObjectLayer.prototype.getIndexPosition = function(tileIndex) {
    return {
        x: tileIndex % this.size.width,
        y: Math.floor(tileIndex / this.size.width)
    }
}

/**
  Return surrounds
 **/
TiledObjectLayer.prototype.getSurrounds = function(x, y) {
    return [
        this.getTile(x-1, y-1), this.getTile(x, y-1), this.getTile(x + 1, y - 1),
        this.getTile(x-1, y), this.getTile(x, y), this.getTile(x+1, y),
        this.getTile(x-1, y+1), this.getTile(x, y+1), this.getTile(x+1, y+1)
    ];    
}

/**
  Checks that the object's proposed bounds to do not impinge
  on an existing object
 **/
TiledObjectLayer.prototype.checkBounds = function(object, options) {
    var opts = options || {},
        position = object.topLeft,
        width = object.width,
        height = Math.ceil(object.tiles.length / width),
        numTiles = object.tiles.length;
        
    // Check that the object fits within the layer bounds
    if (position.x < 0 || position.x + width >= this.size.width
         || position.y < 0 || position.y + height >= this.size.height) {
         return false;
    }
     
    // Ignore the check for collisions if instructed
    if (opts && opts.allowCollisions === true) {
        return true;
    }
        
    // Check for collisions with other objects
    while (numTiles--) {
       
       var relativePosition = { x: numTiles % width, y: Math.floor(numTiles / width) },
           layerPosition = { x: position.x + relativePosition.x, y: position.y + relativePosition.y },
           tile = this.getTile(layerPosition);
           
       if (tile && tile.obj && tile.obj != object.id) {
           return false;
       }                   
    }
    return true;
}

/**
  Adds an object with the given id at the position starting from the
  tile topLeft given
 **/
TiledObjectLayer.prototype.addObject = function(object, options) {
    
    // Check that we can add an object there
    if (!this.checkBounds(object, options)) {
        return false;
    }
    
    var id = object.id || Date.now();
    // Check if the object already exists
    if (this.objects[id] != null) {
        return false;
    }
    
    this.objects[id] = object;
    
    var position = object.topLeft,
        width = object.width,
        height = Math.ceil(object.tiles.length / width),
        numTiles = object.tiles.length;
        
    // Set the object tiles
    while (numTiles--) {
        
        var objectTile = object.tiles[numTiles];
        
        // Ignore empty tiles
        if (!objectTile || objectTile === -1) continue;
        
        var relativePosition = { x: numTiles % width, y: Math.floor(numTiles / width) },
            layerPosition = { x: position.x + relativePosition.x, y: position.y + relativePosition.y },
            tile = new Tile({terrain: objectTile});
            
        tile.obj = id;
        this.setTile(layerPosition.x, layerPosition.y, tile);              
    }
    return true;
}

/**
  Exports the terrain layer to JSON
 **/
TiledObjectLayer.prototype.toJSON = function() {
    return {id: this.id, type: this.type, size: this.size, tiles: this.tiles};
}
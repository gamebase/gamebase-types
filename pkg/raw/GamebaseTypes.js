// dep: underscore

/**
  The 2dMap contains all the information related to a 2d map
 **/
function Map2D(opts) {
    
    opts = opts || {};
    console.log(opts);
    this.size = opts.size || {width: 300, height: 300};
    this.tile = opts.tile || {width: 16, height: 16};
    this.metadata = opts.metadata || {title: "Untitled World"};
    this.layers = [];
}

/**
  Adds a layer to the map at the position indicated
  (if no position supplied, on top of other layers)
 **/
Map2D.prototype.addLayer = function(layer, position) {
    if (!layer) return;
    if (!position || position >= this.layers.length) {
        this.layers.push(layer);
    } else {
        this.layers.splice(position, 0, layer);
    }
}

/**
  Returns the layer with the given id
 **/
Map2D.prototype.getLayer = function(id) {
    var i = this.layers.length;
    while (i--) {
        if (this.layers[i].id === id) {
            return this.layers[i];
        }
    }
    return null;
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
  Returns true if the x,y is within the bounds of the map
 **/
Map2D.prototype.withinBounds = function(x, y) {
    return (x >= 0 && x < this.size.width)
        && (y >= 0 && y < this.size.height);
}

Map2D.prototype.toJSON = function() {
    var results = {world: {size: this.size}, layers: []};
    
    for (var i = 0; i < this.layers.length; i++) {
        results.layers.push(this.layers[i].toJSON());
    }
    return results;
}
/**
  A MapObject is contained within an ObjectGroupLayer
 **/
function MapObject(options) {
    options = options || {};
    
    this.name = options.name;
    this.type = options.type;
    this.size = options.size || {width: 1, height: 1};
    this.position = options.position || {x: 0, y: 0};
    this.properties = options.properties || {};
}

MapObject.prototype.intersects = function(topLeft, bottomRight) {
    
    var minX = this.position.x,
        minY = this.position.y,
        maxX = minX + this.size.width,
        maxY = minY + this.size.height;
    
    return  (minX <= bottomRight.x) && (maxX >= topLeft.x) &&
            (minY <= bottomRight.y) && (maxY >= topLeft.y);
}
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
/**
  An object group contains arbitrary objects that occur within the map,
  but not necessarily bound to tile coordinates
 **/
function ObjectGroupLayer(id, size, opts) {
    this.id = id;
    this.size = size;
    this.type = 'objectgroup';
    
    this.objects = [];
}

/**
  Adds a MapObject to the group layer
 **/
ObjectGroupLayer.prototype.addObject = function(object) {
    this.objects.push(object);
}

/**
  Gets all objects at the given x,y tile position
 **/
ObjectGroupLayer.prototype.getObjectsAt = function(x, y) {
    return null;
}

/**
  Returns the first object that intersects the x,y tile position
 **/
ObjectGroupLayer.prototype.getTile = function(x, y) {
    if (!this.objects || this.objects.length == 0) return null;
    for (var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
        if (object.intersects({x: x, y: y}, {x: x, y: y})) {
            return object;
        }
    }
    return null;
}
function randomInRange(min, max) {
    return Math.round(min+ (Math.random() * (max - min)));
}

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
            4: BasicColors.blue,
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
        colour = this.opts.colorize || false,
        terrainLayer = map.getLayer('terrain');

    for (var i = 0; i < terrainLayer.tiles.length; i++) {
        var tile = terrainLayer.tiles[i],
            value = (tile ? tile.tn || '?' : '*');
            
        if (colour) {
            var pal = this.opts.palette[value];
            if (pal) value = pal[0] + value + pal[1];
        }
        rep += value;
        
        if ((i + 1) % map.size.width === 0) {
            output.write(rep + '\n');
            rep = "";
        }
    }
}

function GamebaseTypes() {
    
}

GamebaseTypes.Map2D = Map2D;
GamebaseTypes.Tile = Tile;
GamebaseTypes.MapObject = MapObject;
GamebaseTypes.TerrainLayer = TerrainLayer;
GamebaseTypes.TiledObjectLayer = TiledObjectLayer;
GamebaseTypes.ObjectGroupLayer = ObjectGroupLayer;
GamebaseTypes.ASCIIVisualizer = ASCIIVisualizer;
GamebaseTypes.randomInRange = randomInRange;
GamebaseTypes.Unicode = {
    Color: BasicColors
};
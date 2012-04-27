/**
  The 2dMap contains all the information related to a 2d map
 **/
function Map2D(opts) {
    
    opts = opts || {};
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
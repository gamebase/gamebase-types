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
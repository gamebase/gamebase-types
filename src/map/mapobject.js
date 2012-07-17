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
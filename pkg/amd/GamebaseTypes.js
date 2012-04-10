define('GamebaseTypes', ['underscore'], function(underscore) {
  
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
  
  
  function GamebaseTypes() {
      
  }
  
  GamebaseTypes.Map2D = Map2D;
  GamebaseTypes.Tile = Tile;
  GamebaseTypes.ASCIIVisualizer = ASCIIVisualizer;
  GamebaseTypes.randomInRange = randomInRange;
  GamebaseTypes.Unicode = {
      Color: BasicColors
  };

  return GamebaseTypes;
});
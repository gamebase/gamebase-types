// dep: underscore

//= map/map.js
//= map/mapobject.js
//= map/tile.js
//= map/layer/terrain.js
//= map/layer/tiledobject.js
//= map/layer/objectgroup.js
//= utils/random.js
//= utils/sort.js
//= visualizer/asciivisualizer.js

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
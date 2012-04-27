var gbtypes = require('../pkg/cjs/GamebaseTypes'),
    object = {
        id: 'tree',
        topLeft: {x: 2, y: 2},
        width: 3,
        tiles: [1, 1, 1,
                1, 1, 1,
                null, 1, null]
    };

describe('Tiled object layer', function() {
        
    it('check for collisions', function(done) {
       
        var layer = new gbtypes.TiledObjectLayer('testobjects', {width: 10, height: 10});
        
        layer.addObject(object);
        console.log(layer.tiles);
        done();
    });
        
});
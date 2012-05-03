var _ = require('underscore'),
    expect = require('chai').expect,
    gbtypes = require('../pkg/cjs/GamebaseTypes'),
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
        var ok = layer.addObject({
            id: 'tree1',
            width: 3,
            tiles: [1, 1, 1,
                    1, 1, 1,
                    null, 1, null],
            topLeft: {x: 3, y: 2}});
        expect(ok).to.equal(false);
        
        ok = layer.addObject(_.extend(_.clone(object), {id: 'tree2', topLeft: {x: 6, y: 2}}));
        expect(ok).to.equal(true);
        
        done();
    });
        
});
module.exports = {
    randomInRange: function(min, max) {
        return Math.round(min+ (Math.random() * (max - min)));
    }
}
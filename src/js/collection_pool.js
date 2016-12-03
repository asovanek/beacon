var collections = {};

export default {
    getCollection: function(name) {
        return collections[name];
    },

    setCollection: function (name, collection) {
        collections[name] = collection;
        return collections[name];
    }
};
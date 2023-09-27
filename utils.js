const { keys, shell, values, length, map } = require("@laufire/utils/collection");

module.exports = {
    mapAsync: async (collection, cb) => {
        const collectionKeys = keys(collection);
        const ret = shell(collection);
        const res = await Promise.all(values(map(collection, cb)));
        let index = 0;
        const collectionLength = length(collectionKeys);
    
        for(let i = 0; i < collectionLength; i++) {
            ret[collectionKeys[i]] = res[index];
            index++;
        }
        return ret;
    }
};
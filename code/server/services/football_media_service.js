'use strict';

function update (id, media, cb) {
    this.findOneAndUpdate({_id: id}, media, { upsert:true, new:true, setDefaultsOnInsert: true }, cb);
}

module.exports = {
    update
};
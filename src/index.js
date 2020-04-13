"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keyv = require("keyv");
const keyvExt = require("keyv-extensions");
const shortid = require("shortid");
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.');
class Item {
    constructor(pool, key, status) {
        this.pool = pool;
        this.key = key;
        this.status = status;
    }
    set(value) {
        return this.pool.set(this, value);
    }
    setStatus(status) {
        return this.pool.setStatus(this, status);
    }
    get() {
        return this.pool.get(this);
    }
}
class Pool {
    constructor(database) {
        this.database = database;
        this.items = new Keyv({ store: new keyvExt.KeyvSub(this.database, 'data') });
        this.statuses = new Keyv({ store: new keyvExt.KeyvSub(this.database, 'statuses') });
    }
    add(value, status) {
        const key = value instanceof Item ? value.key : shortid.generate();
        status = value instanceof Item ? value.status : status;
        return this.items.set(key, value)
            .then(() => {
            if (!status) {
                status = 'default';
            }
            return this.setStatus(key, status);
        })
            .then(() => {
            return new Item(this, key, status);
        });
    }
    set(key, value) {
        key = key instanceof Item ? key.key : key;
        return this.items.set(key, value);
    }
    setStatus(key, status) {
        const parsedkey = key instanceof Item ? key.key : key;
        return this.statuses.get(status)
            .then(s => {
            if (!s)
                s = [];
            s.push(parsedkey);
            return this.statuses.set(status, s).then(() => {
                return new Item(this, parsedkey, status);
            });
        });
    }
    get(key) {
        return this.items.get(key instanceof Item ? key.key : key);
    }
    getItemsOf(status) {
        return this.statuses.get(status).then(items => {
            return items.map(i => new Item(this, i, status));
        });
    }
    getOf(status) {
        var output = [];
        var resolve = (items) => {
            return Promise.resolve()
                .then(() => {
                return this.get(items.pop());
            })
                .then((i) => {
                output.push(i);
                if (items.length != 0) {
                    return resolve(items);
                }
            });
        };
        return this.statuses.get(status).then(items => {
            return resolve(items);
        });
    }
}
const exp = Pool;
exports.default = exp;
module.exports = exp;

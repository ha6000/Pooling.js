import * as Keyv from 'keyv';
import * as keyvExt from 'keyv-extensions';
import * as shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.')

class Item {
	constructor(pool: Pool, key: string, status: string) {
		this.pool = pool;
		this.key = key;
		this.status = status;
	}
	set(value: any): Promise<true> {
		return this.pool.set(this, value);
	}
	setStatus(status: string): Promise<Item> {
		return this.pool.setStatus(this, status);
	}
	get(): Promise<any> {
		return this.pool.get(this);
	}
	pool: Pool;
	key: string;
	status: string;
}

class Pool {
	constructor(database: Keyv) {
		this.database = database;
		this.items = new Keyv({store: new keyvExt.KeyvSub(this.database, 'data')});
		this.statuses = new Keyv({store: new keyvExt.KeyvSub(this.database, 'statuses')});
	}
	add(value: Item | any, status?: string): Promise<Item> {
		const key = value instanceof Item ? value.key : shortid.generate();
		status = value instanceof Item ? value.status : status;
		return this.items.set(key, value)
		.then(() => {
			if(!status) {
				status = 'default';
			}
			return this.setStatus(key, status);
		})
		.then(() => {
			return new Item(this, key, status);
		});
	}
	set(key: Item | string, value: any): Promise<true> {
		key = key instanceof Item ? key.key : key;
		return this.items.set(key, value);
	}
	setStatus(key: Item | string, status: string): Promise<Item> {
		const parsedkey = key instanceof Item ? key.key : key;
		return this.statuses.get(status)
		.then(s => {
			if (!s) s = [];
			s.push(parsedkey);
			return this.statuses.set(status, s).then(() => {
				return new Item(this, parsedkey, status);
			});
		})
	}
	get(key: Item | string): Promise<any> {
		return this.items.get(key instanceof Item ? key.key : key);
	}
	getItemsOf(status: string): Promise<Item[]> {
		return this.statuses.get(status).then(items => {
			return items.map(i => new Item(this, i, status));
		})
	}
	getOf(status: string): Promise<any[]> {
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
		}
		return this.statuses.get(status).then(items => {
			return resolve(items);
		});
	}
	database: Keyv
	items: Keyv
	statuses: Keyv
}

module.exports = Pool;
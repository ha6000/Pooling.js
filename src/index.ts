import * as Keyv from 'keyv';
import * as keyvExt from 'keyv-extensions';
import * as shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.')

/**
 * A item instance used to interact with pool items
 */
class Item {
	/**
	 * @param {Pool}   pool   The pool class
	 * @param {string} key    The key name of the item
	 * @param {string} status Status name the item belongs to
	 */
	constructor(pool: Pool, key: string, status: string) {
		this.pool = pool;
		this.key = key;
		this.status = status;
	}
	/**
	 * Sets the value of the item
	 * @param  {any}           value
	 * @return {Promise<true>}       Returns promise, resolves to true if succesfull
	 */
	set(value: any): Promise<true> {
		return this.pool.set(this, value);
	}
	/**
	 * Set the status of the 
	 * @param  {string}        status
	 * @return {Promise<Item>}        Promise resolving with the new item
	 */
	setStatus(status: string): Promise<Item> {
		return this.pool.setStatus(this, status);
	}
	/**
	 * Gets the value of the item
	 * @return {Promise<any>} Promise with the value
	 */
	get(): Promise<any> {
		return this.pool.get(this);
	}
	/**
	 * @type {Pool}
	 */
	pool: Pool;
	/**
	 * @type {string}
	 */
	key: string;
	/**
	 * @type {string}
	 */
	status: string;
}

/**
 * Handles database and pools
 */
class Pool {
	/**
	 * @param {Keyv} database The keyv database of choice
	 */
	constructor(database: Keyv) {
		this.database = database;
		this.items = new Keyv({store: new keyvExt.KeyvSub(this.database, 'data')});
		this.statuses = new Keyv({store: new keyvExt.KeyvSub(this.database, 'statuses')});
	}
	/**
	 * Add a item to the pool
	 * @param  {Item|Any}       value
	 * @param  {string}        status
	 * @return {Promise<Item>}        Promise with item
	 */
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
	/**
	 * Sets a value of a key
	 * @param  {Item|string}      key
	 * @param  {any}           value
	 * @return {Promise<true>}       promise with true if succesfull
	 */
	set(key: Item | string, value: any): Promise<true> {
		key = key instanceof Item ? key.key : key;
		return this.items.set(key, value);
	}
	/**
	 * Sets status of a item
	 * @param  {Item|string}      key
	 * @param  {string}        status
	 * @return {Promise<Item>}        Promise with the new item
	 */
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
	/**
	 * Get item's value
	 * @param  {Item|string}      key
	 * @return {Promise<any>}   The value
	 */
	get(key: Item | string): Promise<any> {
		return this.items.get(key instanceof Item ? key.key : key);
	}
	/**
	 * Get all the items with certain status
	 * @param  {string}          status
	 * @return {Promise<Item[]>}        Array with items
	 */
	getItemsOf(status: string): Promise<Item[]> {
		return this.statuses.get(status).then(items => {
			return items.map(i => new Item(this, i, status));
		})
	}
	/**
	 * get all of the value's with certain status
	 * @param  {string}         status
	 * @return {Promise<any[]>}        Array with all the values
	 */
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
	/**
	 * @type {Keyv}
	 */
	database: Keyv
	/**
	 * @type {Keyv}
	 */
	items: Keyv
	/**
	 * @type {Keyv}
	 */
	statuses: Keyv
}

const exp = Pool;

export default exp;

module.exports = exp;
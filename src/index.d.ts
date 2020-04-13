import * as Keyv from 'keyv';
declare class Item {
    constructor(pool: Pool, key: string, status: string);
    set(value: any): Promise<true>;
    setStatus(status: string): Promise<Item>;
    get(): Promise<any>;
    pool: Pool;
    key: string;
    status: string;
}
declare class Pool {
    constructor(database: Keyv);
    add(value: Item | any, status?: string): Promise<Item>;
    set(key: Item | string, value: any): Promise<true>;
    setStatus(key: Item | string, status: string): Promise<Item>;
    get(key: Item | string): Promise<any>;
    getItemsOf(status: string): Promise<Item[]>;
    getOf(status: string): Promise<any[]>;
    database: Keyv;
    items: Keyv;
    statuses: Keyv;
}

export default Pool;
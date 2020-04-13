# Pooling.js
![npm](https://img.shields.io/npm/v/pooling.js)
[![NPM](https://nodei.co/npm/pooling.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pooling.js/)
# Introduction

Handle statuses of data, and store the information in a [Keyv](https://github.com/lukechilds/keyv) database

## Examples
Creates a item and gets its value
```js
const Pool = require('pooling.js')
const pool = new Pool()

# Documentation

## Classes

<dl>
<dt><a href="#Item">Item</a></dt>
<dd><p>A item instance used to interact with pool items</p>
</dd>
<dt><a href="#Pool">Pool</a></dt>
<dd><p>Handles database and pools</p>
</dd>
</dl>

<a name="Item"></a>

## Item
A item instance used to interact with pool items

**Kind**: global class  

* [Item](#Item)
    * [new Item(pool, key, status)](#new_Item_new)
    * [.set(value)](#Item+set) ⇒ <code>Promise.&lt;true&gt;</code>
    * [.setStatus(status)](#Item+setStatus) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.get()](#Item+get) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_Item_new"></a>

### new Item(pool, key, status)

| Param | Type | Description |
| --- | --- | --- |
| pool | [<code>Pool</code>](#Pool) | The pool class |
| key | <code>string</code> | The key name of the item |
| status | <code>string</code> | Status name the item belongs to |

<a name="Item+set"></a>

### item.set(value) ⇒ <code>Promise.&lt;true&gt;</code>
Sets the value of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: <code>Promise.&lt;true&gt;</code> - Returns promise, resolves to true if succesfull  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

<a name="Item+setStatus"></a>

### item.setStatus(status) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Set the status of the

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: [<code>Promise.&lt;Item&gt;</code>](#Item) - Promise resolving with the new item  

| Param | Type |
| --- | --- |
| status | <code>string</code> | 

<a name="Item+get"></a>

### item.get() ⇒ <code>Promise.&lt;any&gt;</code>
Gets the value of the item

**Kind**: instance method of [<code>Item</code>](#Item)  
**Returns**: <code>Promise.&lt;any&gt;</code> - Promise with the value  
<a name="Pool"></a>

## Pool
Handles database and pools

**Kind**: global class  

* [Pool](#Pool)
    * [new Pool(database)](#new_Pool_new)
    * [.add(value, status)](#Pool+add) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.set(key, value)](#Pool+set) ⇒ <code>Promise.&lt;true&gt;</code>
    * [.setStatus(key, status)](#Pool+setStatus) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
    * [.get(key)](#Pool+get) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getItemsOf(status)](#Pool+getItemsOf) ⇒ <code>Promise.&lt;Array.&lt;Item&gt;&gt;</code>
    * [.getOf(status)](#Pool+getOf) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>

<a name="new_Pool_new"></a>

### new Pool(database)

| Param | Type | Description |
| --- | --- | --- |
| database | <code>Keyv</code> | The keyv database of choice |

<a name="Pool+add"></a>

### pool.add(value, status) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Add a item to the pool

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: [<code>Promise.&lt;Item&gt;</code>](#Item) - Promise with item  

| Param | Type |
| --- | --- |
| value | [<code>Item</code>](#Item) \| <code>Any</code> | 
| status | <code>string</code> | 

<a name="Pool+set"></a>

### pool.set(key, value) ⇒ <code>Promise.&lt;true&gt;</code>
Sets a value of a key

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: <code>Promise.&lt;true&gt;</code> - promise with true if succesfull  

| Param | Type |
| --- | --- |
| key | [<code>Item</code>](#Item) \| <code>string</code> | 
| value | <code>any</code> | 

<a name="Pool+setStatus"></a>

### pool.setStatus(key, status) ⇒ [<code>Promise.&lt;Item&gt;</code>](#Item)
Sets status of a item

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: [<code>Promise.&lt;Item&gt;</code>](#Item) - Promise with the new item  

| Param | Type |
| --- | --- |
| key | [<code>Item</code>](#Item) \| <code>string</code> | 
| status | <code>string</code> | 

<a name="Pool+get"></a>

### pool.get(key) ⇒ <code>Promise.&lt;any&gt;</code>
Get item's value

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: <code>Promise.&lt;any&gt;</code> - The value  

| Param | Type |
| --- | --- |
| key | [<code>Item</code>](#Item) \| <code>string</code> | 

<a name="Pool+getItemsOf"></a>

### pool.getItemsOf(status) ⇒ <code>Promise.&lt;Array.&lt;Item&gt;&gt;</code>
Get all the items with certain status

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: <code>Promise.&lt;Array.&lt;Item&gt;&gt;</code> - Array with items  

| Param | Type |
| --- | --- |
| status | <code>string</code> | 

<a name="Pool+getOf"></a>

### pool.getOf(status) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
get all of the value's with certain status

**Kind**: instance method of [<code>Pool</code>](#Pool)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - Array with all the values  

| Param | Type |
| --- | --- |
| status | <code>string</code> | 


const Keyv = require('keyv');
var db = new Keyv('sqlite://data.sqlite');

const Pool = require('../src/index.js');
const pool = new Pool(db);

pool.get('Lx-XJIzR3').then((item) => {
	console.log(item);
})
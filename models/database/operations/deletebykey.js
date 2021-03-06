var op = require("./operation.js");
var r = require('rethinkdb');

var model 		= module.exports;
model.create	= create;

function create(_table, _key, _callback, _errCallback){
    'use strict';
	return new DeleteByKey(_table, _key, _callback, _errCallback);
}

DeleteByKey.prototype = Object.create(op.Operation.prototype);
DeleteByKey.prototype.constructor = DeleteByKey;

function DeleteByKey(_table, _key, _callback, _errCallback){
    op.Operation.call(this, _table, _callback, _errCallback);
    this.key = _key;
}

DeleteByKey.prototype.run = function (conn) {
    return r.table(this.table).get(this.key).delete().run(conn);
};

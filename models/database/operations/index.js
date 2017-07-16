var conn 				= require("./connection.js");
var insert 				= require("./insert.js");
var deletebykey 		= require("./deletebykey.js");
var deletebyfilter 		= require("./deletebyfilter.js");
var getall 			= require("./getall.js");
var getbykey 			= require("./getbykey.js");
var getbyfilter 		= require("./getbyfilter.js");
var countbyfilter 		= require("./countbyfilter.js");
var updatebykey 		= require("./updatebykey.js");

var model 				= module.exports;
model.cursorToArray 	= conn.cursorToArray;
model.cursorToField 	= conn.cursorToField;
model.close 			= conn.close;
model.connect 			= conn.connect;
model.Connect 			= conn.Connect;

model.Insert 			= insert.create;
model.DeleteByKey 		= deletebykey.create;
model.DeleteByFilter	= deletebyfilter.create;
model.GetByKey 			= getbykey.create;
model.GetAll          = getall.create;
model.GetByFilter 		= getbyfilter.create;
model.CountByFilter	 	= countbyfilter.create;
model.UpdateByKey	 	= updatebykey.create;

function SendServerData(){
	this.data = {};
	this.dataTag = 'filterOptions';
	this.errorInfo = { error: { triggered: false, description: ""} };
}

SendServerData.prototype.toString = function(){
	return JSON.stringify(this.data);
};

SendServerData.prototype.getData = function(){
	return this.data;
};

SendServerData.prototype.add = function(newLabel, newData){
	this.data[newLabel] = newData;
};

SendServerData.prototype.getDataTag = function(){
	return this.dataTag;
};

SendServerData.prototype.send = function(serverURL, callback){
	if(!callback){
		callback = function(data) {};
	}

	if( !this.data[this.dataTag] ){
		alert("Please, say something!");
	}
	else{
		$.ajax({
			type: 'POST',
			url: serverURL,
			data: {
				userData: this.data
			},
			success: callback
		});
	}
};

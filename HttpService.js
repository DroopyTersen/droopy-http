//Constructor
var request = require("request"),
	cache = require("./cache"),
	Q = require("q");

var HttpService = function() {};

HttpService.prototype.get = function(url, options, bustCache) {
	var deferred = Q.defer();
	options = options || {};
	options.url = url;

	//First try cache
	var cachedItem = cache.get(url);
	if (cachedItem && bustCache !== true) {
		deferred.resolve(cachedItem);
	} else {
		request(options, function(error, response, body) {
			if (!error) {
				cache.set(url, body);
				deferred.resolve(body);

			} else {
				deferred.reject(error);
			}
		});
	}

	return deferred.promise;
};

HttpService.prototype.post = function(url, body, options) {
	var deferred = Q.defer();
	request.post(url, body, function(error, response, body){
		if(!error) {
			deferred.resolve(body);
		} else {
			deferred.reject(error);
		}
	});
	return deferred.promise;
};

HttpService.prototype.getJSON = function(url, bustCache) {
	var options = {
		json: true
	};
	return this.get(url, options, bustCache);
};

module.exports = HttpService;
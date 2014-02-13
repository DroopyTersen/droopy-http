module.exports = (function() {
	"use strict";
	var cache = {};
	var cacheDuration = 12;

	var clearCache = function() {
		cache = {};
	};

	var getCache = function(key) {
		if (cache[key] && cache[key].expiration > new Date()) {
			return cache[key].value;
		}

		return null;
	};

	var setCache = function(key, value, duration) {
		var expiration = new Date();
		var dur = duration || cacheDuration;
		expiration.setHours(expiration.getHours() + dur);
		cache[key] = {
			expiration: expiration,
			value: value
		};
	};

	return {
		get: getCache,
		set: setCache,
		clear: clearCache
	};

})();
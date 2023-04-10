/* global Call, CreateMethodProperty, Get, IsCallable, ToBoolean, ToString */
// 23.2.3.14 %TypedArray%.prototype.findLastIndex ( predicate [ , thisArg ] )
(function () {
	function findLastIndex(predicate /*[ , thisArg ]*/) {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 4. If IsCallable(predicate) is false, throw a TypeError exception.
		if (!IsCallable(predicate)) throw TypeError();
		// 5. Let k be len - 1.
		var k = len - 1;
		// 6. Repeat, while k ≥ 0,
		while (k >= 0) {
			// a. Let Pk be ! ToString(𝔽(k)).
			var Pk = ToString(k);
			// b. Let kValue be ! Get(O, Pk).
			var kValue = Get(O, Pk);
			// c. Let testResult be ToBoolean(? Call(predicate, thisArg, « kValue, 𝔽(k), O »)).
			var testResult = ToBoolean(Call(predicate, arguments.length > 1 ? arguments[1] : undefined, [kValue, k, O]))
			// d. If testResult is true, return 𝔽(k).
			if (testResult) {
				return k;
			}
			// e. Set k to k - 1.
			k = k - 1;
		}
		// 7. Return -1𝔽.
		return -1;
	}

	// in IE11, `Int8Array.prototype` inherits directly from `Object.prototype`
	// in that case, don't define `at` on the parent; define it directly on the prototype
	if ('__proto__' in self.Int8Array.prototype && self.Int8Array.prototype.__proto__ !== Object.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'findLastIndex', findLastIndex);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Uint8Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Int16Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Uint16Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Int32Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Uint32Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Float32Array.prototype, 'findLastIndex', findLastIndex);
		CreateMethodProperty(self.Float64Array.prototype, 'findLastIndex', findLastIndex);
	}
})();

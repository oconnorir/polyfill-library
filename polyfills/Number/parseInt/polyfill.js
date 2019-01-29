/* global CreateMethodProperty */
(function (nativeParseInt, global) {
	// Polyfill.io - IE 8's parseInt is incorrect
    CreateMethodProperty(global, 'parseInt', function parseInt(str, radix) {
        var string = String(str).trim();
        return nativeParseInt(string, (radix >>> 0) || (/^[-+]?0[xX]/.test(string) ? 16 : 10));
    });
	// 20.1.2.13. Number.parseInt ( string, radix )
	// The value of the Number.parseInt data property is the same built-in function object that is the value of the  parseInt property of the global object defined in 18.2.5.
	CreateMethodProperty(Number, 'parseInt', global.parseInt);
}(parseInt, this));
'DOMTokenList' in self && (function (x) {
	return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
})(document.createElement('x'))

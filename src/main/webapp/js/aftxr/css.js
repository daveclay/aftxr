(function() {
    var vendor = (function () {
        var vendors = 't,webkitT,MozT,msT,OT'.split(','),
            dummyStyle = document.createElement('div').style,
            t,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            t = vendors[i] + 'ransform';
            if ( t in dummyStyle ) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    })();

    function prefixStyle(style) {
        if ( vendor === '' ) return style;
        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    };

    var CSSUtils = {
        prefixStyle: prefixStyle,
        cssVendor: vendor ? '-' + vendor.toLowerCase() + '-' : '',
        transformOrigin: prefixStyle('transformOrigin'),
        transform: prefixStyle('transform'),
        transitionDuration: prefixStyle('transitionDuration'),

        transitionEndEvent: (function () {
            if ( vendor === false ) return false;
            var transitionEnd = {
                ''			: 'transitionend',
                'webkit'	: 'webkitTransitionEnd',
                'Moz'		: 'transitionend',
                'O'			: 'oTransitionEnd',
                'ms'		: 'MSTransitionEnd'
            };

            return transitionEnd[vendor];
        })()
    };

    window.CSSUtils = CSSUtils;
})();

window.getParameterByName = function(name, url) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url||window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
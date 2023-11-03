Object.prototype.parseJson = function() {
    try {
        return JSON.parse(this);
    } catch (error) {
        return this;
    };
}

Object.prototype.stringifyJson = function() {
    return JSON.stringify(this);
}
import _ from "lodash";

Object.prototype.toCamelCase = () => Array.isArray(this)
    ? obj.map(item => _.mapKeys(item, (v, k) => _.camelCase(k)))
    : _.mapKeys(this, (v, k) => _.camelCase(k));


Object.prototype.parse = function () {
    const str = this.trim();

    try {
        return JSON.parse(str);
    } catch {
        return str;
    }
};

Object.prototype.stringify = function () {
    return JSON.stringify(this);
};

Array.prototype.groupBy = function (iteratee) {
    return _.groupBy(this, iteratee);
};

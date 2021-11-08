Object.defineProperty(Array.prototype, "first", {
    value: function () {
        return this.find((_, index) => index === 0);
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Array.prototype, "last", {
    value: function () {
        const ultimo = this.length - 1;
        return this.find((_, index) => index === ultimo);
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Array.prototype, "any", {
    value: function () {
        return this.length > 0;
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Object.prototype, "toArray", {
    value: function () {
        return Array.from(this);
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Array.prototype, "distinct", {
    value: function (filtro = null) {
        const lista = this;
        if (!filtro)
            return lista
                .map(item => JSON.stringify(item))
                .filter((item, posicao, array) => array.indexOf(item) === posicao)
                .map(item => JSON.parse(item));
        if (typeof filtro === "string")
            return lista.filter((item, _, itens) => !itens.some(_item => _item[filtro] === item[filtro]));
        if (typeof filtro === "function")
            return lista.filter(filtro);
        return lista;
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Array.prototype, "orderBy", {
    value: function (filtro = null, desc = false) {
        const lista = this;
        if (!filtro)
            lista.sort();
        else if (typeof filtro === "string")
            lista.sort((a, b) => {
                const ordemA = a[filtro];
                const ordemB = b[filtro];
                if (ordemA > ordemB) return 1;
                if (ordemA < ordemB) return -1;
                return 0;
            });
        else if (typeof filtro === "function")
            lista.sort(filtro);

        if (desc)
            return lista.reverse();
        return lista;
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(String, "isNullOrEmpty", {
    value: function (texto) {
        return texto === undefined ||
            texto === null ||
            texto === "";
    },

    writable: true,
    configurable: true,
    enumerable: false
});

Object.defineProperty(Date.prototype, "addHours", {
    value: function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    },

    writable: true,
    configurable: true,
    enumerable: false
});

/** Function that count occurrences of a substring in a string;
* @param {String} string               The string
* @param {String} subString            The sub string to search for
* @param {Boolean} [allowOverlapping]  Optional. (Default:false)
*
* @author Vitim.us https://gist.github.com/victornpb/7736865
* @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
* @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
*/
Object.defineProperty(String.prototype, "occurrences", {
    value: function (subString, allowOverlapping) {
        let string = this + "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

        var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    },

    writable: true,
    configurable: true,
    enumerable: false
});

define(function () {
    var Item = (function () {
        function Item(type, name, price) {
            if (typeof type !== 'string') {
                throw new TypeError('The item type must be a string');
            }

            if (type !== 'accessory' && type !== 'smart-phone' && type !== 'notebook' &&
                type !== 'pc' && type !== 'tablet') {
                throw new TypeError('The item type can be only: accessory, smart-phone, notebook, pc or tablet');
            }

            this.type = type;
            if (typeof name !== 'string') {
                throw new TypeError('The item name must be a string');
            }

            if (name.length < 6 || name.length > 40) {
                throw new TypeError('Name length must be between 6 and 40 characters')
            }

            this.name = name;
            if (typeof price !== 'number') {
                throw new TypeError('The price must be a number');
            }

            this.price = price;
        };

        return Item;
    }());

    return Item;
});
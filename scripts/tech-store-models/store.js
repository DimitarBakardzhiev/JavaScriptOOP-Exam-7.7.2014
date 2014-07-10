define(['tech-store-models/item'], function (Item) {
    var Store = (function () {
        function Store(name) {
            if (typeof name !== 'string') {
                throw new TypeError('The item name must be a string');
            }

            if (name.length < 6 || name.length > 40) {
                throw new TypeError('Name length must be between 6 and 40 characters')
            }

            this.name = name;
            this.items = [];
        };

        Store.prototype = {
            addItem: function (item) {
                if (!(item instanceof Item)) {
                    throw new TypeError('Argument must be of type "Item"');
                }

                this.items.push(item);
                return this;
            },

            getAll: function () {                                   
                var alphabeticallySortedItems = this.items;
                alphabeticallySortedItems.sort(function (item1, item2) {
                    if (item1.name.toLocaleLowerCase() < item2.name.toLocaleLowerCase()) return -1;
                    if (item1.name.toLocaleLowerCase() > item2.name.toLocaleLowerCase()) return 1;
                    return 0;
                });

                return alphabeticallySortedItems;
            },

            getSmartPhones: function () {
                var smartPhones = this.filterItemsByType('smart-phone');
                return smartPhones;
            },

            getMobiles: function () {
                var smartPhones = this.filterItemsByType('smart-phone');
                var tablets = this.filterItemsByType('tablet');
                var mobiles = smartPhones.concat(tablets);

                return mobiles;
            },

            getComputers: function () {
                var pcs = this.filterItemsByType('pc');
                var notebooks = this.filterItemsByType('notebook');
                var computers = pcs.concat(notebooks);

                return computers;
            },

            filterItemsByType: function (filterType) {
                var filteredItems = [];

                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].type === filterType) {
                        filteredItems.push(this.items[i]);
                    }
                }

                filteredItems.sort(function (item1, item2) {
                    if (item1.name.toLocaleLowerCase() < item2.name.toLocaleLowerCase()) return -1;
                    if (item1.name.toLocaleLowerCase() > item2.name.toLocaleLowerCase()) return 1;
                    return 0;
                });

                return filteredItems;
            },

            filterItemsByPrice: function (options) {
                var filteredItems = [],
                    min,
                    max;
                if (typeof options === 'undefined') {
                    min = 0;
                    max = Math.min();
                } else {
                    min = options.min || 0;
                    max = options.max || Math.min();
                }

                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].price > min && this.items[i].price < max) {
                        filteredItems.push(this.items[i]);
                    }
                }

                filteredItems.sort(function (item1, item2) {
                    if (item1.price < item2.price) return -1;
                    if (item1.price > item2.price) return 1;
                    return 0;
                });

                return filteredItems;
            },

            countItemsByType: function () {
                var countedItems = [];
                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (typeof countedItems[this.items[i].type] !== 'number') {
                        countedItems[this.items[i].type] = 1;
                    } else {
                        countedItems[this.items[i].type] += 1;
                    }
                }

                return countedItems;
            },

            filterItemsByName: function (partOfName) {
                var filteredItems = [];
                for (var i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i].name.toLocaleLowerCase().indexOf(partOfName) > -1) {
                        filteredItems.push(this.items[i]);
                    }
                }

                filteredItems.sort(function (item1, item2) {
                    if (item1.name.toLocaleLowerCase() < item2.name.toLocaleLowerCase()) return -1;
                    if (item1.name.toLocaleLowerCase() > item2.name.toLocaleLowerCase()) return 1;
                    return 0;
                })
                return filteredItems;
            }
        };

        return Store;
    }());

    return Store;
});
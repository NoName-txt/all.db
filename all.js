const fs = require("fs");

class Database {
    constructor({ dataPath = "./data.json" } = {}) {
        if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, `{\n}`, { flag: 'wx' });
        this.readFile = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        this.writeFile = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }

    set(info, value) {
        const data = this.readFile();
        if (!info) throw new Error("Please enter data name.");

        const text = info.toString();

        function setValue(obj, path, value) {
            const name = path.split(".");
            let current = obj;
            for (let i = 0; i < name.length - 1; i++) {
                const prop = name[i];
                if (typeof current[prop] !== "object" || current[prop] === null) {
                    current[prop] = {};
                }
                current = current[prop];
            }
            const key = name[name.length - 1];
            const index = parseInt(key);
            if (value === undefined && Array.isArray(current) && !isNaN(index)) {
                current.splice(index, 1);
            } else {
                current[key] = value;
            }
        }

        setValue(data, text, value);
        this.writeFile(data);
        return this.get(info);
    }


    get(info) {
        const data = this.readFile();
        if (!info) throw new Error("Please enter data name.");

        const text = info.toString();

        function getValue(obj, path) {
            const name = path.split(".");
            let current = obj;
            for (const prop of name) {
                if (typeof current !== "object" || !current.hasOwnProperty(prop)) {
                    return undefined;
                }
                current = current[prop];
            }
            return current;
        }

        return getValue(data, text);
    }

    has(info) {
        return this.get(info) !== undefined;
    }

    add(info, number) {
        const data = this.get(info) || 0;
        if (isNaN(data) && isNaN(number)) {
            throw new Error("This is not a number");
        }
        return this.set(info, (data + number));
    }

    substr(info, number) {
        const data = this.get(info);
        if (isNaN(data) || isNaN(number)) {
            throw new Error("Both arguments must be numbers.");
        }
        return this.set(info, (data - number));
    }


    push(info, value, hardly) {
        const data = this.get(info);

        if (data == null) {
            if (hardly !== true) {
                return this.set(info, [value]);
            }
            throw new Error("This is not an array");
        } else if (Array.isArray(data)) {
            data.push(value);
            return this.set(info, data);
        } else {
            if (hardly !== true) {
                throw new Error("This is not an array");
            }
            return this.set(info, [value]);
        }
    }



    pull(info, index, text, id) {
        const data = this.get(info);
        if (!Array.isArray(data)) {
            throw new Error("This is not an array");
        }
        if (!info) {
            throw new Error("Please enter data name.");
        }

        let focusIndex;
        if (index !== null) {
            if (index < 0 || index >= data.length) {
                throw new Error("Index out of range");
            }
            focusIndex = index;
        } else if (text) {
            focusIndex = data.findIndex((dt) => {
                if (id) {
                    return dt[id] === text;
                } else {
                    return dt === text;
                }
            });
        }

        if (focusIndex !== -1) {
            data.splice(focusIndex, 1);
        }

        return this.set(info, data);;
    }


    math(info, symbol, number) {
        const data = this.get(info);
        if (isNaN(data) || isNaN(number)) throw new Error("This is not a number");
        let dt;
        switch (symbol) {
            case "+":
                dt = data + number;
                break;
            case "-":
                dt = data - number;
                break;
            case "*":
                dt = data * number;
                break;
            case "/":
                dt = data / number;
                break;
            case "%":
                dt = data % number;
                break;
            default:
                throw new Error("Invalid symbol");
        }
        return this.set(info, dt);
    }


    typeof(info, type = "string") {
        const data = this.get(info);
        if (!data) {
            throw new Error("This is not a data");
        }
        const allowedTypes = ["undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function"];
        if (!allowedTypes.includes(type.toLowerCase())) {
            throw new Error("This type is not included");
        }
        if (typeof data === type) {
            return true;
        }
        return false;
    }

    find(text, tCase) {
        const data = this.readFile();
        const getKeys = (obj, path = []) => {
            if (Object(obj) !== obj) {
                return [path.join(".")];
            }
            return Object.entries(obj).flatMap(([key, val]) =>
                getKeys(val, [...path, key])
            );
        };
        const result = [];
        getKeys(data).forEach(key => {
            const getData = this.get(key);
            if (!getData) {
                return;
            }
            if (tCase && getData.toString().toLowerCase() === text.toString().toLowerCase()) {
                result.push([key, getData]);
            } else if (getData === text) {
                result.push([key, getData]);
            }
        });
        return result;
    }



    filter(func, arg) {
        const data = this.readFile();
        if (arg) {
            func = func.bind(arg);
        }
        const filteredEntries = Object.entries(data).filter(func);
        return Object.fromEntries(filteredEntries);
    }

    getAll = {
        Database: this,
        text(stringify) {
            const data = this.Database.readFile();
            if (stringify) {
                return JSON.stringify(data, null, 2);
            }
            return data;
        },
        save(path = './save.json') {
            const data = this.Database.readFile();
            fs.writeFileSync(path, JSON.stringify(data, null, 2), { flag: 'wx' });
        },
    };

    delete(info) { return this.set(info, undefined) }

    remove(info) { return this.delete(info) }

    fetch(info) { return this.get(info) }

    exists(info) { return this.has(info) }
}

module.exports = Database;

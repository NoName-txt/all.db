import { writeFileSync, readFileSync, existsSync } from "fs";
class Database {
    readFile;
    writeFile;
    constructor({ dataPath = "./data.json" } = {}) {
        if (!existsSync(dataPath))
            writeFileSync(dataPath, `{\n}`, { flag: 'wx' });
        this.readFile = () => JSON.parse(readFileSync(dataPath, "utf-8"));
        this.writeFile = (data) => writeFileSync(dataPath, JSON.stringify(data, null, 4));
    }
    set(key, value) {
        const data = this.readFile();
        if (!key)
            throw new Error("Please enter data name.");
        const text = key.toString();
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
            }
            else {
                current[key] = value;
            }
        }
        setValue(data, text, value);
        this.writeFile(data);
        return this.get(key);
    }
    get(key) {
        const data = this.readFile();
        if (!key)
            throw new Error("Please enter key.");
        const text = key.toString();
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
    delete(key) {
        if (typeof key === "function") {
            const filtered = this.filter(key);
            Object.keys(filtered).forEach(i => {
                this.set(i, undefined);
            });
            return filtered;
        }
        else if (typeof key === "string") {
            return this.set(key, undefined);
        }
        else {
            throw new Error("Key can only be string or function");
        }
    }
    add(key, number) {
        const data = this.get(key) || 0;
        if (isNaN(data) || isNaN(number)) {
            throw new Error("Both arguments must be numbers.");
        }
        return this.set(key, (data + number));
    }
    subtract(key, number) {
        const data = this.get(key) || 0;
        if (isNaN(data) || isNaN(number)) {
            throw new Error("Both arguments must be numbers.");
        }
        return this.set(key, (data - number));
    }
    push(key, value, hardly) {
        const data = this.get(key);
        if (data == null) {
            if (hardly !== true) {
                return this.set(key, [value]);
            }
            throw new Error("This is not an array");
        }
        else if (Array.isArray(data)) {
            data.push(value);
            return this.set(key, data);
        }
        else {
            if (hardly !== true) {
                throw new Error("This is not an array");
            }
            return this.set(key, [value]);
        }
    }
    pull(key, func) {
        const data = this.get(key);
        if (!Array.isArray(data))
            throw new Error("This is not an array");
        if (typeof func !== "function")
            throw new Error("This is not a function");
        const filteredItems = Object.entries(data).filter(func);
        filteredItems.forEach((value) => {
            const index = data.indexOf(value[1]);
            if (index != -1)
                data.splice(index, 1);
        });
        return this.set(key, data);
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    typeof(key, type = "string") {
        const data = this.get(key);
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
    math(key, symbol, number) {
        const data = this.get(key);
        if (isNaN(data) || isNaN(number))
            throw new Error("This is not a number");
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
        return this.set(key, dt);
    }
    find(text, tCase) {
        const data = this.readFile();
        const getKeys = (obj, path = []) => {
            if (Object(obj) !== obj) {
                return [path.join(".")];
            }
            return Object.entries(obj).flatMap(([key, val]) => getKeys(val, [...path, key]));
        };
        const result = [];
        getKeys(data).forEach((key) => {
            const getData = this.get(key);
            if (!getData) {
                return;
            }
            if (tCase && getData.toString().toLowerCase() === text.toString().toLowerCase()) {
                result.push([key, getData]);
            }
            else if (getData === text) {
                result.push([key, getData]);
            }
        });
        return result;
    }
    filter(func) {
        const data = this.readFile();
        if (typeof func !== "function")
            throw new Error("This is not a function");
        const filteredEntries = Object.entries(data).filter(func);
        return Object.fromEntries(filteredEntries);
    }
    getAll() {
        const data = this.readFile();
        const newData = JSON.parse(JSON.stringify(data));
        Object.defineProperty(newData, 'save', {
            enumerable: false,
            value: function (path = './save.json') {
                if (!existsSync(path)) {
                    writeFileSync(path, JSON.stringify(newData, null, 4), { flag: 'wx' });
                }
                else {
                    writeFileSync(path, JSON.stringify(newData, null, 4));
                }
            }
        });
        return newData;
    }
    remove(key) { return this.delete(key); }
    fetch(key) { return this.get(key); }
    exists(key) { return this.has(key); }
    substr(key, number) { return this.subtract(key, number); }
}
export { Database };
//# sourceMappingURL=all.db.js.map
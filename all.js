const fs = require("fs");

class Database{
    constructor({dataPath="./data.json"} = {}){
        if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath,`{\n}`, { flag: 'wx' });
        this.readFile = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        this.writeFile = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }
    
    set(info, is) {
        const data = this.readFile();
        const text = info.toString();
        function setValue(obj, path, value) {
            var ps = path.split(".");
            while (ps.length - 1) {
                var pst = ps.shift();
                if (!(pst in obj)) obj[pst] = {};
                obj = obj[pst];
            }
            obj[ps[0]] = value;
        }
        setValue(data, text, is);
        this.writeFile(data);
        return this.get(info);
    }

    get(info) {
        const data = this.readFile();
        if(!info) throw new Error("Please Enter Data Name.");

        const text = info.toString();
        function getValue(obj, path) {
            var name = path.split(".");
            while (name.length - 1) {
                var nshift = name.shift();
                if (!(nshift in obj)) obj[nshift] = {}
                obj = obj[nshift]
            }
            return obj[name[0]]
        }

        return getValue(data, text);
    }

    has(info){
        const data = this.get(info);
        if(data === undefined) return false; 
            else return true;
    }

    delete(info) {return this.set(info,undefined)}

    remove(info) {return this.delete(info)}

    fetch(info) {return this.get(info)}

    exists(info) {return this.has(info)}

    add(info,number){
        const data = this.get(info) || 0;
        if(isNaN(data) && isNaN(number)) throw new Error("This is not a number");
        var newNumber = data + number;
        return this.set(info,newNumber);
    }
    
    substr(info,number){
        const data = this.get(info) || 0;
        if(isNaN(data) && isNaN(number)) throw new Error("This is not a number");
        var newNumber = data - number;
        return this.set(info,newNumber);
    }

    push(info, value, hardly) {
        const data = this.get(info);

        if (Array.isArray(data)) {
            var arr = data || [];
            arr.push(value);
            return this.set(info,arr);
        } else {
            if(hardly != true && Array.isArray(data)){ 
                throw new Error("This is not an array");
            }
            return this.set(info,[value]);
        }
    }

    pull(info, text, id) {
        const data = this.get(info);
        if (!Array.isArray(data)) throw new Error("This is not an array");
        if(!info) throw new Error("Please Enter Data Name.");
        
        var focusIndex = data.map(dt => {
            if(id) return dt[id]; else return dt;
        }).indexOf(text);
        if (focusIndex !== -1) data.splice(focusIndex, 1);
        return this.set(info,data);
    }

    math(info,symbol,number){
        const data = this.get(info);
        if(isNaN(data) || isNaN(number)) throw new Error("This is not a number");
        //if(!["+","-","*","/","%"].includes(symbol)) throw new Error("This is not a included symbol"); 
        let dt = Function(`'use strict'; return (${data}${symbol}${number})`)();
        return this.set(info,dt);
    }

    typeof(info,type = "string"){
        const data = this.get(info);
        if(!data) throw new Error("This is not a data");
        if(!["undefined","object","boolean","number","bigint","string","symbol","function"].includes(type.toLowerCase())) throw new Error("This is not a included type");
        if(typeof data == type) return true;
        return false;
    }

    find(text,tCase){
        const data = this.readFile();
        const keys = (t, path = []) => Object(t) === t ? Object.entries(t).flatMap(([k,v]) => keys(v, [...path, k])) : [ path.join(".") ];
        const result = [];
        keys(data).forEach(e => {
            var getData = this.get(e);
            if(!getData) return;
            if(tCase === true && getData.toString().toLowerCase() === text.toString().toLowerCase()) return result.push([e,getData]);
                else if(getData === text) return result.push([e,getData]);
        });
        return result;
    }

    
    filter(fnctn, arg) {
        const data = this.readFile();
        if (arg) fnctn = callbackfn.bind(arg);
        return Object.fromEntries(Object.entries(data).filter(fnctn));
    }

    getAll = {
        Database: this,
        text(stringify){
            const data = this.Database.readFile();
            if(stringify == true) return JSON.stringify(data, null, 2);
            return data;
        },
        save(path = "./save.json"){
            const data = this.Database.readFile();
            return fs.writeFileSync(path, JSON.stringify(data, null, 2), { flag: 'wx' })
        }
        
    }

}

module.exports = Database;

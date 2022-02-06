const fs = require("fs");

class Database{
    constructor({dataPath="./data.json"} = {}){
        this.path = dataPath;
        if (!fs.existsSync(dataPath)) {
            console.log("Database file created \nPath: " + this.path);
            fs.writeFileSync(dataPath,"{}", { flag: 'wx' })
        }
        this.readFile = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
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

    delete(info) {
        return this.set(info,undefined);
    }

    remove(info) {
        return this.delete(info);
    }
    
    get(info) {
        const data = this.readFile();
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

    fetch(info){
        return this.get(info)
    }


    has(info){
        const data = this.get(info);
        if(data === undefined) return false; 
            else return true;
    }

    exists(info){
        return this.has(info);
    }

    add(info,number){
        const data = this.get(info);
        if(isNaN(data) && isNaN(number)) throw new Error("This is not a number");
        var newNumber = data + number;
        return this.set(info,newNumber);
    }
    
    substr(info,number){
        const data = this.get(info);
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
            if(hardly != true && typeof data.toLowerCase() === "string"){ 
                throw new Error("This is not an array");
            }
            return this.set(info,[value]);
        }
    }

    pull(info, text, id) {
        const data = this.get(info);
        if (!Array.isArray(data)) throw new Error("This is not an array");
        var focusIndex = data.map(dt => {
            if(id) return dt[id]; else return dt;
        }).indexOf(text);

        if (focusIndex !== -1) data.splice(focusIndex, 1);
        return this.set(info,data);
    }

    getAll() {
        let data = this.readFile();
        return data;
    }
  
  }

  module.exports = Database;

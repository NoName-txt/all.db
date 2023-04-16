# all.db

If you found a bug contact me on [Discord](https://discord.com/users/360322989515866112).

<details><summary>Set</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

// Sets a data in the database
db.set("nonametxt.test", "all.db");
```
Output:
```json
{
  "nonametxt":{
    "test":"all.db"
  }
}
```

</details>


---


<details><summary>Delete</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//Deletes data
db.delete("nonametxt.test");
db.remove("nonametxt.test");
```
Output:
```json
{}
```
</details>


---


<details><summary>Add</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//If the data is a number, it adds a certain amount to data
db.add("nonametxt.number", 1);
```
Output:
```js
data + 1
```

</details>


---


<details><summary>Substr</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//If the data is a number, it subtracts a certain amount from it
db.substr("nonametxt.number", 1);
```
Output:
```js
data - 1
```
</details>


---


<details><summary>Push</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });
db.push("nonametxt.array", { name: "NoNametxt" });

//Pushes an element to an array
db.push("nonametxt.array", { name: "NoNametxt" }, true); //If data is not an array It will convert the data to an array
```

Output:
```json
{
  "nonametxt":{
    "array":[
      {
        "name":"NoNametxt"
      }
    ]
  }
}
```

</details>


---


<details><summary>Pull</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//Deletion by index
db.pull("nonametxt.array", 0);

//Deleting element in array by object
db.pull("nonametxt.array", null, "NoNametxt", "name");

//Direct deletion of the data in the array if it is not Object
db.pull("nonametxt.array", null, "NoNametxt");
```
Output:
```json
{
  "nonametxt":{
    "array":[]
  }
}
```
</details>


---



<details><summary>Get</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//Fetches you the data
db.get("nonametxt");
db.fetch("nonametxt");
```
Output:
```json
"all.db"
```
</details>


---


<details><summary>Data Exists</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//Checks the data is available
db.exists("nonametxt.test");
db.has("nonametxt.test");
```
Output:
```js
true or false
```
</details>


---


<details><summary>Typeof</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//Shows the type of data
db.typeof("nonametxt.typeof"); // true or false (checks the string)

//Compares the type of data with the type you typed
db.typeof("nonametxt.typeof", "number");

```
Output:
```js
true or false
```
</details>


---

<details><summary>Math</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//If the data is a number, applies math operations to data.
db.math("nonametxt", "*", 10);

```
Output:
```js
data * 10
```
</details>


---


<details><summary>Find</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//If you have entered data, it will find and show you.
db.find("Database", true); //Searches without checking case

```
Database:
```json
{
  "string": "DATABASE",
  "otherString": "NoNametxt",
  "object": {
    "db": "database"
  },
  "array": ["database"]
}
```
Output:
```json
[
  [ "string", "DATABASE" ],
  [ "object.db", "database" ],
  [ "array.0", "database" ]
]
```
</details>

---

<details><summary>Filter</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

//If you have entered data, it will filter and show you.
db.filter(([key, value]) => {
    try {
      return value.includes("DataBase");
    } catch (error){};
});
```
Database:
```json
{
  "string": "DataBase",
  "otherString": "NoNametxt",
  "object": {
    "db": "DataBase"
  },
  "array": [ "DataBase" ]
}
```
Output:
```json
{ 
  "string": "DataBase",
  "array": [ "DataBase" ] 
}
```
</details>

---


<details><summary>Get All</summary>

```js
const alldb = require("all.db");
const db = new alldb({ dataPath: "./data.json" });

db.getAll.text(true); //If output true it shows the file as readable, otherwise it shows the file as a single line

db.getAll.save(path); //Saves the file (Path is not required)
```
Output:
```
{ All Data }
```
</details>


---
Version 0.2.4 *
```diff
+ Push Fixed
```
---

Thx for use [all.db](https://www.npmjs.com/package/all.db).

[Discord](https://discord.com/users/360322989515866112).

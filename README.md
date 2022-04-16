# all.db

If you found a bug contact me on [Discord](https://discord.com/users/360322989515866112).




<details><summary>Set</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

// Sets a data in the database
db.set("nonametxt.test","all.db");
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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

//If the data is a number, it adds a certain amount to data
db.add("nonametxt.number",1);
```
Output:
```
data + 1
```

</details>


---


<details><summary>Substr</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

//If the data is a number, it subtracts a certain amount from it
db.substr("nonametxt.number",1);
```
Output:
```
data - 1
```
</details>


---


<details><summary>Push</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});
db.push("nonametxt.array",{name:"NoNametxt"});

//Pushes an element to an array
db.push("nonametxt.array",{name:"NoNametxt"},true); //If data is not an array It will convert the data to an array
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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.pull("nonametxt.array","NoNametxt","name");

//If the data is an array, it deletes the data you want
db.pull("nonametxt.array","NoNametxt");
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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

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
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

//Shows the type of data
db.typeof("nonametxt.typeof"); // true or false (checks the string)

//Compares the type of data with the type you typed
db.typeof("nonametxt.typeof","number");

```
</details>


---

<details><summary>Math</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

//If the data is a number, applies math operations to data.
db.math("nonametxt","*",10);

```
</details>


---


<details><summary>Filter</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

//If you have entered data, it will filter and show you.
db.filter("Database",true); //Searches without checking case

```
Database:
```json
{
  "string": "DataBase",
  "otherString": "NoNametxt",
  "object": {
    "db": "Database"
  },
  "array": ["Database"]
}
```
Output:
```js
[
  [ 'string', 'DataBase' ],
  [ 'object.db', 'Database' ],
  [ 'array.0', 'Database' ]
]
```
</details>


---


<details><summary>Get All</summary>

```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.getAll.text(true); //If output true it shows the file as readable, otherwise it shows the file as a single line

db.getAll.save(path); //Saves the file (Path is not required)
```

</details>


---
Version 0.1.5 *
```diff
+getAll.save Fixed
```
---

Thx for use [all.db](https://www.npmjs.com/package/all.db).

[Discord](https://discord.com/users/360322989515866112).

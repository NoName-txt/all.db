# all.db

If you found a bug contact me on [Discord](https://discord.com/users/360322989515866112).

<details><summary>Set</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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

<details><summary>Get</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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


<details><summary>Delete</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

//If the data is a number, it adds a certain amount to data
db.add("nonametxt.number", 1);
```
Output:
```js
data + 1
```

</details>


---


<details><summary>Subtract</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

//If the data is a number, it subtracts a certain amount from it
db.subtract("nonametxt.number", 1);
```
Output:
```js
data - 1
```
</details>


---


<details><summary>Push</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });
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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

//Specify the object you want to delete.
db.pull("nonametxt.array", (value) => {
  try{
    return value[1].name == "NoNametxt";
  }catch(error){

  }
});
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


<details><summary>Data Exists</summary>

```js
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

//If you have entered data, it will filter and show you.
db.filter(([key, value]) => {
    try {
      return value.includes("DataBase");
    } catch (error){

    };
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
import { Database } from "all.db";
const db = new Database({ dataPath: "./data.json" });

db.getAll(); //Returns JSON Data

db.getAll().save(path); //Saves the data to the specified path
```
Output:
```
{ All Data }
```
</details>


---
Version 0.3.2 *
```diff
+ Fix push
```
---

Thx for use [all.db](https://www.npmjs.com/package/all.db).
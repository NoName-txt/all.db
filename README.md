# all.db

If you found a bug contact me on [Discord](https://discord.com/users/360322989515866112).

## Set
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.set("nonametxt.test","Developer");
```
Output:
```json
{
  "nonametxt":{
    "test":"Developer"
  }
}
```
---
## Delete
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.delete("nonametxt.test");
db.remove("nonametxt.test");
```
Output:
```json
{
}
```
---
## Add
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.add("nonametxt.number",1);
```
Output:
```json
1
```
---
## Substr
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.substr("nonametxt.number",1);
```
Output:
```json
1-1 = 0
```
---
## Push
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.push("nonametxt.array",{name:"NoNametxt"});

//If it's string before it replaces it hardly
db.push("nonametxt.array",{name:"NoNametxt"},true);
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
---
## Pull
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.pull("nonametxt.array","NoNametxt","name");

//If straight array
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
---
## Get
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.get("nonametxt");
db.fetch("nonametxt");
```
Output:
```json
"Developer"
```
---
## Data Exists
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.exists("nonametxt.test");
db.has("nonametxt.test");
```
Output:
```js
true or false
```
---
## Get All
```js
const data = require("all.db");
const db = new data({dataPath:"./data.json"});

db.getAll("nonametxt");
```
Output:
```
Shows the direct file
```
---
Version 0.0.3 *
```diff
+substr Added
```
---

Thx For Use [all.db](https://www.npmjs.com/package/all.db).

[Discord](https://discord.com/users/360322989515866112).

## supported type

* boolean
* string
* number
* array
* object
* ?(optional)
* ""(just check existence)

## To begin
```
npm install jsonschemachecker
```

## Usage

###### boolean string number

```
var jsonschemachecker = require("jsonschemachecker")

var jsonscheme = {
    code: "number"
}
var jsonData = {
    code: 0
}
var result = jsonschemachecker.check(jsonscheme, jsonData)
console.log(result)

// output
// { validate: true }// means succeeded
```

```
var jsonschemachecker = require("jsonschemachecker")

var jsonscheme = {
    code: "number"
}
var jsonData = {
    code: "1"
}
var result = jsonschemachecker.check(jsonscheme, jsonData)
console.log(result)

// output
// { validate: false,// means failed
//   jsonScheme: '{"code":"number"}',
//   jsonData: '{"code":"1"}',
//   error: 'type error: /code' }// means jsonData.code's type is incorrect(should be number)
```


###### embed object
```
var jsonschemachecker = require("jsonschemachecker")

var jsonscheme = {
    code: "number",
    user: {
        name: "string",
        vip: "boolean",
        address: {
            street: "string"
        }
    }
}
var jsonData = {
    code: 1,
    user: {
        name: "name",
        vip: false,
        address: {}
    }
}
var result = jsonschemachecker.check(jsonscheme, jsonData)
console.log(result)

// output
// { validate: false,// means failed
//   jsonScheme: '{"code":"number","user":{"name":"string","vip":"boolean","address":{"street":"string"}}}',
//   jsonData: '{"code":1,"user":{"name":"name","vip":false,"address":{}}}',
//   error: 'absence: /user/address/street' }//means jsonData.user.address.street is absence
```

###### embed array

```
var jsonschemachecker = require("jsonschemachecker")

var jsonscheme = {
    code: "number",
    users: [{
        name: "string",
        vip: "boolean"
    }]
}
var jsonData = {
    code: 1,
    users: [{
        name: "name",
        vip: false
    }, {
        name: "name",
        vip: false
    }, {
        name: "name"
    }]
}
var result = jsonschemachecker.check(jsonscheme, jsonData)
console.log(result)

// { validate: false,// means failed
//   jsonScheme: '{"code":"number","users":[{"name":"string","vip":"boolean"}]}',
//   jsonData: '{"code":1,"users":[{"name":"name","vip":false},{"name":"name","vip":false},{"name":"name"}]}',
//   error: 'absence: /users/[2]/vip' }//means jsonData.users[2].vip is absence
```


var should = require("should")
var jsonschemachecker = require("../lib/jsonschemachecker")

describe('check jsonScheme and jsonData', function() {
    it('should validate false', function() {
        var jsonscheme = ""
        var jsonData = {}
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("type error: jsonScheme")
    })

    it('should validate false', function() {
        var jsonscheme = {}
        var jsonData = ""
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("type error: jsonData")
    })

    it('should validate true', function() {
        var jsonscheme = {}
        var jsonData = {}
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })
})


describe('check jsonData inner property type', function() {
    it('should validate true', function() {
        var jsonscheme = {
            code: "number"
        }
        var jsonData = {
            code: 0
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })

    it('should validate false', function() {
        var jsonscheme = {
            code: "number"
        }
        var jsonData = {
            code: "1"
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("type error: /code")
    })

    it('should validate true', function() {
        var jsonscheme = {
            code: "number",
            user: {
                name: "string",
                vip: "boolean"
            }
        }
        var jsonData = {
            code: 1,
            user: {
                name: "name",
                vip: true
            }
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })

    it('should validate false', function() {
        var jsonscheme = {
            code: "number",
            user: {
                name: "string",
                vip: "boolean"
            }
        }
        var jsonData = {
            code: 1,
            user: {
                name: "name",
                vip: 1
            }
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("type error: /user/vip")
    })

    it('should validate false', function() {
        var jsonscheme = {
            code: "number",
            user: {
                name: "string",
                vip: "boolean"
            }
        }
        var jsonData = {
            code: 1,
            user: {
                name: "name"
            }
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("absence: /user/vip")
    })

    it('should validate false', function() {
        var jsonscheme = {
            code: "number",
            users: [{
                name: "string",
                vip: "boolean"
            }]
        }
        var jsonData = {
            code: 1,
            users: {
                name: "name",
                vip: false
            }
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
        result.error.should.equal("type error: /users")
    })

    it('should validate false', function() {
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
        should(result.validate).not.be.ok()
        result.error.should.equal("absence: /users/[2]/vip")
    })


    it('should validate false', function() {
        var jsonscheme = {
            code: ""
        }
        var jsonData = {
            code: false,
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })


    it('should validate false', function() {
        var jsonscheme = {
            code: ""
        }
        var jsonData = {
            code: 1,
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })


    it('should validate false', function() {
        var jsonscheme = {
            code: ""
        }
        var jsonData = {
            code: "1",
        }
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).be.ok()
    })
})


describe('check ?(optional)', function() {
    it('should validate false', function() {
        var jsonscheme = {
            code: ""
        }
        var jsonData = {}
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)
        should(result.validate).not.be.ok()
    })

    it('should validate true', function() {
        var jsonscheme = {
            code: "?"
        }
        var jsonData = {}
        var result = jsonschemachecker.check(jsonscheme, jsonData)
        console.log(result)

        should(result.validate).be.ok()
    })
})

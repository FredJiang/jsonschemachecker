var check = exports.check = function(jsonScheme, jsonData, jsonSchemePath, orginJsonScheme, originJsonData) {
    if (Object.prototype.toString.call(jsonScheme) !== "[object Object]" &&
        Object.prototype.toString.call(jsonScheme) !== "[object Array]") {
        var result = {
            validate: false,
            jsonScheme: jsonScheme,
            jsonData: jsonData,
            error: "type error: jsonScheme"
        };
        return result
    } else if (Object.prototype.toString.call(jsonData) !== "[object Object]" &&
        Object.prototype.toString.call(jsonData) !== "[object Array]") {
        var result = {
            validate: false,
            jsonScheme: jsonScheme,
            jsonData: jsonData,
            error: "type error: jsonData"
        };
        return result
    }



    if (!jsonSchemePath) {
        jsonSchemePath = ""
    }

    if (!orginJsonScheme) {
        orginJsonScheme = jsonScheme
    }

    if (!originJsonData) {
        originJsonData = jsonData
    }

    for (var attrName in jsonScheme) {
        if (jsonScheme[attrName] == "?") {
            continue;
        }

        if (!jsonData.hasOwnProperty(attrName)) {
            var result = {
                validate: false,
                jsonScheme: JSON.stringify(orginJsonScheme),
                jsonData: JSON.stringify(originJsonData),
                error: "absence: " + jsonSchemePath + "/" + attrName
            };
            return result
        } else {
            switch (jsonScheme[attrName]) {
                case "number":
                case "string":
                case "boolean":
                    {
                        if (typeof jsonData[attrName] != jsonScheme[attrName]) {
                            var result = {
                                validate: false,
                                jsonScheme: JSON.stringify(orginJsonScheme),
                                jsonData: JSON.stringify(originJsonData),
                                error: "type error: " + jsonSchemePath + "/" + attrName
                            };
                            return result
                        }
                        break
                    }
                default:
                    {
                        if (Object.prototype.toString.call(jsonScheme[attrName]) === "[object Object]") {
                            var result = check(jsonScheme[attrName], jsonData[attrName], jsonSchemePath + "/" + attrName, orginJsonScheme, originJsonData)
                            if (!result.validate) {
                                return result
                            }
                        } else if (Object.prototype.toString.call(jsonScheme[attrName]) === "[object Array]") {
                            if (Object.prototype.toString.call(jsonData[attrName]) !== "[object Array]") {
                                var result = {
                                    validate: false,
                                    jsonScheme: JSON.stringify(orginJsonScheme),
                                    jsonData: JSON.stringify(originJsonData),
                                    error: "type error: " + jsonSchemePath + "/" + attrName
                                };
                                return result
                            } else {
                                for (var i = 0; i < jsonData[attrName].length; i++) {
                                    var result = check(jsonScheme[attrName][0], jsonData[attrName][i], jsonSchemePath + "/" + attrName + "/[" + i + "]", orginJsonScheme, originJsonData)
                                    if (!result.validate) {
                                        return result
                                    }
                                };
                            }
                        }
                    }
            }
        }
    }

    return {
        validate: true
    }
}

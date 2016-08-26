var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

module.exports = {

    // input: an xml document, scenario JSON data containing the matcher rules
    // output: the matching rule which matches the xml document
    findMatch: function (xml, scenarioData) {

        var doc = new dom().parseFromString(xml);
        var retVal = null;

        // Array.some short circuits if callback returns true
        scenarioData.matcherRules.some(function (matcherRule) {

            // Array.every short circuits if callback returns false
            var matched = matcherRule.rules.every(function (rule) {

                var xpathStr = rule.xpath + "[contains(text(),'" + rule.contains + "')]/text()";
                var result = xpath.select(xpathStr, doc);

                if (result == '') {
                    return false;
                } else {
                    rule.result = result;
                    return true;
                }
            });

            if (matched == true) {
                retVal = matcherRule;
                return true;
            } else {
                return false;
            }
        });

        return retVal;
    }
};

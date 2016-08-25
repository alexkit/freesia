var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

module.exports = {

    // input: an xml document, matching rules JSON
    // output: the matching StepID for a scenario
    findMatch: function(xml, matchingRules) {

        var doc = new dom().parseFromString(xml);
        var stepID = '';

        //Array.some short circuits if callback returns true
        matchingRules.some(function(scenario){

            //Array.every short circuits if callback returns false
            var matched = scenario.rules.every(function(rule){
                return xpath.select(rule.xpath, doc);
            });

            if (matched == true) {
                stepID = scenario.stepID;
                return true;
            } else {
                return false;
            }
        });

        return stepID;
    }
};

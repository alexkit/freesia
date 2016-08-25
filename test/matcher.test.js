var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('chai').assert;
var fs = require('fs');
var matcher = require('../app/matcher');
// set up JSON test files
var test1json = require('./resources/matcher/matcher_test1.json');
var test2json = require('./resources/matcher/matcher_test2.json');
var test3json = require('./resources/matcher/matcher_test3.json');
var test4json = require('./resources/matcher/matcher_test4.json');
var test5json = require('./resources/matcher/matcher_test5.json');
var test6json = require('./resources/matcher/matcher_test6.json');
var test7json = require('./resources/matcher/matcher_test7.json');


describe('matcher module', function() {

    it ('should return correct Step when a match is found: one rule configured', function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test1json);
        assert.equal(result, 'Scenario_1_Step_1');
    });

    it ('should return empty string when no match is found: one rule configured', function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test2json);
        assert.equal(result, '');
    });

    it ("should return empty string when one rule doesn't return a match: two rule configured", function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test3json);
        assert.equal(result, '');
    });

    it ("should return empty string when one rule doesn't return a match: three rule configured", function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test4json);
        assert.equal(result, '');
    });

    it ("should return correct Step when a match is found: two scenarios, three rule configured", function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test5json);
        assert.equal(result, 'Scenario_2_Step_1');
    });

    it ("should break after the first match is found: three scenarios, three rule configured", function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test6json);
        assert.equal(result, 'Scenario_2_Step_1');
    });

    it ("should support Manage Address queryAddress by Location ID sample", function() {
        var xml = fs.readFileSync('./test/resources/matcher/00_queryAddressRequest_01.xml', 'utf8');
        var result = matcher.findMatch(xml, test7json);
        assert.equal(result, 'Scenario_4_Step_1');
    });

});

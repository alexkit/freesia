var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('chai').assert;
var fs = require('fs');
var matcher = require('../app/matcher');
// set up JSON test files
var test1json = require('./resources/matcher/scenario_data_test1.json');
var test2json = require('./resources/matcher/scenario_data_test2.json');
var test3json = require('./resources/matcher/scenario_data_test3.json');
var test4json = require('./resources/matcher/scenario_data_test4.json');
var test5json = require('./resources/matcher/scenario_data_test5.json');
var test6json = require('./resources/matcher/scenario_data_test6.json');
var test7json = require('./resources/matcher/scenario_data_test7.json');
var test8json = require('./resources/matcher/scenario_data_test8.json');


describe('matcher module', function() {

    it('should return correct matcher rule when a match is found: one rule configured', function () {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test1json);
        assert.equal(result.stepID, 'Manage_Address_queryAddress_request_001');
        assert.equal(result.rules[0].xpath, '//title');
        assert.equal(result.rules[0].contains, 'H');
        assert.equal(result.rules[0].result, 'Harry Potter');
    });

    it('should return null when no match is found: one rule configured', function () {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test2json);
        assert.equal(result, null);
    });

    it("should return null when one rule doesn't return a match: two rule configured", function () {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test3json);
        assert.equal(result, null);
    });


    it ("should return empty string when one rule doesn't return a match: three rule configured", function() {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test4json);
        assert.equal(result, null);
    });

    it("should return correct matcher rule when a match is found: two matcher rules, three rule configured", function () {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test5json);
        assert.equal(result.stepID, 'Manage_Address_queryAddress_request_002');
        assert.equal(result.rules[0].xpath, '//title');
        assert.equal(result.rules[0].contains, 'H');
        assert.equal(result.rules[0].result, 'Harry Potter');
        assert.equal(result.rules[1].xpath, '//title');
        assert.equal(result.rules[1].contains, 'Harry');
        assert.equal(result.rules[1].result, 'Harry Potter');
        assert.equal(result.rules[2].xpath, '//title');
        assert.equal(result.rules[2].contains, 'Potter');
        assert.equal(result.rules[2].result, 'Harry Potter');
    });

    it("should return after the first match is found: two matcher rules, three rule configured", function () {
        var xml = "<book><title>Harry Potter</title></book>";
        var result = matcher.findMatch(xml, test6json);
        assert.equal(result.stepID, 'Manage_Address_queryAddress_request_001');
    });

    it ("should support Manage Address queryAddress by Location ID sample", function() {
        var xml = fs.readFileSync('./test/resources/matcher/00_queryAddressRequest_01.xml', 'utf8');
        var result = matcher.findMatch(xml, test7json);
        assert.equal(result.stepID, 'Manage_Address_queryAddress_request_001');
        assert.equal(result.rules[0].xpath, '//AddressSearch/BusinessInteractionLocation/Place/ID');
        assert.equal(result.rules[0].contains, 'LOC1234');
        assert.equal(result.rules[0].result, 'LOC123450989043');
    });


    it("should support Manage Address queryAddress by Physical Address sample", function () {
        var xml = fs.readFileSync('./test/resources/matcher/00_queryAddressRequest_02.xml', 'utf8');
        var result = matcher.findMatch(xml, test8json);
        assert.equal(result.stepID, 'Manage_Address_queryAddress_request_001');
        assert.equal(result.rules[0].xpath, '//AddressSearch/BusinessInteractionLocation/Place/PhysicalAddress/roadNumber1');
        assert.equal(result.rules[0].contains, '12');
        assert.equal(result.rules[0].result, '12');
        assert.equal(result.rules[1].xpath, '//AddressSearch/BusinessInteractionLocation/Place/PhysicalAddress/roadName');
        assert.equal(result.rules[1].contains, 'Swan');
        assert.equal(result.rules[1].result, 'Swanston');
    });

});

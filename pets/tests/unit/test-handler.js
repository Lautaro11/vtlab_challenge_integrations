'use strict';
const chai = require('chai');
const expect = chai.expect;
const event = require('../../../data.json');
const handler = require('../../handlers.js');
var context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await handler.handler(event, context)
        console.log(result);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.totalPrice).to.be.an('number');
    });
});

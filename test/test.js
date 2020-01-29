const chai = require('chai');
const expect = chai.expect;
const getCustomerData = require('../handler/getCustomerData');

describe('getCustomer', () => {

    it('resolves', (done) => {
        const event = {
            body: '',
            headers: {},
            httpMethod: 'GET',
            isBase64Encoded: false,
            path: '',
            pathParameters: { "customerId": "Fernando0001" },
            queryStringParameters: {},
            stageVariables: {},
            requestContext: {},
            resource: ''
        };

        const responseBody = {
            "address": "1000 Example Street, Example, VA 22033",
            "email": "jan@gmail.com",
            "firstName": "Janet",
            "lastName": "Fernando",
            "customerId": "Fernando0001"
        }

        getCustomerData.getCustomer(event, done)
            .then(res => {
                expect(res.statusCode).to.equal(200);
                expect(JSON.parse(res.body)).to.deep.equal(responseBody);
            })
            .catch(err => console.log(err))
            .finally(done);
    });
});
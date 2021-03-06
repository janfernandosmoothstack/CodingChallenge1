'use strict'
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const customerTable = process.env.TABLE_NAME;

function response(statusCode, message) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
}

exports.getCustomer = (event, callback) => {
    const customerId = event.pathParameters.customerId;

    const params = {
        Key: {
            customerId: customerId
        },
        TableName: customerTable
    }

    return documentClient.get(params).promise()
        .then(res => {
            if(res.Item) {
                return response(200, res.Item); 
            } else {
                return response(404, {error: 'Record not found'});
            }
        })
        .catch(err => {
            //callback(null, response(err.statusCode, err))
            return response(err.statusCode, err)
        });
}
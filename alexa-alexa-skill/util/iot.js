'use strict';

// ====================================================================================================== 
// iot - interface to AWS iot shadow
// 
// John R. Kosinski
//
// 09 Mar 2018
// ------------------------------------------------------------------------------------------------------
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const AWS = require('aws-sdk');

const common = require('alexa-common');
const exception = common.exceptions('IOT');
const logger = common.logger('IOT');
const enums = common.enums;

const config = require('../config');

//iot data 
const iotdata = connectIoT(); 


function connectIoT(){
    var options = {
        endpoint: config.aws.iot.endpoint, 
        region:"us-east-1" 
    }

    //credentials from config
    if (config.aws.iot.accessKey && config.aws.iot.accessKey.length) 
        options.accessKeyId = config.aws.iot.accessKey; 
    if (config.aws.iot.secretKey && config.aws.iot.secretKey.length) 
        options.secretAccessKey = config.aws.iot.secretKey; 

    return new AWS.IotData(options);  
}

// ------------------------------------------------------------------------------------------------------
// updates the IoT thing shadow with the given data. 
// Please omit the "state" object - just send what goes inside of it. 
// 
// args
//  payload: the IoT data payload without the "state" property (just the value of the state property, not 
//      the property itself) 
// 
// returns: IoT response (Promise)
const updateThingShadow = async((deviceId, payload) => {
    return new Promise((resolve, reject) => {
        var params = {
            payload:  JSON.stringify({state: payload}),
            thingName: deviceId
        }; 

        iotdata.updateThingShadow(params, (err, data) => {
            try {
                if (err)
                    reject(err);
                else{
                    resolve(data); 
                }
            } catch(e) {
                reject(e);
            }
        });
    });
});

module.exports = {
    updateThingShadow
};
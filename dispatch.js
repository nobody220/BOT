'use strict';

const checkInfo = require('./checkInfo');

module.exports = function(intentRequest, callback){
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;
    if(intentName === "PersonalInfo"){
      console.log(intentName + " was executed");
      return checkInfo(intentRequest, callback);
    }

    throw new Error(`Intent ${intentName} is not supported`);
}

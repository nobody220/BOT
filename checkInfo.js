'use strict';

const lexResponses = require('./lexResponses');

// FUNCTIONS

function buildValidationResult(isValid, violatedSlot, message){

  console.log("VALID BA: " + isValid);

  if(message === null){
    return{
      isValid,
      violatedSlot,
    };
  }

  return{
    isValid,
    violatedSlot,
    message: { contentType:'PlainText', content:message },
  };
}

function validateDeveloper(developerName){
  console.log("DEV NAME: " + developerName.toLowerCase());
  if(developerName){
    if(developerName.toLowerCase() === "ehddver" || developerName.toLowerCase() === "faith" || developerName.toLowerCase() === 'nobody'){
      console.log("YES");
      return buildValidationResult(true, null, null);
    }
  }

  return buildValidationResult(false, 'developer', `Developer ${developerName} not found in the list.`);
}

/*
*   E X P O R T S
*/

module.exports = function(intentRequest, callback){
  var dev = intentRequest.currentIntent.slots.developer;

  console.log("Developer: " + dev);

  const src = intentRequest.invocationSource;

  if(src === "DialogCodeHook"){
    const slots = intentRequest.currentIntent.slots;
    const validationResult = validateDeveloper(dev);

      if(!validationResult.isValid){
        slots[`${validationResult.violatedSlot}`] = null;
          callback(lexResponses.elicitSlots(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, 'ERROR'));
          return;
      }

    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}

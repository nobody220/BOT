'use strict';

module.exports.delegate = function(sessionAttributes, slots){
  return{
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots,
    },
  };
}

module.exports.elicitSlots = function(sessionAttributes, intentName, slots, slotToElicit, message){
  return{
    sessionAttributes,
    dialogAction: {
      type: 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
    },
  };
}

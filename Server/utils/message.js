var moment = require('moment'); 
var generateMeassage = (from , text) => {
    return {
        from,
        text,
        createAt: moment().valueOf()
    };
};
var generateLocationMessage = (from, latitude, longitude) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt: moment().valueOf()
    };
  };
module.exports = {generateMeassage, generateLocationMessage}
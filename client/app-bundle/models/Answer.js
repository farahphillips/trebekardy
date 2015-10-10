var m = require('mithril');

var Answer = module.exports = {

  answer: null,

  // Fetch random question from db
  fetch: function () {
    m.request({ method: 'GET', url: '/answer' })
      .then(function (resData) {
        Answer.answer = resData;
      });
  },

  // Returns db to the 
  all: function () {
    return Answer.answer;
  }

};
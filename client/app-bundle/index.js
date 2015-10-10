var m = require('mithril');
var Answer = require('./models/Answer.js');

window.App = {};


App.controller = function () {
  var ctrl = this;
  //Grabs random question form db
  Answer.fetch();

  ctrl.newQ = function () {
    Answer.fetch()
    var tabArray = document.getElementsByTagName('li');
    var paneArray = document.getElementsByClassName('mui-tab-pane');
    for (var i = 0; i < tabArray.length; i++) {
      if( tabArray[i].id !== 'question'){
        tabArray[i].className = '';
      }else {
        tabArray[i].className = 'mui-active';
      }
      if( paneArray[i].id !== 'q'){
        paneArray[i].className = 'mui-tab-pane';
      }else {
        paneArray[i].className = 'mui-tab-pane mui-active';
      }
    };
  };
};

App.view = function (ctrl) {
  //Makes fetch() response accessible to the view
  var random = Answer.all();
  return m('.mui-container', [
    m('h1', 'Jeopardy'),
    m('ul.mui-tabs.mui-tabs-justified', [
      m('li#question.mui-active', [
        m('a[data-mui-toggle=tab][data-mui-controls=q]', 'q')
      ]),
      m('li', [
        m('a[data-mui-toggle=tab][data-mui-controls=a]', 'a')
      ]),
      m('li', [
        m('a[data-mui-toggle=tab][data-mui-controls=info]', 'info')
      ])
    ]),
    m('.mui-tab-content', [
      m('.mui-tab-pane.mui-active#q', [
        m('h2', 'Category'),
        m('p', random.category),
        m('h2', 'Question'),
        m('p', random.question),
        m('h2', 'Value'),
        m('p', random.value),
      ]),
      m('.mui-tab-pane#a', [
        m('h2', 'Answer'),
        m('p', random.answer)
      ]),
      m('.mui-tab-pane#info', [
        m('h2', 'Round'),
        m('p', random.round),
        m('h2', 'Aired on'),
        m('p', random.air_date),
        m('h2', 'Epipsode Number'),
        m('p', random.show_number)
      ])
    ]),
    m('button.mui-btn mui-btn-primary mui-btn-lg', {
      onclick: ctrl.newQ
    }, 'Another Question')
  ]);
};

m.mount(document.getElementById('app'), App);
var React   = require('react');
var Parse   = require('parse');
var TodoApp = require('./components/TodoApp.react');

Parse.initialize('ApplicationID', 'JavaScriptKey');

React.render(
    React.createElement(TodoApp, {}),
    document.getElementById('contenedor')
)

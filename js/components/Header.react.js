/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @jsx React.DOM
 */

var React           = require('react');
var TodoActions     = require('../actions/TodoActions');
var TodoTextInput   = require('./TodoTextInput.react');

var Header = React.createClass({

    render: function() {
        return (
            <header id="header" style={{'margin-bottom':'20px'}} >

                <h1 className="lead text-center">Yee - ALT - TodoMVC</h1>

                <TodoTextInput
                    id="new-todo"
                    className="form-control"
                    placeholder="¿Alguna tarea pendiente?"
                    onSave={this._onSave}
                />

            </header>
        );
    },

    _onSave: function(text) {
        if (text.trim()){
            TodoActions.create(text);
        }
    }

});

module.exports = Header;

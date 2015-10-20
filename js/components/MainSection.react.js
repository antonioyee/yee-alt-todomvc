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
var ReactPropTypes  = React.PropTypes;
var TodoActions     = require('../actions/TodoActions');
var TodoItem        = require('./TodoItem.react');

var MainSection = React.createClass({

    render: function() {
        var allTodos = this.props.allTodos;
        var todos = [];

        for (var key in allTodos) {
            todos.push(<TodoItem key={key} todo={allTodos[key]} />);
        }

        return (
            <div iclassName="container">
                <ul className="list-group">{todos}</ul>
            </div>
        );
    },

});

module.exports = MainSection;

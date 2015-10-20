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

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer      = require('./Footer.react');
var Header      = require('./Header.react');
var MainSection = require('./MainSection.react');
var React       = require('react');
var TodoStore   = require('../stores/TodoStore');
var Parse       = require('parse').Parse;
var ParseReact  = require('parse-react');

var TodoApp = React.createClass({
    mixins: [ParseReact.Mixin],

    observe: function() {
        return {
            items: (new Parse.Query('Items')).descending('createdAt')
        };
    },

    statics: {
        storeListeners: {
            _onChange: TodoStore
        }
    },

    render: function() {
        return (
            <div className="container">

                <button className="btn btn-xs btn-success pull-right" onClick={this._refresh.bind(this)} style={{'margin-top':'24px'}}  >
                <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                </button>

                <Header />

                <MainSection allTodos={this.data.items} />

                <Footer allTodos={this.data.items}  />

            </div>
        );
    },

    _onChange: function() {
        this.setState(getTodoState());
    },

    _refresh() {
        this.refreshQueries('items');
    }

});

module.exports = TodoApp;

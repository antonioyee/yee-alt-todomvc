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

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },

    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    render: function() /*object*/ {
        return (
        <input
            className={this.props.className}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onBlur={this._save}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.value}
            autoFocus={true}
            />
        );
    },

    _save: function () {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },

    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    _onKeyDown: function (event) {
        if ( event.keyCode === ENTER_KEY_CODE ) {
            this._save();
        }
    }

});

module.exports = TodoTextInput;

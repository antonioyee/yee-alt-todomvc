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

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var TodoItem = React.createClass({

    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return ({
            editing: false,
            textEdit: ''
        });
    },

   render: function () {
         var todo = this.props.todo;

         if (this.state.editing) {
             return (
                 <li className="list-group-item">
                     <div className="row">
                         <div className="col-sm-6">
                             <div className="form-group editing">
                                 <input className="form-control"
                                     ref="edit_input"
                                     onChange={this._onChange}
                                     onKeyDown={this._onKeyDown}
                                     value={this.state.textEdit} />
                             </div>
                         </div>
                         <div className="col-sm-6">
                             <button className="btn btn-xs btn-warning pull-right" onClick={this._stopEditing} >
                                 <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                             </button>
                         </div>
                     </div>
                 </li>
             );
         }

         return (
             <li key={todo.id} className="list-group-item" >
                 <label>{todo.text}</label>
                 <button className="btn btn-xs btn-danger pull-right" onClick={this._onDestroyClick} >
                     <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                 </button>
                 <span className="pull-right">&nbsp;</span>
                 <button className="btn btn-xs btn-info pull-right" onClick={this._onEditClick} >
                     <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                 </button>
             </li>
         );
     },

    _onDestroyClick: function () {
        TodoActions.destroy(this.props.todo.id);
    },

    _onChange: function(e) {
        this.setState({
            textEdit: e.target.value
        });
    },

    _onKeyDown: function(e) {
        if (e.keyCode === 13) {
            this._stopEditing();
        }
    },

    _stopEditing: function() {
        if (this.state.textEdit) {
            TodoActions.updateText({
                id: this.props.todo.id,
                text: this.state.textEdit
            });
            this.setState({
                editing: false
            });
        }else{
            this._onDestroyClick();
        }
    },

    _onEditClick: function () {
        this.setState({
            textEdit: this.props.todo.text,
            editing: true
        }, function() {
            var node = this.refs.edit_input.getDOMNode();
            node.focus();
            var len = this.state.textEdit.length;
            node.setSelectionRange(len, len);
        });
    }

});

module.exports = TodoItem;

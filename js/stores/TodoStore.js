var alt = require('../alt')
var merge = require('object-assign')
var ParseReact = require('parse-react');
var TodoActions = require('../actions/TodoActions')

var todoStore = alt.createStore(class TodoStore {

    constructor() {
        this.bindActions(TodoActions)
        this.todos = {}
    }

    update(id, updates) {
        if(this.todos[id] && updates){
            ParseReact.Mutation.Set(id, {
                text: updates
            }).dispatch();
        }
    }

    updateAll(updates) {
        for (var id in this.todos) {
            this.update(id, updates)
        }
    }

    onCreate(text) {
        text = text.trim()
        if (text === '') {
            return false
        }

        ParseReact.Mutation.Create('Items', {
            text: text
        }).dispatch();
    }

    onUpdateText(x) {
        var { id, text } = x

        text = text ? text.trim() : ''
        if (text === '') {
          return false
        }

        ParseReact.Mutation.Set(id, {
            text: text
        }).dispatch();
    }

    onToggleComplete(id) {
        var complete = !this.todos[id].complete
        this.update(id, { complete })
    }

    onToggleCompleteAll() {
        var complete = !todoStore.areAllComplete()
        this.updateAll({ complete })
    }

    onDestroy(id) {
        ParseReact.Mutation.Destroy(id).dispatch();
    }

    onDestroyCompleted() {
        for (var id in this.todos) {
            if (this.todos[id].complete) {
                this.onDestroy(id)
            }
        }
    }

    static areAllComplete() {
        var { todos } = this.getState()
        for (var id in todos) {
            if (!todos[id].complete) {
                return false
            }
        }
        return true
    }
    
})

module.exports = todoStore

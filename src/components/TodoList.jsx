var React = require('react');
var TodoItem = require('./TodoItem');
var TodoStore = require('../stores/TodoStore');


var TodoList = React.createClass({

  // Init
  getInitialState: function() {
    return TodoStore.getState();
  },

  // Lifecycle
  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(nextProps, nextState) {
    TodoStore.removeChangeListener(this._onChange);
  },

  // Actions
  _onChange: function(e) {
    this.setState(TodoStore.getState());
  },

  // Rendering
  render: function() {
    var items = Object.keys(this.state.items).map(function(key) {
      return (
        <TodoItem
          key={ key }
          id={ this.state.items[key].id }
          name={ this.state.items[key].name }
          done={ this.state.items[key].done } />
      );
    }.bind(this));

    return (
      <ul className="list-group todo-list">
        { items }
      </ul>
    );
  }

});

module.exports = TodoList;
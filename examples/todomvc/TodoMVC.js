import React, { PureComponent } from 'react';
import './todomvc.css';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

class TodoMVC extends PureComponent {
  state = {
    newTodo: '',
    todos: [],
  };

  render() {
    const main = null;
    const todos = this.state.todos;
    let footer;

    const shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case app.ACTIVE_TODOS:
          return !todo.completed;
        case app.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    });

    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />
      );
    }

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput
            value={this.state.newTodo}
            onChange={this.handleChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

export default TodoMVC;

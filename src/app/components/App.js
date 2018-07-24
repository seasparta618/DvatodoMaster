import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import AddTodo from "./AddTodo/AddTodo";
import TodoItem from "./TodoItem/TodoItem";
import TodoFilter from "./TodoFilter/TodoFilter";
import "./App.less";

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: "todo/getInitialTodosAsync" });
  }

  removeTodo = _id => {
    const { dispatch } = this.props;
    dispatch({ type: "todo/removeTodoAsync", payload: { _id } });
  };

  changeTodo = (_id, k, v) => {
    const { dispatch } = this.props;
    dispatch({ type: "todo/changeTodoAsync", payload: { _id, k, v } });
  };

  render() {
    const { dispatch, todos, msg } = this.props;
    const errorMSG = (
      <p className="errorMSG">the todo entered is already existed</p>
    );

    return (
      <div>
        <AddTodo />
        {msg != "" ? errorMSG : null}
        <hr />
        {todos.map((todo, index) => {
          return (
            <TodoItem
              changeTodo={this.changeTodo}
              removeTodo={this.removeTodo}
              key={index}
              todo={todo}
            />
          );
        })}
        <hr />
        <TodoFilter />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired
};

const mapStateToProps = ({ todo }) => ({
  todos: (function() {
    if (todo.showType == "ALL") {
      return todo.todos;
    } else if (todo.showType == "DONE") {
      return todo.todos.filter(todo => todo.done);
    } else if (todo.showType == "UNDONE") {
      return todo.todos.filter(todo => !todo.done);
    }
  })(),
  msg: todo.msg
});

export default connect(mapStateToProps)(App);

import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.todo.title,
      isEdited: false
    };
  }

  render() {
    const { todo, removeTodo, changeTodo } = this.props;
    const { title, isEdited } = this.state;
    return (
      <div>
        <input
          onChange={e => {
            changeTodo(todo._id, "done", e.target.checked);
          }}
          checked={todo.done}
          type="checkbox"
        />{" "}
        {isEdited ? (
          <input
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
            onBlur={() => {
              changeTodo(todo._id, "title", title);
              this.setState({ isEdited: false });
            }}
            value={title}
            type="text"
          />
        ) : (
          <span
            onDoubleClick={() => {
              this.setState({ isEdited: true });
            }}
          >
            {todo.title}
          </span>
        )}{" "}
        <button
          onClick={() => {
            removeTodo(todo._id);
          }}
        >
          remove
        </button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeTodo: PropTypes.func.isRequired
};

export default TodoItem;

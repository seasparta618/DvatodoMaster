import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    const { title } = this.state;
    const { dispatch } = this.props;

    return (
      <div>
        <label htmlFor="newTodo">new todo: </label>
        <input
          autoFocus
          type="text"
          id="newTodo"
          value={title}
          onChange={e => {
            this.setState({ title: e.target.value });
          }}
          onKeyDown={e => {
            if (e.keyCode == 13) {
              dispatch({ type: "todo/addTodoAsync", payload: { title } });
              this.setState({ title: "" });
            }
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: "todo/addTodoAsync", payload: { title } });
            this.setState({ title: "" });
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {};

export default connect()(AddTodo);

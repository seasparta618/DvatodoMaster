import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import classnames from "classnames";
import "./TodoFilter.less";

class TodoFilter extends Component {
  render() {
    const { dispatch, showType } = this.props;
    return (
      <div>
        <button
          className={classnames({ cur: showType == "ALL" })}
          onClick={() => {
            dispatch({
              type: "todo/changeShowType",
              payload: { showType: "ALL" }
            });
          }}
        >
          ALL
        </button>
        <button
          className={classnames({ cur: showType == "DONE" })}
          onClick={() => {
            dispatch({
              type: "todo/changeShowType",
              payload: { showType: "DONE" }
            });
          }}
        >
          DONE
        </button>
        <button
          className={classnames({ cur: showType == "UNDONE" })}
          onClick={() => {
            dispatch({
              type: "todo/changeShowType",
              payload: { showType: "UNDONE" }
            });
          }}
        >
          UNDONE
        </button>
      </div>
    );
  }
}

TodoFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showType: PropTypes.string.isRequired
};

const mapStateToProps = ({ todo }) => ({
  showType: todo.showType
});

export default connect(mapStateToProps)(TodoFilter);

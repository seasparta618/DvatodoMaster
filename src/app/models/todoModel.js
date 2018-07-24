import axios from "axios";
import { STATUS_CODES } from "http";

export default {
  namespace: "todo",
  state: {
    todos: [],
    showType: "ALL",
    msg: ""
  },
  reducers: {
    getErrorMSG: (state, action) => {
      return { ...state, msg: action.payload.msg };
    },

    getInitialTodos: (state, action) => {
      return { ...state, todos: action.payload.todos, msg: "" };
    },
    changeShowType: (state, action) => {
      return { ...state, showType: action.payload.showType, msg: "" };
    },
    addTodo: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
        msg: ""
      };
    },
    removeTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id != action.payload._id),
        msg: ""
      };
    },
    changeTodo: (state, action) => {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id != action.payload._id) {
            return todo;
          } else {
            return { ...todo, [action.payload.k]: action.payload.v };
          }
        }),
        msg: ""
      };
    }
  },
  effects: {
    *getInitialTodosAsync({ payload }, { put, call }) {
      const { data } = yield axios.get("/todos");
      yield put({ type: "getInitialTodos", payload: { todos: data.todos } });
    },
    *addTodoAsync(
      {
        payload: { title }
      },
      { put, call }
    ) {
      const { data } = yield axios.post("/todos", { title });
      if (data.code == 1) {
        return yield put({ type: "getErrorMSG", payload: { msg: data.msg } });
      }
      yield put({ type: "addTodo", payload: { todo: data.todo } });
    },
    *removeTodoAsync(
      {
        payload: { _id }
      },
      { put, call }
    ) {
      const { data } = yield axios.delete(`/todos/${_id}`);

      yield put({ type: "removeTodo", payload: { _id: data._id } });
    },
    *changeTodoAsync(
      {
        payload: { _id, k, v }
      },
      { put, call }
    ) {
      const { data } = yield axios.patch(`/todos/${_id}`, { k, v });

      yield put({
        type: "changeTodo",
        payload: { _id: data._id, k, v }
      });
    }
    // *changeShowTypeAsync(
    //   {
    //     payload: { showType }
    //   },
    //   { put, call }
    // ) {
    //   yield put({ type: "changeShowType", payload: { showType } });
    // }
  }
};

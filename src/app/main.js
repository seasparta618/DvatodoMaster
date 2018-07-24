import dva from "dva";
import router from "./router";
import { createLogger } from "redux-logger";
import todoModel from "./models/todoModel";

const app = dva({
  onAction: createLogger()
});

app.model(todoModel);

app.router(router);

app.start("#app-container");

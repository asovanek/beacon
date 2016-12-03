import Marionette from "backbone.marionette";
import AppController from "./app_controller";

export default Marionette.AppRouter.extend({
    controller: AppController,

    appRoutes: {
        "*main": "main"
    },
});

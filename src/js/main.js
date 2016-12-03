import $ from "jquery";
import App from "./app";
import Config from "./config"

$(document).ready(() => {
    window.app = new App(Config);
    app.start();
});

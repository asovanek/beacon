import $ from "jquery";
import App from "./app";
import Url from "url"

$(document).ready(() => {
    var request = Url.parse(window.location.href, true);
    window.app = new App(request);
    app.start();
});

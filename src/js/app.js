import $ from "jquery";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import AppRouter from "./controller/app_router";
import Seller from "./model/seller";

export default Marionette.Application.extend({
    region: "#app",
    routers: [],

    baseUrl: null,
    seller: {},

    initialize: function(options) {
        var headers = $.ajaxSetup().headers || {};
        headers['X-API-KEY'] = options.sellerApiKey;
        $.ajaxSetup({
            headers: headers,
            beforeSend: function (jqXHR, settings) {
                settings.url = options.baseUrl + settings.url;
                settings.crossDomain = true;
            }
        });

        this.baseUrl = options.baseUrl;

        this.seller = new Seller({id:options.sellerId});
        this.seller.fetch();
    },

    onStart() {
        this.setUpNunjucks();
        this.routers = [new AppRouter()];
        Backbone.history.start();
    },

    setUpNunjucks() {
        Marionette.Renderer.render = (template, data) => template.render(data);
    },

    getAbsoluteUrl(url) {
        var absoluteUrl = url;

        if (this.baseUrl) {
            absoluteUrl = this.baseUrl + absoluteUrl;
        }

        return absoluteUrl;
    }
});

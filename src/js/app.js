import $ from "jquery";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import AppRouter from "./controller/app_router";
import Seller from "./model/seller";
import CollectionPool from "./collection_pool";
import Events from "./collections/events";
import Experiences from "./collections/experiences";
import Availability from "./collections/availability";

export default Marionette.Application.extend({
    region: "#app",
    routers: [],

    baseUrl: null,
    seller: {},

    initialize: function(request) {
        var get = request.query;

        this.initializeEnvironment(get.env, {
            baseUrl: get.baseUrl,
            seller: get.seller,
            customStylesheet: get.style
        });
    },

    initializeEnvironment(env, options) {
        // Initialize baseUrl
        switch (env) {
            case 'sandbox':
                this.baseUrl = 'https://sandbox.xola.com';
                break;

            case 'dev':
                this.baseUrl = options.baseUrl;
                break;

            default:
                this.baseUrl = 'https://xola.com';
        }

        // Initialize ajax
        var app = this;
        $.ajaxSetup({
            beforeSend: function (jqXHR, settings) {
                settings.url = app.baseUrl + settings.url;
                settings.crossDomain = true;
            }
        });

        // Initialize seller
        this.seller = new Seller({id: options.seller});

        if (options.customStylesheet) {
            $('head').append('<link rel="stylesheet" type="text/css" href="' + options.customStylesheet + '">');
        }
    },

    onStart() {
        this.setUpNunjucks();
        this.setUpCollectionPool();
        this.routers = [new AppRouter()];
        Backbone.history.start();

        this.seller.fetch();
    },

    setUpCollectionPool: function() {
        CollectionPool.setCollection('events', new Events());
        CollectionPool.setCollection('availability', new Availability());
        CollectionPool.setCollection('experiences', new Experiences());
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

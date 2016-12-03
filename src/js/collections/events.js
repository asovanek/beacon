import Collection from "./collection";
import Event from "../model/event";

export default Collection.extend({
    model: Event,
    url: '/api/events'
});
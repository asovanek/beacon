import Marionette from "backbone.marionette";
import AppSummaryView from "./app_summary";

export default Marionette.CollectionView.extend({
  childView: AppSummaryView
});

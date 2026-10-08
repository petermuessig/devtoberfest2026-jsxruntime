import UIComponent from "sap/ui/core/UIComponent";

/** @namespace sap.codejam */
export default class Component extends UIComponent {
  static metadata = {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json"
  };
}

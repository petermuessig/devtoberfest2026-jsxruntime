import UIComponent from "sap/ui/core/UIComponent";

/** 
 * @alias sap.codejam.Component 
 */
export default class Component extends UIComponent {
  static metadata = {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json"
  };
}

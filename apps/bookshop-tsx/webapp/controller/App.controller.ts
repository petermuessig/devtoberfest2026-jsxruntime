import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import VBox from "sap/m/VBox";
import StepInput from "sap/m/StepInput";
import Table from "sap/m/Table";
import MessageToast from "sap/m/MessageToast";
import type Context from "sap/ui/model/Context";
import type Event from "sap/ui/base/Event";

/** 
 * @alias sap.codejam.controller.App 
 */
export default class App extends Controller {
  onInit(): void {
    this._setDetailsVisible(false);
  }

  onAfterRendering(): void {
    this._setDetailsVisible(false);
  }

  onSelect(event: Event): void {
    const context = (event.getSource() as unknown as { getBindingContext(): Context }).getBindingContext();
    const sPath = context.getPath();
    const bookDetails = this.byId("bookDetails") as VBox;
    bookDetails.bindElement(sPath);
    this._setDetailsVisible(true);
  }

  async onSubmitOrder(): Promise<void> {
    const oModel = this.getView()!.getModel() as ODataModel;
    const bookDetails = this.byId("bookDetails") as VBox;
    const stepInput = this.byId("stepInput") as StepInput;
    const oBinding = bookDetails.getElementBinding()!;
    const sPath = oBinding.getPath()!;
    const oContext = oBinding.getBoundContext() as Context;
    const bookID = parseInt(sPath.replace(/.*\((\d+)\)/, "$1"), 10);
    const quantity = stepInput.getValue();
    const title = (oContext.getObject() as { title: string }).title;

    const oOperation = oModel.bindContext("/submitOrder(...)");
    oOperation.setParameter("book", bookID);
    oOperation.setParameter("quantity", quantity);
    try {
      await oOperation.execute();
      MessageToast.show(`Order successful (${title}, ${quantity} pcs.)`);
      oModel.refresh();
    } catch (oError) {
      console.error("submitOrder failed", oError);
    }
  }

  onSearch(event: Event): void {
    const sQuery = (event.getParameter as (name: string) => string)("newValue");
    const oTable = this.byId("booksTable") as Table;
    const oBinding = oTable.getBinding("items") as ListBinding;
    if (sQuery) {
      oBinding.filter([new Filter("title", FilterOperator.Contains, sQuery)]);
    } else {
      oBinding.filter([]);
    }
  }

  private _setDetailsVisible(bVisible: boolean): void {
    const bookDetails = this.byId("bookDetails") as VBox;
    if (bookDetails) {
      bookDetails.setVisible(bVisible);
    }
  }
}

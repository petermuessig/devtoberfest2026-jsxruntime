import View from "sap/ui/core/mvc/View";
import type Control from "sap/ui/core/Control";
import App from "sap/m/App";
import Page from "sap/m/Page";
import Panel from "sap/m/Panel";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Column from "sap/m/Column";
import Text from "sap/m/Text";
import ObjectIdentifier from "sap/m/ObjectIdentifier";
import ObjectNumber from "sap/m/ObjectNumber";
import ObjectStatus from "sap/m/ObjectStatus";
import ColumnListItem from "sap/m/ColumnListItem";
import VBox from "sap/m/VBox";
import HBox from "sap/m/HBox";
import Button from "sap/m/Button";
import StepInput from "sap/m/StepInput";
import Title from "sap/m/Title";
import { For } from "ui5/community/jsx/runtime/jsx-runtime";
import formatter from "../model/formatter";

/** 
 * @alias sap.codejam.view.App 
 */
export default class AppView extends View {
  getAutoPrefixId(): boolean {
    return true;
  }

  getControllerModuleName(): string {
    return "sap/codejam/controller/App";
  }

  createContent(): Control {
    return (
      <App>
        <Page title="{i18n>Bookshop}" showNavButton={false}>

          <Panel headerText="Hello, Dev! 👋" expandable={false}>
            <SearchField
              placeholder="{i18n>SearchPlaceholder}"
              liveChange=".onSearch"
              width="100%"
            />

            <Table
              id="booksTable"
              items={{ path: "/Books" } as never}
              growing={true}
              growingThreshold={10}
              columns={[
                <Column><Text text="{i18n>ColBook}" /></Column>,
                <Column><Text text="{i18n>ColAuthor}" /></Column>,
                <Column><Text text="{i18n>ColGenre}" /></Column>,
                <Column hAlign="End"><Text text="{i18n>ColPrice}" /></Column>,
                <Column hAlign="End"><Text text="{i18n>ColStock}" /></Column>
              ]}
            >
              <For each={{ path: "/Books" } as never}>
                {() => (
                  <ColumnListItem press=".onSelect" type="Active">
                    <ObjectIdentifier title="{title}" />
                    <Text text="{author}" />
                    <Text text="{genre}" />
                    <ObjectNumber number="{price}" unit="{currency_code}" emphasized={true} />
                    <ObjectStatus
                      text="{stock}"
                      state={{ path: "stock", formatter: formatter.stockState } as never}
                    />
                  </ColumnListItem>
                )}
              </For>
            </Table>
          </Panel>

          {/* Detail pane — hidden until a row is selected */}
          <VBox id="bookDetails" visible={false} class="sapUiMediumMargin">
            <Title text="{title}" titleStyle="H2" class="sapUiSmallMarginBottom" />
            <Text text="{descr}" wrapping={true} class="sapUiSmallMarginBottom" />
            <HBox justifyContent="End" alignItems="Center">
              <Button
                text="{i18n>OrderBtn}"
                press=".onSubmitOrder"
                class="sapUiSmallMarginEnd"
              />
              <StepInput id="stepInput" min={1} max="{stock}" value={1} width="10rem" />
            </HBox>
          </VBox>

        </Page>
      </App>
    );
  }
}

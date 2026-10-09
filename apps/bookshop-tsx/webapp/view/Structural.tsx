/**
 * Structural.tsx — showcase of all <For> and <If> directive spellings.
 *
 * This file is NOT used by the app directly; it exists as a reference
 * for Step 9 of the demo script ("Structural directives recap").
 *
 * Import the For and If directives from the jsx-runtime entry point.
 */
import View from "sap/ui/core/mvc/View";
import type Control from "sap/ui/core/Control";
import Panel from "sap/m/Panel";
import VBox from "sap/m/VBox";
import Title from "sap/m/Title";
import Text from "sap/m/Text";
import StandardListItem from "sap/m/StandardListItem";
import List from "sap/m/List";
import Button from "sap/m/Button";
import { For, If } from "ui5/community/jsx/runtime/jsx-runtime";

/** 
 * @alias sap.codejam.view.Structural 
 */
export default class Structural extends View {
  getAutoPrefixId(): boolean { return true; }

  createContent(): Control {
    return (
      <VBox>
        {/* ── <For> spellings ──────────────────────────────────────── */}
        <Title text="<For> spellings" />

        {/* 1. Explicit: each= on <For>, children is the factory fn */}
        <Panel headerText="1. Explicit each= factory">
          <List>
            <For each={{ path: "/Books" } as never}>
              {() => (
                <StandardListItem
                  title="{title}"
                  description="by {author}"
                />
              )}
            </For>
          </List>
        </Panel>

        {/* 2. Implicit: items= on the parent control, child is the template */}
        <Panel headerText="2. Implicit items= on parent">
          <List items={{ path: "/Books" } as never}>
            <StandardListItem
              title="{title}"
              description="by {author}"
            />
          </List>
        </Panel>

        {/* 3. String binding on parent */}
        <Panel headerText="3. String items= on parent">
          <List items="{/Books}">
            <StandardListItem title="{title}" />
          </List>
        </Panel>

        {/* 4. Raw: items= with template prop on <For> itself */}
        <Panel headerText="4. Raw items+template on <For>">
          <For
            items={{ path: "/Books", template: <StandardListItem title="{title}" /> } as never}
          >
            {() => <></>}
          </For>
        </Panel>

        {/* ── <If> spellings ──────────────────────────────────────── */}
        <Title text="<If> spellings" />

        {/* 1. Literal true — inlined at construction time */}
        <Panel headerText="1. Literal true (always visible)">
          <If condition={true}>
            <Text text="This is always shown (inlined at construction)" />
          </If>
        </Panel>

        {/* 2. Literal false — dropped at construction time */}
        <Panel headerText="2. Literal false (never visible)">
          <If condition={false}>
            <Text text="This is never shown (dropped at construction)" />
          </If>
        </Panel>

        {/* 3. Bound — bindProperty("visible") on each child at runtime */}
        <Panel headerText="3. Bound condition (runtime visible binding)">
          <If condition={{ path: "/showDetails" } as never}>
            <Button text="Order" type="Emphasized" />
          </If>
        </Panel>
      </VBox>
    );
  }
}

import Inventory from "./grid/inventory.component"

/**
 * TODO
 * ----- SWITCH TO USING DRAWER over modal --- think dndbeyond type inventory management
 * ----- consider switching to Material UI over Joy UI (more components and actively being supported)
 * 1. allow item to be selected
 * 2. selected item is passed to 'addItem'
 * 3. submit button is disabled before any item is selected
 * 4. selecting an item shows more data about it
 * 5. items should have db ids, and those should be used as keys
 * 6. is there anything that should be extracted into a component?
 */

export default function Home() {
  return (
    <>
      <Inventory />
    </>
  )
}

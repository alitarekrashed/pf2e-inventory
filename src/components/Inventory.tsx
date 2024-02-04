import { Sheet, Table } from "@mui/joy";

export default function Inventory() {
  return (
    <>
      <Sheet>
        <Table variant="outlined">
          <caption>Inventory</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>
          </thead>
        </Table>
      </Sheet>
    </>
  );
}

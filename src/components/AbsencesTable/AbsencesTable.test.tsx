import { screen, render } from "@testing-library/react";
import { IAbsence, IConflict } from "types";
import AbsencesTable from ".";

const absences = [
  {
    id: 1,
    type: "ANNUAL_LEAVE",
    approved: true,
    days: 1,
    startDate: 1634609317.566,
    employeeFirstName: "FirstName",
    employeeLastName: "LastName",
    employeeId: "1",
  },
  {
    id: 2,
    type: "ANNUAL_LEAVE",
    approved: true,
    days: 1,
    startDate: 1634609317.566,
    employeeFirstName: "FirstName",
    employeeLastName: "LastName",
    employeeId: "2",
  },
] as IAbsence[];

const conflicts = [
  {
    absencesId: 2,
    conflicts: true,
  },
] as IConflict[];

describe("AbsencesTable component", () => {
  test("renders correct number of records", async () => {
    render(<AbsencesTable absences={absences} conflicts={[]} />);
    const numberOfRows = (await screen.findAllByTestId("absences-table__tr"))
      .length;
    expect(numberOfRows).toBe(2);
  });

  test("renders one row with conflict", async () => {
    const { container } = render(
      <AbsencesTable absences={absences} conflicts={conflicts} />
    );
    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.getElementsByClassName("absences-table__tr--conflict").length
    ).toBe(1);
  });
});

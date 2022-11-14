import { render } from "@testing-library/react";
import Orders from "../pages/orders";

describe("Orders", () => {
  test("renders correctly", async () => {
    const { getByText } = render(<Orders />);
    const textElement = getByText(/orders/i);
    expect(textElement).toBeInTheDocument();
  });
});

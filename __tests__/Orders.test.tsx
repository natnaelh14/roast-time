import Orders from '../pages/orders';
import { render } from '@testing-library/react';

describe('Orders', () => {
  test('renders correctly', async () => {
    const { getByText } = render(<Orders />);
    const textElement = getByText(/orders/i);
    expect(textElement).toBeInTheDocument();
  });
});

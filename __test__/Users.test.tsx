import { render, screen, waitFor } from '@testing-library/react';
import { Users } from 'components/Users/Users';
import { rest } from 'msw';
import { server } from 'mocks/server';

describe('Users', () => {
  test.skip('renders correctly', async () => {
    render(<Users />);
    await waitFor(async () => {
      const textElement = screen.getByText('Users');
      expect(textElement).toBeInTheDocument();
    });
  });

  test.skip('renders a list of users', async () => {
    render(<Users />);
    await waitFor(async () => {
      const users = await screen.findAllByRole('listitem');
      expect(users).toHaveLength(3);
    });
  });

  test.skip('renders error', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<Users />);
    await waitFor(async () => {
      const error = await screen.findByText('Error fetching users');
      expect(error).toBeInTheDocument();
    });
  });
});

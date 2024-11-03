import { render, screen } from '@testing-library/react';
import NotesApp from './NotesApp';

test('renders learn react link', () => {
  render(<NotesApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

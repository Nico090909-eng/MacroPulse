import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders MacroPulse title', () => {
    render(<App />);
    expect(screen.getByText(/MacroPulse/i)).toBeInTheDocument();
  });

  test('renders dashboard heading', () => {
    render(<App />);
    expect(screen.getByText(/Dashboard Macroéconomique/i)).toBeInTheDocument();
  });
});

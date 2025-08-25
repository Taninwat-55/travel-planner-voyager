import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('renders an input field and a button', () => {
    render(<SearchForm onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/sök efter en stad/i);
    const buttonElement = screen.getByRole('button', { name: /sök/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});

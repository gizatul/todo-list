import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
	test('renders the header correctly', () => {
		render(<App />);
		const headerElement = screen.getByText(/todos/i);
		expect(headerElement).toBeInTheDocument();
	});

	test('clears completed todo items', () => {
		render(<App />);
		const clearCompletedButton = screen.getByText(/clear completed/i);

		fireEvent.click(clearCompletedButton);

		const todoItems = screen.queryAllByRole('listitem');
		expect(todoItems.length).toBe(2);
	});
});

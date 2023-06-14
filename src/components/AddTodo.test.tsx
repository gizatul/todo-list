import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('AddTodo', () => {
	test('renders the input field correctly', () => {
		render(<AddTodo onAddTodo={() => {}} />);
		const inputElement = screen.getByLabelText(/what needs to be done?/i);
		expect(inputElement).toBeInTheDocument();
	});

	test('calls onAddTodo when Enter key is pressed', () => {
		const mockOnAddTodo = jest.fn();
		render(<AddTodo onAddTodo={mockOnAddTodo} />);
		const inputElement = screen.getByLabelText(/what needs to be done?/i);

		fireEvent.change(inputElement, { target: { value: 'New todo item' } });
		fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

		expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
		expect(mockOnAddTodo).toHaveBeenCalledWith(expect.objectContaining({ title: 'New todo item' }));
	});

	test('does not call onAddTodo when Enter key is pressed and input value is empty', () => {
		const mockOnAddTodo = jest.fn();
		render(<AddTodo onAddTodo={mockOnAddTodo} />);
		const inputElement = screen.getByLabelText(/what needs to be done?/i);

		fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

		expect(mockOnAddTodo).not.toHaveBeenCalled();
	});
});

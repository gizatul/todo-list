import { Card, CardContent, TextField, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState, KeyboardEvent } from 'react';

type Todo = {
	title: string;
	isCompleted: boolean;
	id: number;
};

type AddTodoProps = {
	onAddTodo: (newTodo: Todo) => void;
};

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
	console.log('render Addtodo');
	const [newTodo, setNewTodo] = useState('');

	const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const inputValue = (e.target as HTMLInputElement).value;
			if (inputValue) {
				onAddTodo({
					title: inputValue,
					isCompleted: false,
					id: Date.now(),
				});
				setNewTodo('');
			}
		}
	};

	return (
		<Card>
			<CardContent>
				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<RadioButtonUncheckedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField id="input-with-sx" label="What needs to be done" variant="standard" onKeyPress={addTodo} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddTodo;

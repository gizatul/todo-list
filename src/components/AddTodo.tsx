import { Card, CardContent, TextField, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
				(e.target as HTMLInputElement).value = '';
			}
		}
	};

	return (
		<Card>
			<CardContent sx={{ padding: 0 }}>
				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<ExpandMoreIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField id="input-with-sx" fullWidth label="What needs to be done?" variant="standard" onKeyPress={addTodo} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default AddTodo;

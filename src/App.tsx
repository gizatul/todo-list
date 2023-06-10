import AddTodo from './components/AddTodo';
import { Card, CardActions, CardContent } from '@mui/material';
import { useState } from 'react';

type Todo = {
	title: string;
	isCompleted: boolean;
	id: number;
};

const initialState = [
	{ title: 'Тестовое задание', isCompleted: false, id: 1 },
	{ title: 'Прекрасный код', isCompleted: true, id: 2 },
	{ title: 'Покрытие тестами', isCompleted: false, id: 3 },
];

function App() {
	console.log('render App');
	const [todos, setTodos] = useState(initialState);

	const todosItems = todos?.map((todo) => {
		return <span>{todo.title}</span>;
	});

	const handleAddTodo = (newTodo: Todo) => {
		setTodos([...todos, newTodo]);
	};

	return (
		<>
			<AddTodo onAddTodo={handleAddTodo} />
			<Card>
				<CardContent>{todosItems}</CardContent>
				<CardActions>Buttons</CardActions>
			</Card>
		</>
	);
}

export default App;

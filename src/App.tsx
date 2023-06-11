import AddTodo from './components/AddTodo';
import { Container, Card, CardActions, CardContent, List, ListItem, ListItemButton, ListItemText, Radio, Grid, Button, Box, Checkbox } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
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

const filterState = {
	all: 'All',
	active: 'Active',
	completed: 'Completed',
};

function App() {
	console.log('render App');
	const [todos, setTodos] = useState(initialState);
	const [activeFilter, setActiveFilter] = useState(filterState.all);

	const handleCheck = (todo: Todo) => {
		const updatedTodos = todos.map((item) => (item.id === todo.id ? { ...item, isCompleted: !item.isCompleted } : item));
		setTodos(updatedTodos);
	};

	const deleteTodo = (todo: Todo) => {
		const updatedTodos = todos.filter((item) => item.id !== todo.id);
		console.log(updatedTodos);
		setTodos(updatedTodos);
	};

	const filterTodos = () => {
		switch (activeFilter) {
			case filterState.active:
				return todos.filter((todo) => !todo.isCompleted);
			case filterState.completed:
				return todos.filter((todo) => todo.isCompleted);
			default:
				return todos;
		}
	};

	const todosItems = filterTodos()?.map((todo: Todo) => {
		return (
			<ListItem
				key={todo.id}
				disablePadding
				sx={{
					'& .clear-icon': {
						visibility: 'hidden',
					},
					'&:hover .clear-icon': {
						visibility: 'visible',
					},
				}}
			>
				<ListItemButton>
					<Checkbox
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<CheckCircleOutlineIcon />}
						checked={todo.isCompleted}
						onChange={() => handleCheck(todo)}
						inputProps={{ 'aria-label': todo.title }}
					/>
					<ListItemText>
						<Grid container justifyContent="space-between" alignItems="center">
							<span>{todo.title}</span>
							<ClearIcon className="clear-icon" onClick={() => deleteTodo(todo)} />
						</Grid>
					</ListItemText>
				</ListItemButton>
			</ListItem>
		);
	});

	const handleAddTodo = (newTodo: Todo) => {
		setTodos([...todos, newTodo]);
	};

	const activeTodos = todos?.filter((todo) => !todo.isCompleted) ?? 0;
	const clearCompleted = () => {
		const completedTodos = todos?.filter((todo) => !todo.isCompleted);
		setTodos(completedTodos);
	};

	const filterOptions = [
		{ label: 'All', value: filterState.all },
		{ label: 'Active', value: filterState.active },
		{ label: 'Completed', value: filterState.completed },
	];

	const handleFilterClick = (filterValue: string) => {
		setActiveFilter(filterValue);
	};

	const filterButtons = filterOptions.map((option) => (
		<Button key={option.value} variant={activeFilter === option.value ? 'outlined' : 'text'} onClick={() => handleFilterClick(option.value)}>
			{option.label}
		</Button>
	));

	return (
		<Container maxWidth="sm">
			<h1 style={{ textAlign: 'center', color: '#EADCDA' }}>todos</h1>
			<AddTodo onAddTodo={handleAddTodo} />
			<Card>
				<CardContent sx={{ padding: 0 }}>
					<List>{todosItems}</List>
				</CardContent>
				<CardActions>
					<Grid container alignItems="center" justifyContent="space-between">
						<Box> {activeTodos.length} items left</Box>
						<Box sx={{ display: 'flex' }}>{filterButtons}</Box>
						<Box>
							<Button onClick={() => clearCompleted()}>Clear completed</Button>
						</Box>
					</Grid>
				</CardActions>
			</Card>
		</Container>
	);
}

export default App;

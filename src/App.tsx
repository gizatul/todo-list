import AddTodo from './components/AddTodo';
import { Container, Card, CardActions, CardContent, List, ListItem, ListItemButton, ListItemText, Radio, Grid, Button, Box, Checkbox } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState, useMemo } from 'react';

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

const filterOptions = [
	{ label: 'All', value: filterState.all },
	{ label: 'Active', value: filterState.active },
	{ label: 'Completed', value: filterState.completed },
];

const App = (): JSX.Element => {
	const [todos, setTodos] = useState<Todo[]>(initialState);
	const [activeFilter, setActiveFilter] = useState<string>(filterState.all);

	const handleCheck = (todo: Todo) => {
		setTodos((prevState) => prevState.map((item) => (item.id === todo.id ? { ...item, isCompleted: !item.isCompleted } : item)));
	};

	const deleteTodo = (todo: Todo): void => {
		setTodos((prevState) => prevState.filter((item) => item.id !== todo.id));
	};

	const filterTodos = useMemo((): Todo[] => {
		switch (activeFilter) {
			case filterState.active:
				return todos.filter((todo) => !todo.isCompleted);
			case filterState.completed:
				return todos.filter((todo) => todo.isCompleted);
			default:
				return todos;
		}
	}, [todos, activeFilter]);

	const todosItems = filterTodos?.map((todo: Todo) => {
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
							<Box sx={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>{todo.title}</Box>
							<ClearIcon className="clear-icon" onClick={() => deleteTodo(todo)} />
						</Grid>
					</ListItemText>
				</ListItemButton>
			</ListItem>
		);
	});

	const handleAddTodo = (newTodo: Todo): void => {
		setTodos([...todos, newTodo]);
	};

	const activeTodos = todos?.filter((todo) => !todo.isCompleted);
	const clearCompleted = (): void => {
		setTodos((prevState) => prevState?.filter((todo) => !todo.isCompleted));
	};

	const handleFilterClick = (filterValue: string): void => {
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
};

export default App;

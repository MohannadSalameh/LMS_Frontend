import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
    Checkbox,
    Paper,
    Container,
    InputAdornment,
    Chip
} from '@mui/material';
import {
    Add,
    Delete,
    Task,
    CheckCircle,
    RadioButtonUnchecked
} from '@mui/icons-material';

function SimpleTodo() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTask = () => {
        if (task.trim() === '') return;
        setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
        setTask('');
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTask = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask();
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper
                elevation={8}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(107, 127, 191, 0.15)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        mb: 4
                    }}
                >
                    <Task sx={{ fontSize: '2rem', color: '#6B7FBF' }} />
                    Your To-Do List for Today
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Add a new task..."
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: '2px solid rgba(107, 127, 191, 0.3)',
                                    boxShadow: '0 4px 12px rgba(107, 127, 191, 0.1)',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: '2px solid #6B7FBF',
                                    boxShadow: '0 4px 16px rgba(107, 127, 191, 0.2)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputBase-input': {
                                fontWeight: 500,
                                '&::placeholder': {
                                    color: 'text.secondary',
                                    opacity: 0.7,
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Task sx={{ color: 'primary.main' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        onClick={addTask}
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            px: 3,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                            boxShadow: '0 4px 15px rgba(107, 127, 191, 0.3)',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5A6EAE 0%, #7989C0 100%)',
                                boxShadow: '0 6px 20px rgba(107, 127, 191, 0.4)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add
                    </Button>
                </Box>

                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {todos.length === 0 && (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 6,
                                color: 'text.secondary',
                            }}
                        >
                            <Task sx={{ fontSize: '3rem', opacity: 0.3, mb: 2 }} />
                            <Typography variant="h6" sx={{ opacity: 0.7 }}>
                                No tasks yet. Start by adding one!
                            </Typography>
                        </Box>
                    )}

                    {todos.map(todo => (
                        <ListItem
                            key={todo.id}
                            sx={{
                                mb: 1,
                                borderRadius: 2,
                                backgroundColor: todo.completed
                                    ? 'rgba(76, 175, 80, 0.1)'
                                    : 'rgba(255, 255, 255, 0.7)',
                                border: '1px solid',
                                borderColor: todo.completed
                                    ? 'rgba(76, 175, 80, 0.3)'
                                    : 'rgba(107, 127, 191, 0.2)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: todo.completed
                                        ? 'rgba(76, 175, 80, 0.15)'
                                        : 'rgba(255, 255, 255, 0.9)',
                                    borderColor: todo.completed
                                        ? 'rgba(76, 175, 80, 0.5)'
                                        : 'rgba(107, 127, 191, 0.4)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(107, 127, 191, 0.1)',
                                },
                            }}
                        >
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<CheckCircle />}
                                sx={{
                                    color: 'primary.main',
                                    '&.Mui-checked': {
                                        color: 'success.main',
                                    },
                                }}
                            />
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                            opacity: todo.completed ? 0.7 : 1,
                                            fontWeight: 500,
                                            color: todo.completed ? 'text.secondary' : 'text.primary',
                                        }}
                                    >
                                        {todo.text}
                                    </Typography>
                                }
                            />
                            {todo.completed && (
                                <Chip
                                    label="Completed"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                    sx={{ mr: 1 }}
                                />
                            )}
                            <IconButton
                                onClick={() => removeTask(todo.id)}
                                color="error"
                                size="small"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                    },
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>

                {todos.length > 0 && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default SimpleTodo;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    InputAdornment,
    Popper,
    ClickAwayListener,
    CircularProgress,
    Chip,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

function CourseSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const anchorRef = useRef(null);

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length < 2) {
            setResults([]);
            setShowDropdown(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/course/search?keyword=${val}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log raw text response before parsing
            const text = await res.text();

            // Now try to parse JSON
            const data = JSON.parse(text);

            setResults(data?.data || []);
            setShowDropdown(true);

        } catch (err) {
            console.error("Search failed:", err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };


    const goToCourse = (id) => {
        setQuery('');
        setResults([]);
        setShowDropdown(false);
        navigate(`/courses/${id}`);
    };

    const handleClickAway = () => {
        setShowDropdown(false);
    };

    const handleFocus = () => {
        if (query && results.length > 0) {
            setShowDropdown(true);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
                <TextField
                    ref={anchorRef}
                    fullWidth
                    variant="outlined"
                    placeholder="Search courses, topics, or instructors..."
                    value={query}
                    onChange={handleSearch}
                    onFocus={handleFocus}
                    size="medium"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {isLoading ? (
                                    <CircularProgress size={20} sx={{ color: 'primary.main' }} />
                                ) : query && (
                                    <Clear 
                                        sx={{ 
                                            color: 'text.secondary', 
                                            cursor: 'pointer',
                                            fontSize: '1.1rem',
                                            '&:hover': { color: 'primary.main' }
                                        }} 
                                        onClick={() => {
                                            setQuery('');
                                            setResults([]);
                                            setShowDropdown(false);
                                        }}
                                    />
                                )}
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px rgba(107, 127, 191, 0.15)',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                boxShadow: '0 6px 25px rgba(107, 127, 191, 0.2)',
                                border: '2px solid rgba(107, 127, 191, 0.4)',
                                transform: 'translateY(-1px)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                boxShadow: '0 8px 30px rgba(107, 127, 191, 0.25)',
                                border: '2px solid #6B7FBF',
                                transform: 'translateY(-2px)',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'text.primary',
                            padding: '14px 0',
                            '&::placeholder': {
                                color: 'text.secondary',
                                opacity: 0.7,
                                fontWeight: 400,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            fontWeight: 500,
                            '&.Mui-focused': {
                                color: '#6B7FBF',
                            },
                        },
                    }}
                />
                
                <Popper
                    open={showDropdown}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    style={{ width: anchorRef.current?.offsetWidth, zIndex: 1300 }}
                >
                    <Paper
                        elevation={8}
                        sx={{
                            mt: 1,
                            maxHeight: 300,
                            overflow: 'auto',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <List disablePadding>
                            {results.length === 0 ? (
                                <ListItem>
                                    <ListItemText
                                        primary="No results found"
                                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                                    />
                                </ListItem>
                            ) : (
                                results.map((course) => (
                                    <ListItem key={course.id} disablePadding>
                                        <ListItemButton
                                            onClick={() => goToCourse(course.id)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'primary.light',
                                                    color: 'primary.main',
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={course.title}
                                                secondary={course.description}
                                                secondaryTypographyProps={{
                                                    noWrap: true,
                                                    sx: { fontSize: '0.875rem' },
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            )}
                        </List>
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
}

export default CourseSearch;

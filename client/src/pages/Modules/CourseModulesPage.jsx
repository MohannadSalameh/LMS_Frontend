import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  PlayArrow,
  Assignment,
  Quiz,
  VideoLibrary,
  Article,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Close,
  Home,
  School,
  CheckCircle,
  Lock,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';

// Mock data for demonstration
const mockModules = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    lessons: [
      { id: 1, title: 'What is React?', type: 'video', duration: '10 min', completed: true },
      { id: 2, title: 'Setting up React', type: 'video', duration: '15 min', completed: true },
      { id: 3, title: 'Your First Component', type: 'video', duration: '20 min', completed: false },
      { id: 4, title: 'Quiz: React Basics', type: 'quiz', duration: '5 min', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Components and Props',
    description: 'Understanding React components',
    lessons: [
      { id: 5, title: 'Functional Components', type: 'video', duration: '18 min', completed: false },
      { id: 6, title: 'Props in Detail', type: 'video', duration: '22 min', completed: false },
      { id: 7, title: 'Component Exercise', type: 'assignment', duration: '30 min', completed: false },
    ]
  },
  {
    id: 3,
    title: 'State and Lifecycle',
    description: 'Managing component state',
    lessons: [
      { id: 8, title: 'useState Hook', type: 'video', duration: '25 min', completed: false },
      { id: 9, title: 'useEffect Hook', type: 'video', duration: '30 min', completed: false },
      { id: 10, title: 'State Management Quiz', type: 'quiz', duration: '10 min', completed: false },
    ]
  },
];

const mockCourse = {
  id: 1,
  title: 'Complete React Development Course',
  instructor: 'John Doe',
  progress: 35,
};

function CourseModulesPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [modules, setModules] = useState(mockModules);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [expandedModules, setExpandedModules] = useState({ 1: true });
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleModuleToggle = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleLessonSelect = (lesson) => {
        setSelectedLesson(lesson);
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    const getLessonIcon = (type) => {
        switch (type) {
            case 'video': return <VideoLibrary />;
            case 'quiz': return <Quiz />;
            case 'assignment': return <Assignment />;
            default: return <Article />;
        }
    };

    const getTotalLessons = () => {
        return modules.reduce((total, module) => total + module.lessons.length, 0);
    };

    const getCompletedLessons = () => {
        return modules.reduce((total, module) => 
            total + module.lessons.filter(lesson => lesson.completed).length, 0
        );
    };

    const drawerWidth = 320;

    const ModulesSidebar = () => (
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom>
                    Course Modules
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Progress: {getCompletedLessons()}/{getTotalLessons()} lessons
                    </Typography>
                </Box>
                <LinearProgress 
                    variant="determinate" 
                    value={(getCompletedLessons() / getTotalLessons()) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                />
            </Box>
            
            <List sx={{ p: 0 }}>
                {modules.map((module) => (
                    <React.Fragment key={module.id}>
                        <ListItemButton 
                            onClick={() => handleModuleToggle(module.id)}
                            sx={{ py: 2 }}
                        >
                            <ListItemIcon>
                                <School />
                            </ListItemIcon>
                            <ListItemText 
                                primary={module.title}
                                secondary={module.description}
                            />
                            {expandedModules[module.id] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        
                        <Collapse in={expandedModules[module.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {module.lessons.map((lesson) => (
                                    <ListItemButton
                                        key={lesson.id}
                                        sx={{ pl: 4 }}
                                        onClick={() => handleLessonSelect(lesson)}
                                        selected={selectedLesson?.id === lesson.id}
                                    >
                                        <ListItemIcon>
                                            {lesson.completed ? (
                                                <CheckCircle color="success" />
                                            ) : lesson.type === 'video' && lesson.id > 3 ? (
                                                <Lock color="disabled" />
                                            ) : (
                                                getLessonIcon(lesson.type)
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={lesson.title}
                                            secondary={lesson.duration}
                                            sx={{
                                                opacity: lesson.completed ? 0.7 : 1,
                                                textDecoration: lesson.completed ? 'line-through' : 'none'
                                            }}
                                        />
                                        {lesson.completed && (
                                            <Chip 
                                                label="Completed" 
                                                size="small" 
                                                color="success" 
                                                variant="outlined"
                                            />
                                        )}
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Layout>
            <Box sx={{ display: 'flex', minHeight: '100vh', mt: -3, mx: -3 }}>
                {/* Mobile Drawer */}
                {isMobile && (
                    <>
                        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    edge="start"
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" noWrap>
                                    {mockCourse.title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="temporary"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            ModalProps={{ keepMounted: true }}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                        >
                            <Toolbar>
                                <IconButton onClick={() => setDrawerOpen(false)}>
                                    <Close />
                                </IconButton>
                            </Toolbar>
                            <ModulesSidebar />
                        </Drawer>
                    </>
                )}

                {/* Desktop Sidebar */}
                {!isMobile && (
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                position: 'relative',
                            },
                        }}
                    >
                        <ModulesSidebar />
                    </Drawer>
                )}

                {/* Main Content */}
                <Box 
                    component="main" 
                    sx={{ 
                        flexGrow: 1, 
                        p: 3,
                        mt: isMobile ? 8 : 0,
                        minHeight: '100vh',
                        backgroundColor: 'grey.50'
                    }}
                >
                    <Container maxWidth="lg">
                        {/* Breadcrumbs */}
                        <Breadcrumbs sx={{ mb: 3 }}>
                            <Link 
                                color="inherit" 
                                href="#" 
                                onClick={() => navigate('/')}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Home
                            </Link>
                            <Link 
                                color="inherit" 
                                href="#" 
                                onClick={() => navigate('/course')}
                            >
                                Courses
                            </Link>
                            <Typography color="text.primary">
                                {mockCourse.title}
                            </Typography>
                        </Breadcrumbs>

                        {/* Course Header */}
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                {mockCourse.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                Instructor: {mockCourse.instructor}
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" gutterBottom>
                                    Course Progress: {mockCourse.progress}%
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={mockCourse.progress}
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                            </Box>
                        </Paper>

                        {/* Content Area */}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        )}
                        
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}
                        
                        {!loading && !error && !selectedLesson && (
                            <Paper sx={{ p: 4, textAlign: 'center' }}>
                                <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Welcome to the Course
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Please select a lesson from the sidebar to get started.
                                </Typography>
                            </Paper>
                        )}
                        
                        {selectedLesson && (
                            <Paper sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    {getLessonIcon(selectedLesson.type)}
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="h5" gutterBottom fontWeight="bold">
                                            {selectedLesson.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Chip 
                                                label={selectedLesson.type} 
                                                size="small" 
                                                color="primary" 
                                                variant="outlined"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Duration: {selectedLesson.duration}
                                            </Typography>
                                            {selectedLesson.completed && (
                                                <Chip 
                                                    label="Completed" 
                                                    size="small" 
                                                    color="success"
                                                    icon={<CheckCircle />}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ mb: 3 }} />
                                
                                {selectedLesson.type === 'video' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Box 
                                            sx={{ 
                                                width: '100%', 
                                                height: 400, 
                                                backgroundColor: 'grey.900',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 2,
                                                mb: 2
                                            }}
                                        >
                                            <PlayArrow sx={{ fontSize: 64, color: 'white' }} />
                                        </Box>
                                        <Typography variant="body1">
                                            Video content for: {selectedLesson.title}
                                        </Typography>
                                    </Box>
                                )}
                                
                                {selectedLesson.type === 'quiz' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Alert severity="info" sx={{ mb: 2 }}>
                                            This is a quiz lesson. Complete all questions to proceed.
                                        </Alert>
                                        <Typography variant="body1">
                                            Quiz content for: {selectedLesson.title}
                                        </Typography>
                                    </Box>
                                )}
                                
                                {selectedLesson.type === 'assignment' && (
                                    <Box sx={{ mb: 3 }}>
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            This is an assignment. Submit your work to complete this lesson.
                                        </Alert>
                                        <Typography variant="body1">
                                            Assignment content for: {selectedLesson.title}
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        )}
                    </Container>
                </Box>
            </Box>
        </Layout>
    );
}

export default CourseModulesPage;

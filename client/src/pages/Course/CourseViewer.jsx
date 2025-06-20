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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  NavigateNext,
  NavigateBefore,
  ChevronLeft,
  ChevronRight,
  ArrowBack,
  ArrowForward,
  PlayCircleOutline,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import QuizComponent from '../../components/ui/Quiz/QuizComponent';
import AssignmentComponent from '../../components/ui/Assignment/AssignmentComponent';

// Mock data - replace with API calls
const mockCourseData = {
  id: 1,
  title: 'Complete React Development Course',
  instructor: 'John Doe',
  description: 'Master React from basics to advanced concepts',
  modules: [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React',
      lessons: [
        { 
          id: 1, 
          title: 'What is React?', 
          type: 'video', 
          duration: '10 min', 
          completed: true,
          videoUrl: 'https://example.com/video1.mp4',
          content: 'React is a JavaScript library for building user interfaces...'
        },
        { 
          id: 2, 
          title: 'Setting up React', 
          type: 'video', 
          duration: '15 min', 
          completed: true,
          videoUrl: 'https://example.com/video2.mp4',
          content: 'In this lesson, we will learn how to set up a React development environment...'
        },
        { 
          id: 3, 
          title: 'Your First Component', 
          type: 'video', 
          duration: '20 min', 
          completed: false,
          videoUrl: 'https://example.com/video3.mp4',
          content: 'Components are the building blocks of React applications...'
        },
        { 
          id: 4, 
          title: 'React Basics Quiz', 
          type: 'quiz', 
          duration: '5 min', 
          completed: false,
          quizData: {
            id: 1,
            title: 'React Basics Quiz',
            description: 'Test your understanding of React fundamentals',
            timeLimit: 10,
            questions: [
              {
                id: 1,
                type: 'multiple-choice',
                question: 'What is React?',
                options: [
                  { id: 'a', text: 'A JavaScript library for building user interfaces' },
                  { id: 'b', text: 'A database management system' },
                  { id: 'c', text: 'A web server' },
                  { id: 'd', text: 'A CSS framework' }
                ],
                correctAnswer: 'a',
                explanation: 'React is indeed a JavaScript library specifically designed for building user interfaces.'
              },
              {
                id: 2,
                type: 'multiple-select',
                question: 'Which of the following are React concepts?',
                options: [
                  { id: 'a', text: 'Components' },
                  { id: 'b', text: 'Props' },
                  { id: 'c', text: 'State' },
                  { id: 'd', text: 'Tables' }
                ],
                correctAnswers: ['a', 'b', 'c'],
                explanation: 'Components, Props, and State are core React concepts. Tables are HTML elements, not React-specific.'
              }
            ]
          }
        },
      ]
    },
    {
      id: 2,
      title: 'Components and Props',
      description: 'Understanding React components',
      lessons: [
        { 
          id: 5, 
          title: 'Functional Components', 
          type: 'video', 
          duration: '18 min', 
          completed: false,
          videoUrl: 'https://example.com/video5.mp4',
          content: 'Functional components are the modern way to write React components...'
        },
        { 
          id: 6, 
          title: 'Props in Detail', 
          type: 'video', 
          duration: '22 min', 
          completed: false,
          videoUrl: 'https://example.com/video6.mp4',
          content: 'Props allow you to pass data from parent to child components...'
        },
        { 
          id: 7, 
          title: 'Component Exercise', 
          type: 'assignment', 
          duration: '30 min', 
          completed: false,
          assignmentData: {
            id: 1,
            title: 'Build Your First Component',
            description: 'Create a reusable React component that displays user information',
            instructions: 'Create a UserCard component that accepts props for name, email, and avatar. The component should display this information in a card format with proper styling.',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            maxScore: 100,
            allowedFileTypes: ['.js', '.jsx', '.zip'],
            resources: [
              {
                name: 'Component Template',
                description: 'Starter template for the assignment',
                url: '/resources/component-template.zip'
              }
            ]
          }
        },
      ]
    },
  ]
};

function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [courseData, setCourseData] = useState(mockCourseData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({ 1: true });
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [completionDialog, setCompletionDialog] = useState(false);

  useEffect(() => {
    // Auto-select first incomplete lesson
    if (courseData && !selectedLesson) {
      const firstIncompleteLesson = findFirstIncompleteLesson();
      if (firstIncompleteLesson) {
        setSelectedLesson(firstIncompleteLesson);
      } else {
        // If all lessons are complete, select the first lesson
        const firstLesson = courseData.modules[0]?.lessons[0];
        if (firstLesson) {
          setSelectedLesson(firstLesson);
        }
      }
    }
  }, [courseData]);

  const findFirstIncompleteLesson = () => {
    for (const module of courseData.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          return lesson;
        }
      }
    }
    return null;
  };

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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLessonComplete = async (lessonId) => {
    try {
      // Update lesson completion status
      const response = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Update local state
        setCourseData(prev => ({
          ...prev,
          modules: prev.modules.map(module => ({
            ...module,
            lessons: module.lessons.map(lesson => 
              lesson.id === lessonId ? { ...lesson, completed: true } : lesson
            )
          }))
        }));

        // Move to next lesson
        const nextLesson = getNextLesson(lessonId);
        if (nextLesson) {
          setSelectedLesson(nextLesson);
        } else {
          setCompletionDialog(true);
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const getNextLesson = (currentLessonId) => {
    let foundCurrent = false;
    for (const module of courseData.modules) {
      for (const lesson of module.lessons) {
        if (foundCurrent) {
          return lesson;
        }
        if (lesson.id === currentLessonId) {
          foundCurrent = true;
        }
      }
    }
    return null;
  };

  const getPreviousLesson = (currentLessonId) => {
    let previousLesson = null;
    for (const module of courseData.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLessonId) {
          return previousLesson;
        }
        previousLesson = lesson;
      }
    }
    return null;
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
    return courseData.modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  const getCompletedLessons = () => {
    return courseData.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.completed).length, 0
    );
  };

  const renderLessonContent = () => {
    if (!selectedLesson) {
      return (
        <Paper 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center',
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: { xs: 1, sm: 2 },
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)'
          }}
        >
          <Box sx={{ mb: 2 }}>
            <School 
              sx={{ 
                fontSize: { xs: 48, sm: 64 }, 
                color: 'primary.main',
                opacity: 0.7
              }} 
            />
          </Box>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Select a lesson to start learning
          </Typography>
          <Typography 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            Choose a lesson from the sidebar to start your learning journey
          </Typography>
        </Paper>
      );
    }

    switch (selectedLesson.type) {
      case 'video':
        return (
          <Box>
            <Card sx={{ 
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: { xs: 1, sm: 2 }
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  {selectedLesson.title}
                </Typography>
                
                {/* Video Player */}
                <Box sx={{ 
                  mb: { xs: 2, sm: 3 }, 
                  bgcolor: 'black', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <video
                    width="100%"
                    height={isMobile ? "200" : "400"}
                    controls
                    poster="/default-video-poster.jpg"
                    style={{ display: 'block' }}
                  >
                    <source src={selectedLesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
                
                {/* Lesson Content */}
                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: { xs: 1.5, sm: 1.6 },
                    color: 'text.secondary',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  {selectedLesson.content}
                </Typography>
                
                {!selectedLesson.completed && (
                  <Button
                    variant="contained"
                    startIcon={<CheckCircle />}
                    size={isMobile ? 'medium' : 'large'}
                    sx={{
                      minWidth: { xs: '100%', sm: 160 },
                      height: { xs: 44, sm: 48 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 500,
                      borderRadius: 2
                    }}
                    onClick={() => handleLessonComplete(selectedLesson.id)}
                  >
                    Mark as Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          </Box>
        );

      case 'quiz':
        return (
          <Box>
            <Card sx={{ 
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: { xs: 1, sm: 2 },
              background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(156, 39, 176, 0.02) 100%)'
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: { xs: 2, sm: 3 }
                }}>
                  <Quiz sx={{ 
                    fontSize: { xs: 32, sm: 40 }, 
                    color: 'secondary.main' 
                  }} />
                  <Typography 
                    variant={isMobile ? 'h6' : 'h5'} 
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    {selectedLesson.title}
                  </Typography>
                </Box>
                <QuizComponent
                  quizData={selectedLesson.quizData}
                  onQuizComplete={(result) => {
                    if (result.passed) {
                      handleLessonComplete(selectedLesson.id);
                    }
                  }}
                  courseId={courseId}
                  moduleId={selectedLesson.moduleId}
                />
              </CardContent>
            </Card>
          </Box>
        );

      case 'assignment':
        return (
          <Box>
            <Card sx={{ 
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: { xs: 1, sm: 2 },
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(255, 152, 0, 0.02) 100%)'
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  mb: { xs: 2, sm: 3 }
                }}>
                  <Assignment sx={{ 
                    fontSize: { xs: 32, sm: 40 }, 
                    color: 'warning.main' 
                  }} />
                  <Typography 
                    variant={isMobile ? 'h6' : 'h5'} 
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    {selectedLesson.title}
                  </Typography>
                </Box>
                <AssignmentComponent
                  assignmentData={selectedLesson.assignmentData}
                  onAssignmentSubmit={(result) => {
                    handleLessonComplete(selectedLesson.id);
                  }}
                  courseId={courseId}
                  moduleId={selectedLesson.moduleId}
                />
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return (
          <Card sx={{ 
            mb: { xs: 2, sm: 3 },
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: { xs: 1, sm: 2 }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'} 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: { xs: 2, sm: 3 }
                }}
              >
                {selectedLesson.title}
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  lineHeight: { xs: 1.5, sm: 1.6 },
                  color: 'text.secondary',
                  mb: { xs: 3, sm: 4 }
                }}
              >
                {selectedLesson.content || 'Content not available'}
              </Typography>
              <Button 
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                sx={{ 
                  minWidth: { xs: '100%', sm: 160 },
                  height: { xs: 44, sm: 48 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 500,
                  borderRadius: 2
                }}
                onClick={() => handleLessonComplete(selectedLesson.id)}
                disabled={selectedLesson.completed}
                startIcon={selectedLesson.completed ? <CheckCircle /> : null}
              >
                {selectedLesson.completed ? 'Completed' : 'Mark as Complete'}
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  const drawerWidth = isMobile ? 280 : sidebarCollapsed ? 80 : 320;

  const ModulesSidebar = () => (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {!sidebarCollapsed && (
            <>
              <Typography 
                variant={isMobile ? 'subtitle1' : 'h6'} 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 600
                }}
              >
                Course Content
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Progress: {getCompletedLessons()}/{getTotalLessons()} lessons
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(getCompletedLessons() / getTotalLessons()) * 100}
                sx={{ 
                  height: { xs: 4, sm: 6 }, 
                  borderRadius: 3,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3
                  }
                }}
              />
            </>
          )}
        </Box>
        {!isMobile && (
          <IconButton 
            onClick={handleSidebarToggle}
            size="small"
            sx={{ ml: 1 }}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>
      
      <List sx={{ 
        p: 0, 
        flex: 1, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
        },
      }}>
        {courseData.modules.map((module) => (
          <React.Fragment key={module.id}>
            <ListItemButton 
              onClick={() => handleModuleToggle(module.id)}
              sx={{ 
                py: { xs: 1.5, sm: 2 },
                px: { xs: 1, sm: 2 },
                minHeight: { xs: 48, sm: 56 },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                <School sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </ListItemIcon>
              {!sidebarCollapsed && (
                <>
                  <ListItemText 
                    primary={module.title}
                    secondary={!isMobile ? module.description : null}
                    primaryTypographyProps={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  />
                  {expandedModules[module.id] ? 
                    <ExpandLess sx={{ fontSize: { xs: 20, sm: 24 } }} /> : 
                    <ExpandMore sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  }
                </>
              )}
            </ListItemButton>
            
            {!sidebarCollapsed && (
              <Collapse in={expandedModules[module.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {module.lessons.map((lesson) => (
                    <ListItemButton
                      key={lesson.id}
                      sx={{ 
                        pl: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        minHeight: { xs: 44, sm: 48 },
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                          },
                        },
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleLessonSelect(lesson)}
                      selected={selectedLesson?.id === lesson.id}
                    >
                      <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                        {lesson.completed ? (
                          <CheckCircle 
                            color="success" 
                            sx={{ fontSize: { xs: 18, sm: 20 } }}
                          />
                        ) : (
                          <Box sx={{ fontSize: { xs: 18, sm: 20 } }}>
                            {getLessonIcon(lesson.type)}
                          </Box>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={lesson.duration}
                        primaryTypographyProps={{
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          fontWeight: selectedLesson?.id === lesson.id ? 500 : 400,
                          sx: {
                            opacity: lesson.completed ? 0.8 : 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }
                        }}
                        secondaryTypographyProps={{
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                      />
                      {lesson.completed && (
                        <Chip 
                          label="✓" 
                          size="small" 
                          color="success" 
                          variant="outlined"
                          sx={{ 
                            height: { xs: 20, sm: 24 },
                            fontSize: { xs: '0.6rem', sm: '0.75rem' }
                          }}
                        />
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error">{error}</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', minHeight: '100vh', mt: -3, mx: -3 }}>
        {/* Mobile Header */}
        {isMobile && (
          <AppBar 
            position="fixed" 
            sx={{ 
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: 'primary.main',
              boxShadow: 2
            }}
          >
            <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2,
                  p: { xs: 1, sm: 1.5 }
                }}
              >
                <MenuIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
              <Typography 
                variant={isSmallMobile ? 'subtitle1' : 'h6'} 
                noWrap
                sx={{ 
                  flexGrow: 1,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 500
                }}
              >
                {courseData.title}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1
              }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    opacity: 0.8
                  }}
                >
                  {getCompletedLessons()}/{getTotalLessons()}
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={(getCompletedLessons() / getTotalLessons()) * 100}
                  size={24}
                  thickness={4}
                  sx={{ color: 'white' }}
                />
              </Box>
            </Toolbar>
          </AppBar>
        )}

        {/* Sidebar */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ 
              keepMounted: true,
              sx: {
                '& .MuiBackdrop-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRadius: '0 16px 16px 0',
                boxShadow: 3
              },
            }}
          >
            <ModulesSidebar />
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              transition: 'width 0.3s ease',
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                position: 'relative',
                borderRight: '1px solid',
                borderColor: 'divider',
                transition: 'width 0.3s ease',
                overflow: 'hidden'
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
            p: { xs: 2, sm: 3 },
            mt: isMobile ? 8 : 0,
            minHeight: '100vh',
            backgroundColor: 'background.default'
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              '& .MuiBreadcrumbs-separator': {
                mx: { xs: 0.5, sm: 1 }
              }
            }}
          >
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/dashboard')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/my-courses')}
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              My Courses
            </Link>
            <Typography 
              color="text.primary"
              sx={{ 
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 500
              }}
            >
              {courseData.title}
            </Typography>
          </Breadcrumbs>

          {/* Course Header */}
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 2, sm: 3 },
              boxShadow: { xs: 1, sm: 2 },
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)'
            }}
          >
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                fontWeight: 600,
                color: 'primary.main'
              }}
            >
              {courseData.title}
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              gutterBottom
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 500,
                mb: { xs: 1, sm: 2 }
              }}
            >
              Instructor: {courseData.instructor}
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: { xs: 1.5, sm: 1.6 },
                color: 'text.secondary'
              }}
            >
              {courseData.description}
            </Typography>
          </Paper>

          {/* Lesson Content */}
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            {renderLessonContent()}
          </Box>

          {/* Navigation */}
          {selectedLesson && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: { xs: 3, sm: 4 },
                gap: { xs: 2, sm: 3 },
                flexDirection: { xs: 'column', sm: 'row' },
                position: 'sticky',
                bottom: { xs: 16, sm: 24 },
                backgroundColor: 'background.paper',
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Button
                variant="outlined"
                startIcon={<NavigateBefore sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                onClick={() => {
                  const prevLesson = getPreviousLesson(selectedLesson.id);
                  if (prevLesson) setSelectedLesson(prevLesson);
                }}
                disabled={!getPreviousLesson(selectedLesson.id)}
                sx={{
                  minWidth: { xs: '100%', sm: 120 },
                  height: { xs: 44, sm: 48 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:disabled': {
                    opacity: 0.5
                  }
                }}
              >
                Previous
              </Button>
              
              {/* Progress indicator for mobile */}
              {isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  order: { xs: -1, sm: 0 }
                }}>
                  <Typography variant="caption" color="text.secondary">
                    Lesson {courseData.modules.findIndex(m => 
                      m.lessons.some(l => l.id === selectedLesson?.id)
                    ) + 1} of {courseData.modules.length}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(getCompletedLessons() / getTotalLessons()) * 100}
                    sx={{ 
                      width: 60, 
                      height: 4, 
                      borderRadius: 2 
                    }}
                  />
                </Box>
              )}
              
              <Button
                variant="contained"
                endIcon={<NavigateNext sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                onClick={() => {
                  const nextLesson = getNextLesson(selectedLesson.id);
                  if (nextLesson) setSelectedLesson(nextLesson);
                }}
                disabled={!getNextLesson(selectedLesson.id)}
                sx={{
                  minWidth: { xs: '100%', sm: 120 },
                  height: { xs: 44, sm: 48 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 500,
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 3
                  },
                  '&:disabled': {
                    opacity: 0.5
                  }
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Course Completion Dialog */}
      <Dialog open={completionDialog} onClose={() => setCompletionDialog(false)}>
        <DialogTitle>🎉 Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You have completed all lessons in this course! Great job on your learning journey.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompletionDialog(false)}>Continue</Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/my-courses')}
          >
            View My Courses
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default CourseViewer;
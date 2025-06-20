import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Skeleton,
} from '@mui/material';
import {
  School,
  TrendingUp,
  Assignment,
  Notifications,
  PlayArrow,
  BookmarkBorder,
  EmojiEvents,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { mockCourses, mockUsers, mockNotifications, mockQuotes, mockTodos } from '../../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentUser = user || mockUsers.student;
  
  const enrolledCourses = mockCourses.filter(course => course.isEnrolled);
  const recentNotifications = mockNotifications.slice(0, 3);
  const todayQuote = mockQuotes[0];
  const userTodos = mockTodos;
  
  const totalProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length;

  // Mock data for the enhanced dashboard
  const statsCards = [
    {
      icon: <School />,
      value: enrolledCourses.length,
      label: 'Enrolled Courses',
      color: 'primary',
      progress: null
    },
    {
      icon: <TrendingUp />,
      value: Math.round(totalProgress) + '%',
      label: 'Average Progress',
      color: 'success',
      progress: totalProgress
    },
    {
      icon: <EmojiEvents />,
      value: completedCourses,
      label: 'Completed Courses',
      color: 'warning',
      progress: null
    },
    {
      icon: <Assignment />,
      value: currentUser.points || 1250,
      label: 'Learning Points',
      color: 'info',
      progress: null
    }
  ];

  const continueCoursesData = enrolledCourses.slice(0, 4).map(course => ({
    id: course.id,
    title: course.title,
    instructor: course.instructor,
    progress: course.progress,
    thumbnail: course.thumbnail
  }));

  const recentActivity = [
    {
      title: 'Completed React Fundamentals Quiz',
      time: '2 hours ago',
      type: 'Quiz',
      icon: <CheckCircle />,
      color: 'success'
    },
    {
      title: 'Started JavaScript Advanced Course',
      time: '1 day ago',
      type: 'Course',
      icon: <PlayArrow />,
      color: 'primary'
    },
    {
      title: 'Assignment Due: React Project',
      time: '3 days ago',
      type: 'Assignment',
      icon: <Assignment />,
      color: 'warning'
    }
  ];

  const quickActions = [
    { icon: <School />, label: 'Browse Courses' },
    { icon: <Assignment />, label: 'Assignments' },
    { icon: <TrendingUp />, label: 'Progress' },
    { icon: <Notifications />, label: 'Notifications' }
  ];

  const upcomingDeadlines = [
    {
      title: 'React Final Project',
      course: 'React Development',
      dueDate: 'Tomorrow',
      urgent: true
    },
    {
      title: 'JavaScript Quiz',
      course: 'JavaScript Basics',
      dueDate: 'In 3 days',
      urgent: false
    },
    {
      title: 'CSS Assignment',
      course: 'Web Design',
      dueDate: 'Next week',
      urgent: false
    }
  ];

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
        {/* Welcome Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mb: { xs: 2, sm: 3 }, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: { xs: 2, sm: 3 },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3
            }
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">
            <Grid item xs={12}>
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                Welcome back, {currentUser.name}! 👋
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                sx={{ 
                  opacity: 0.9,
                  position: 'relative',
                  zIndex: 1,
                  mb: { xs: 2, md: 0 }
                }}
              >
                Ready to continue your learning journey?
              </Typography>
            </Grid>

          </Grid>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3 } }}>
          {statsCards.map((card, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                    borderColor: card.color + '.main'
                  },
                  '&:active': {
                    transform: 'translateY(0px)'
                  }
                }}
              >
                <CardContent sx={{ 
                  p: { xs: 1.5, sm: 2, md: 3 },
                  '&:last-child': { pb: { xs: 1.5, sm: 2, md: 3 } }
                }}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={{ xs: 1, sm: 2 }}
                    alignItems={{ xs: 'center', sm: 'flex-start' }}
                    sx={{ mb: { xs: 1, sm: 2 } }}
                  >
                    <Box 
                      sx={{ 
                        p: { xs: 1, sm: 1.5 }, 
                        borderRadius: 2, 
                        backgroundColor: `${card.color}.light`,
                        color: `${card.color}.main`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: { xs: 40, sm: 48 },
                        minHeight: { xs: 40, sm: 48 }
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, minWidth: 0 }}>
                      <Typography 
                        variant={isMobile ? 'h6' : 'h4'} 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: card.color + '.main',
                          lineHeight: 1.2
                        }}
                      >
                        {card.value}
                      </Typography>
                      <Typography 
                        variant={isMobile ? 'caption' : 'body2'} 
                        color="text.secondary"
                        sx={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {card.label}
                      </Typography>
                    </Box>
                  </Stack>
                  {card.progress && (
                    <LinearProgress 
                      variant="determinate" 
                      value={card.progress} 
                      sx={{ 
                        height: { xs: 4, sm: 6 }, 
                        borderRadius: 3,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: card.color + '.main',
                          borderRadius: 3
                        }
                      }} 
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Continue Learning */}
          <Grid item xs={12} lg={8}>
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                mb: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  Continue Learning
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  {continueCoursesData.map((course) => (
                    <Grid item xs={12} sm={6} key={course.id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          border: '1px solid', 
                          borderColor: 'divider',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          height: '100%',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 4,
                            borderColor: 'primary.main'
                          },
                          '&:active': {
                            transform: 'translateY(0px)'
                          }
                        }}
                      >
                        <CardContent sx={{ 
                          p: { xs: 1.5, sm: 2 },
                          '&:last-child': { pb: { xs: 1.5, sm: 2 } },
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <Stack 
                            direction="row" 
                            spacing={2} 
                            alignItems="center" 
                            sx={{ mb: 2 }}
                          >
                            <Avatar 
                              src={course.thumbnail}
                              sx={{ 
                                width: { xs: 40, sm: 48 }, 
                                height: { xs: 40, sm: 48 },
                                borderRadius: 2
                              }}
                            />
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                              <Typography 
                                variant={isMobile ? 'body1' : 'subtitle1'} 
                                sx={{ 
                                  fontWeight: 'bold',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  lineHeight: 1.3
                                }}
                              >
                                {course.title}
                              </Typography>
                              <Typography 
                                variant={isMobile ? 'caption' : 'body2'} 
                                color="text.secondary"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {course.instructor}
                              </Typography>
                            </Box>
                          </Stack>
                          <Box sx={{ mb: 2, flexGrow: 1 }}>
                            <Stack 
                              direction="row" 
                              justifyContent="space-between" 
                              alignItems="center"
                              sx={{ mb: 1 }}
                            >
                              <Typography 
                                variant={isMobile ? 'caption' : 'body2'} 
                                color="text.secondary"
                              >
                                Progress
                              </Typography>
                              <Typography 
                                variant={isMobile ? 'caption' : 'body2'} 
                                color="text.secondary"
                                sx={{ fontWeight: 600 }}
                              >
                                {course.progress}%
                              </Typography>
                            </Stack>
                            <LinearProgress 
                              variant="determinate" 
                              value={course.progress} 
                              sx={{ 
                                height: { xs: 4, sm: 6 }, 
                                borderRadius: 3,
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3
                                }
                              }}
                            />
                          </Box>
                          <Button 
                            variant="contained" 
                            fullWidth 
                            size={isMobile ? 'small' : 'medium'}
                            sx={{ 
                              borderRadius: 2,
                              fontWeight: 600,
                              textTransform: 'none',
                              py: { xs: 1, sm: 1.5 }
                            }}
                          >
                            Continue Learning
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: { xs: 2, sm: 3 }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  Recent Activity
                </Typography>
                <List sx={{ p: 0 }}>
                  {recentActivity.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        sx={{ 
                          px: 0,
                          py: { xs: 1, sm: 1.5 },
                          borderRadius: 2,
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ 
                              bgcolor: activity.color + '.light', 
                              color: activity.color + '.main',
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 }
                            }}
                          >
                            {activity.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.title}
                          secondary={activity.time}
                          primaryTypographyProps={{ 
                            fontWeight: 'medium',
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            sx: {
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }
                          }}
                          secondaryTypographyProps={{
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={activity.type} 
                          size={isMobile ? 'small' : 'medium'}
                          variant="outlined"
                          sx={{ 
                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                            height: isMobile ? 24 : 32
                          }}
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && (
                        <Divider sx={{ my: 0.5 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Quick Actions */}
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                mb: { xs: 2, sm: 3 },
                borderRadius: { xs: 2, sm: 3 }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  Quick Actions
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={6} key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={action.icon}
                        sx={{ 
                          py: { xs: 1.5, sm: 2 },
                          px: { xs: 1, sm: 2 },
                          flexDirection: 'column',
                          gap: { xs: 0.5, sm: 1 },
                          borderRadius: 2,
                          minHeight: { xs: 64, sm: 80 },
                          transition: 'all 0.3s ease',
                          '& .MuiButton-startIcon': {
                            margin: 0
                          },
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 2
                          },
                          '&:active': {
                            transform: 'translateY(0px)'
                          }
                        }}
                      >
                        <Typography 
                          variant={isMobile ? 'caption' : 'body2'} 
                          sx={{ 
                            textTransform: 'none',
                            fontWeight: 500,
                            textAlign: 'center',
                            lineHeight: 1.2
                          }}
                        >
                          {action.label}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card 
              elevation={0} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: { xs: 2, sm: 3 }
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  Upcoming Deadlines
                </Typography>
                <List sx={{ p: 0 }}>
                  {upcomingDeadlines.map((deadline, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        sx={{ 
                          px: 0,
                          py: { xs: 1, sm: 1.5 },
                          borderRadius: 2,
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <ListItemText
                          primary={deadline.title}
                          secondary={deadline.course}
                          primaryTypographyProps={{ 
                            fontWeight: 'medium',
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            sx: {
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }
                          }}
                          secondaryTypographyProps={{
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={deadline.dueDate} 
                          size={isMobile ? 'small' : 'medium'}
                          color={deadline.urgent ? 'error' : 'default'}
                          variant={deadline.urgent ? 'filled' : 'outlined'}
                          sx={{
                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                            height: isMobile ? 24 : 32,
                            fontWeight: 500
                          }}
                        />
                      </ListItem>
                      {index < upcomingDeadlines.length - 1 && (
                        <Divider sx={{ my: 0.5 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Dashboard;

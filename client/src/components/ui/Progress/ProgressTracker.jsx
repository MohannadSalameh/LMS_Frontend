import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Paper,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Assignment,
  Quiz,
  CheckCircle,
  Schedule,
  EmojiEvents,
  ExpandMore,
  PlayArrow,
  VideoLibrary,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProgressTracker = ({ userId, detailed = false }) => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProgressData();
  }, [userId]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/progress/${userId || 'me'}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setProgressData(data);
      } else {
        throw new Error('Failed to fetch progress data');
      }
    } catch (err) {
      setError(err.message);
      // Use mock data for development
      setProgressData(mockProgressData);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development
  const mockProgressData = {
    overall: {
      totalCourses: 5,
      completedCourses: 2,
      inProgressCourses: 3,
      totalLessons: 45,
      completedLessons: 28,
      totalQuizzes: 12,
      completedQuizzes: 8,
      totalAssignments: 8,
      completedAssignments: 5,
      averageScore: 85,
      totalTimeSpent: 2400, // minutes
      streak: 7, // days
      achievements: [
        { id: 1, name: 'First Course Complete', icon: '🎓', earnedAt: '2024-01-15' },
        { id: 2, name: 'Quiz Master', icon: '🧠', earnedAt: '2024-01-20' },
        { id: 3, name: '7-Day Streak', icon: '🔥', earnedAt: '2024-01-25' }
      ]
    },
    courses: [
      {
        id: 1,
        title: 'Complete React Development',
        progress: 100,
        status: 'completed',
        completedAt: '2024-01-20',
        timeSpent: 480,
        modules: [
          { id: 1, title: 'React Basics', progress: 100, lessons: 5, completedLessons: 5 },
          { id: 2, title: 'Advanced React', progress: 100, lessons: 6, completedLessons: 6 }
        ],
        quizzes: { total: 3, completed: 3, averageScore: 92 },
        assignments: { total: 2, completed: 2, averageScore: 88 }
      },
      {
        id: 2,
        title: 'JavaScript Fundamentals',
        progress: 75,
        status: 'in-progress',
        timeSpent: 360,
        modules: [
          { id: 3, title: 'JS Basics', progress: 100, lessons: 4, completedLessons: 4 },
          { id: 4, title: 'DOM Manipulation', progress: 60, lessons: 5, completedLessons: 3 },
          { id: 5, title: 'Async JavaScript', progress: 0, lessons: 4, completedLessons: 0 }
        ],
        quizzes: { total: 4, completed: 2, averageScore: 78 },
        assignments: { total: 3, completed: 1, averageScore: 85 }
      },
      {
        id: 3,
        title: 'Node.js Backend Development',
        progress: 30,
        status: 'in-progress',
        timeSpent: 180,
        modules: [
          { id: 6, title: 'Node.js Basics', progress: 80, lessons: 5, completedLessons: 4 },
          { id: 7, title: 'Express.js', progress: 20, lessons: 6, completedLessons: 1 },
          { id: 8, title: 'Database Integration', progress: 0, lessons: 4, completedLessons: 0 }
        ],
        quizzes: { total: 3, completed: 1, averageScore: 82 },
        assignments: { total: 2, completed: 0, averageScore: 0 }
      }
    ],
    recentActivity: [
      { type: 'lesson', title: 'Async/Await in JavaScript', courseTitle: 'JavaScript Fundamentals', completedAt: '2024-01-25T10:30:00Z' },
      { type: 'quiz', title: 'React Hooks Quiz', courseTitle: 'Complete React Development', score: 95, completedAt: '2024-01-24T15:45:00Z' },
      { type: 'assignment', title: 'Build a Todo App', courseTitle: 'Complete React Development', score: 88, completedAt: '2024-01-23T09:20:00Z' }
    ]
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  const renderOverallStats = () => {
    const { overall } = progressData;
    
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {overall.completedCourses}/{overall.totalCourses}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Courses Completed
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {Math.round((overall.completedLessons / overall.totalLessons) * 100)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overall Progress
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <EmojiEvents sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {overall.averageScore}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Score
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Schedule sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {formatTime(overall.totalTimeSpent)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time Spent
            </Typography>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderCourseProgress = () => {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Course Progress
          </Typography>
          
          {progressData.courses.map((course) => (
            <Accordion key={course.id} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mr: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {course.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" fontWeight="bold">
                        {course.progress}%
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={course.status.replace('-', ' ')}
                    color={getStatusColor(course.status)}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>
              
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Modules Progress
                    </Typography>
                    <List dense>
                      {course.modules.map((module) => (
                        <ListItem key={module.id}>
                          <ListItemIcon>
                            <VideoLibrary fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={module.title}
                            secondary={`${module.completedLessons}/${module.lessons} lessons`}
                          />
                          <Box sx={{ minWidth: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={module.progress}
                              size="small"
                            />
                            <Typography variant="caption" align="center">
                              {module.progress}%
                            </Typography>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Assessment Progress
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          <Quiz fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Quizzes
                        </Typography>
                        <Typography variant="body2">
                          {course.quizzes.completed}/{course.quizzes.total}
                        </Typography>
                      </Box>
                      {course.quizzes.averageScore > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          Average Score: {course.quizzes.averageScore}%
                        </Typography>
                      )}
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          <Assignment fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Assignments
                        </Typography>
                        <Typography variant="body2">
                          {course.assignments.completed}/{course.assignments.total}
                        </Typography>
                      </Box>
                      {course.assignments.averageScore > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          Average Score: {course.assignments.averageScore}%
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PlayArrow />}
                        onClick={() => navigate(`/courses/${course.id}/learn`)}
                      >
                        Continue Learning
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderAchievements = () => {
    const { achievements } = progressData.overall;
    
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Achievements
          </Typography>
          
          <Grid container spacing={2}>
            {achievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {achievement.icon}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {achievement.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Earned: {new Date(achievement.earnedAt).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const renderRecentActivity = () => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          
          <List>
            {progressData.recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {activity.type === 'lesson' && <VideoLibrary />}
                    {activity.type === 'quiz' && <Quiz />}
                    {activity.type === 'assignment' && <Assignment />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {activity.courseTitle}
                        </Typography>
                        {activity.score && (
                          <Typography variant="caption" color="success.main">
                            Score: {activity.score}%
                          </Typography>
                        )}
                        <Typography variant="caption" display="block" color="text.secondary">
                          {new Date(activity.completedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                  {activity.type !== 'lesson' && activity.score >= 80 && (
                    <CheckCircle color="success" />
                  )}
                </ListItem>
                {index < progressData.recentActivity.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !progressData) {
    return (
      <Alert severity="error">
        Failed to load progress data: {error}
      </Alert>
    );
  }

  if (!progressData) {
    return (
      <Alert severity="info">
        No progress data available.
      </Alert>
    );
  }

  return (
    <Box>
      {renderOverallStats()}
      {detailed && (
        <>
          {renderCourseProgress()}
          {renderAchievements()}
          {renderRecentActivity()}
        </>
      )}
    </Box>
  );
};

export default ProgressTracker;
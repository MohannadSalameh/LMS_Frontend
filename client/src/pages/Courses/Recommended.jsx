import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Rating,
  Avatar,
  Container,
  Breadcrumbs,
  Link,
  Paper,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Star,
  Person,
  Schedule,
  PlayCircleOutline,
  BookmarkBorder,
  Bookmark,
  NavigateNext,
  TrendingUp,
  Lightbulb,
  School,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { mockCourses } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const Recommended = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set());

  // Get recommended courses based on user's enrolled courses and interests
  const enrolledCourses = mockCourses.filter(course => course.isEnrolled);
  const enrolledCategories = [...new Set(enrolledCourses.map(course => course.category))];
  
  // Recommend courses from similar categories or highly rated courses
  const recommendedCourses = mockCourses.filter(course => {
    if (course.isEnrolled) return false;
    return enrolledCategories.includes(course.category) || course.rating >= 4.5;
  }).slice(0, 8);

  // Popular courses (most enrolled)
  const popularCourses = mockCourses
    .filter(course => !course.isEnrolled)
    .sort((a, b) => b.enrolledStudents - a.enrolledStudents)
    .slice(0, 6);

  // New courses
  const newCourses = mockCourses
    .filter(course => !course.isEnrolled)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const handleBookmark = (courseId) => {
    setBookmarkedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const CourseCard = ({ course, showProgress = false }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={course.thumbnail}
          alt={course.title}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            p: 0.5,
          }}
        >
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark(course.id);
            }}
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            {bookmarkedCourses.has(course.id) ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorder />
            )}
          </Button>
        </Box>
        <Chip
          label={course.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'primary.main',
            color: 'white',
          }}
        />
        {course.isEnrolled && (
          <Chip
            label="Enrolled"
            size="small"
            color="success"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {course.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={course.instructor.avatar}
            alt={course.instructor.name}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {course.instructor.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={course.rating} readOnly size="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {course.rating} ({course.reviews})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Schedule sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {formatDuration(course.duration)}
          </Typography>
          <Person sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {course.enrolledStudents}
          </Typography>
        </Box>

        {showProgress && course.progress !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {course.progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={course.progress} 
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" fontWeight="bold" color="primary">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={course.isEnrolled ? <PlayCircleOutline /> : null}
            onClick={(e) => {
              e.stopPropagation();
              if (course.isEnrolled) {
                navigate(`/courses/${course.id}/modules`);
              } else {
                navigate(`/course/${course.id}`);
              }
            }}
          >
            {course.isEnrolled ? 'Continue' : 'Enroll'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Home
          </Link>
          <Typography color="text.primary">Recommended</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Recommended for You
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Courses picked just for you based on your learning journey
          </Typography>
        </Box>

        {/* Personalized Recommendations */}
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Lightbulb sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h5" component="h2" fontWeight="bold">
              Personalized Recommendations
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Based on your enrolled courses in {enrolledCategories.join(', ')}, we think you'll love these courses!
          </Typography>
          <Grid container spacing={3}>
            {recommendedCourses.slice(0, 4).map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
          {recommendedCourses.length > 4 && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                onClick={() => navigate('/courses')}
              >
                View All Recommendations
              </Button>
            </Box>
          )}
        </Paper>

        {/* Popular Courses */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h2" fontWeight="bold">
              Popular Courses
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Join thousands of students in these trending courses
          </Typography>
          <Grid container spacing={3}>
            {popularCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* New Courses */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <School sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h4" component="h2" fontWeight="bold">
              New Courses
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Fresh content from our expert instructors
          </Typography>
          <Grid container spacing={3}>
            {newCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Continue Learning */}
        {enrolledCourses.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Continue Learning
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Pick up where you left off
            </Typography>
            <Grid container spacing={3}>
              {enrolledCourses.slice(0, 3).map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <CourseCard course={course} showProgress={true} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Call to Action */}
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Can't find what you're looking for?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse our full catalog of courses or search for specific topics
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/courses')}
            >
              Browse All Courses
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/categories')}
            >
              Explore Categories
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Recommended;
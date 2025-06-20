import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Avatar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  NavigateNext,
  Person,
  Schedule,
  Star,
  BookmarkBorder,
  Bookmark,
  PlayCircleOutline,
} from '@mui/icons-material';
import Layout from '../../layout/Layout';
import { mockCourses, mockCategories } from '../../../data/mockData';

function CategoryCourses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set());

  useEffect(() => {
    // Simulate API call with mock data
    const fetchData = () => {
      try {
        setLoading(true);
        
        // Find category by ID
        const category = mockCategories.find(cat => cat.id === parseInt(id));
        if (!category) {
          throw new Error('Category not found');
        }
        
        setCategoryName(category.name);
        
        // Filter courses by category
        const categoryCoursesData = mockCourses.filter(
          course => course.category === category.name
        );
        
        setCourses(categoryCoursesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Simulate network delay
    setTimeout(fetchData, 500);
  }, [id]);

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

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4 }}>
            <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width={400} height={60} sx={{ mb: 4 }} />
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                      <Skeleton variant="text" height={20} width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4 }}>
            <Alert severity="error" sx={{ mb: 4 }}>
              Error: {error}
            </Alert>
            <Button variant="contained" onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (!courses.length) {
    return (
      <Layout>
        <Container maxWidth="xl">
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              No courses found in {categoryName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              This category doesn't have any courses yet. Check back later or explore other categories.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/categories')}>
              Browse Other Categories
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

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
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/categories')}
            sx={{ cursor: 'pointer' }}
          >
            Categories
          </Link>
          <Typography color="text.primary">{categoryName}</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {categoryName} Courses
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover {courses.length} amazing courses in {categoryName}
          </Typography>
        </Box>

        {/* Course Stats */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Courses
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="secondary">
                {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Students
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Rating
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Course Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
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
                    height="200"
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
                      {course.rating} ({course.reviews} reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      {formatDuration(course.duration)}
                    </Typography>
                    <Person sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.enrolledStudents} students
                    </Typography>
                  </Box>

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
                      {course.isEnrolled ? 'Continue' : 'View Course'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Want to explore more?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Check out other categories or browse all available courses
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/categories')}
            >
              Browse Categories
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/courses')}
            >
              All Courses
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default CategoryCourses;

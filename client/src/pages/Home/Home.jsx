import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PlayArrow,
  AccessTime,
  People,
  Star,
  TrendingUp,
  School,
  Code,
  Business,
  Palette,
  Language,
  Science,
  Psychology,
  ArrowForward,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import { mockCourses, mockCategories, mockStats } from '../../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const featuredCourses = mockCourses.filter(course => course.featured).slice(0, 3);
  const topCategories = mockCategories.slice(0, 6);

  return (
    <Layout>
      <Box sx={{ pt: 0 }}>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '70vh', sm: '80vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: { xs: 2, sm: 3 },
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: { xs: 1.2, sm: 1.3 },
              px: { xs: 1, sm: 0 }
            }}
          >
            Transform Your Future with
            <br />
            <Box component="span" sx={{ 
              color: '#FFD700',
              display: 'inline-block',
              animation: 'pulse 2s infinite'
            }}>
              Evolve
            </Box>
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            sx={{
              mb: { xs: 3, sm: 4 },
              opacity: 0.9,
              maxWidth: { xs: '100%', sm: '600px' },
              mx: 'auto',
              lineHeight: { xs: 1.5, sm: 1.6 },
              px: { xs: 1, sm: 0 }
            }}
          >
            Discover thousands of courses, learn from industry experts, and advance your career with our cutting-edge learning platform.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2 }, 
            justifyContent: 'center', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            maxWidth: { xs: '300px', sm: 'none' },
            mx: { xs: 'auto', sm: 0 }
          }}>
            <Button
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              onClick={() => navigate('/courses')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 'bold',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                minWidth: { xs: '200px', sm: 'auto' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                }
              }}
            >
              Explore Courses
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? 'medium' : 'large'}
              onClick={() => navigate('/register')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 'bold',
                borderRadius: 3,
                minWidth: { xs: '200px', sm: 'auto' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                }
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 3, sm: 4 }} textAlign="center">
          <Grid item xs={6} md={3}>
            <Box sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main', 
                  mb: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {mockStats.totalUsers.toLocaleString()}
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Active Learners
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main', 
                  mb: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {mockStats.totalCourses}
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Expert Courses
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main', 
                  mb: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {mockStats.completionRate}%
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Completion Rate
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                component="div" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main', 
                  mb: 1,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {mockStats.averageRating}
              </Typography>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'} 
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Average Rating
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Courses */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 6, sm: 8 } }}>
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            component="h2" 
            textAlign="center" 
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
          >
            Featured Courses
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            textAlign="center" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            Discover our most popular and highly-rated courses
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ px: { xs: 1, sm: 2 }, justifyContent: 'center' }}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { 
                      transform: 'translateY(-6px)',
                      boxShadow: { xs: 4, sm: 6 },
                      borderColor: 'primary.main'
                    },
                    cursor: 'pointer',
                    maxWidth: { xs: '320px', sm: '280px', md: '300px', lg: '280px' },
                    mx: 'auto',
                    width: '100%'
                  }}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={course.thumbnail}
                    alt={course.title}
                    sx={{
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label={course.category} size="small" color="primary" />
                      <Chip label={course.level} size="small" />
                    </Box>
                    <Typography 
                      variant={isMobile ? 'h6' : 'h5'} 
                      component="h3" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ 
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        lineHeight: 1.3,
                        mb: { xs: 1, sm: 2 }
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
                      <Avatar sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 }, mr: 1, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                        {course.instructor.charAt(0)}
                      </Avatar>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {course.instructor}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={course.rating} readOnly size={isMobile ? "small" : "medium"} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            ml: 1,
                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                          }}
                        >
                          ({course.studentsEnrolled})
                        </Typography>
                      </Box>
                      <Typography 
                        variant={isMobile ? 'h6' : 'h5'} 
                        color="primary.main" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                      >
                        ${course.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" sx={{ mt: { xs: 3, sm: 4 } }}>
            <Button
              variant="outlined"
              size={isMobile ? 'medium' : 'large'}
              endIcon={<ArrowForward />}
              onClick={() => navigate('/course')}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              View All Courses
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom fontWeight="bold">
          Popular Categories
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Explore courses across different domains
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ px: { xs: 1, sm: 2 }, justifyContent: 'center' }}>
          {topCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <Card
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: { xs: 2, sm: 3 },
                  border: '1px solid',
                  borderColor: 'divider',
                  height: { xs: 200, sm: 220, md: 240 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: { xs: 4, sm: 6 },
                    borderColor: 'primary.main',
                  },
                  cursor: 'pointer',
                  maxWidth: { xs: '280px', sm: '260px', md: '280px', lg: '260px' },
                  mx: 'auto',
                  width: '100%'
                }}
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                <Box
                  sx={{
                    width: { xs: 40, sm: 50, md: 60 },
                    height: { xs: 40, sm: 50, md: 60 },
                    borderRadius: '50%',
                    backgroundColor: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: { xs: 1, sm: 1.5 },
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <School sx={{ color: 'white', fontSize: { xs: 20, sm: 24, md: 30 } }} />
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                    lineHeight: 1.2,
                    mb: { xs: 0.5, sm: 1 }
                  }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    lineHeight: 1.4,
                    flex: 1
                  }}
                >
                  {category.description}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="primary.main" 
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '0.875rem' },
                    mt: 'auto'
                  }}
                >
                  {category.courseCount} courses
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join our community of learners and unlock your potential today
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: 'grey.100' },
              px: 4,
              py: 1.5,
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      </Box>
    </Layout>
  );
};

export default Home;










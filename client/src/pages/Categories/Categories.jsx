import Footer from "../../components/layout/Footer";
import React from 'react';
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
  Paper,
  Breadcrumbs,
  Link,
  Avatar,
} from '@mui/material';
import {
  NavigateNext,
  Code,
  Palette,
  TrendingUp,
  School,
  Language,
  Psychology,
  Camera,
  MusicNote,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { mockCategories, mockCourses } from '../../data/mockData';

const categoryIcons = {
  'Web Development': <Code />,
  'Design': <Palette />,
  'Business': <TrendingUp />,
  'Data Science': <School />,
  'Languages': <Language />,
  'Psychology': <Psychology />,
  'Photography': <Camera />,
  'Music': <MusicNote />,
};

function Categories() {
  const navigate = useNavigate();

  const getCourseCount = (categoryName) => {
    return mockCourses.filter(course => course.category === categoryName).length;
  };

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
          <Typography color="text.primary">Categories</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Course Categories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explore our diverse range of course categories and find the perfect learning path for your goals
          </Typography>
        </Box>

        {/* Featured Categories */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center">
            Popular Categories
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 4, opacity: 0.9 }}>
            Most enrolled categories by our students
          </Typography>
          <Grid container spacing={3}>
            {mockCategories.slice(0, 4).map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: 30,
                      }}
                    >
                      {categoryIcons[category.name] || <School />}
                    </Avatar>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>
                    <Chip
                      label={`${getCourseCount(category.name)} courses`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* All Categories */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            All Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse through all available course categories
          </Typography>
          <Grid container spacing={3}>
            {mockCategories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 120,
                      background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: 40,
                    }}
                  >
                    {categoryIcons[category.name] || <School />}
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {category.name}
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
                      {category.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={`${getCourseCount(category.name)} courses`}
                        size="small"
                        color="primary"
                      />
                      <Button size="small" variant="outlined">
                        Explore
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            Can't find the right category?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse all courses or use our search feature to find exactly what you're looking for
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
              onClick={() => navigate('/search')}
            >
              Search Courses
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Categories;

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  School,
  EmojiObjects,
  Groups,
  Devices,
  Security,
  TrendingUp,
  PersonAdd,
  CheckCircle,
  Star,
  Psychology,
  Support,
  Verified
} from '@mui/icons-material';

function AboutEvolve() {
  const features = [
    {
      icon: <School />,
      title: 'Diverse Course Selection',
      description: 'From programming and data science to design and business, Evolve offers a wide range of courses tailored to meet diverse interests and career goals.'
    },
    {
      icon: <Star />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and academic experts who bring real-world experience and practical insights.'
    },
    {
      icon: <Psychology />,
      title: 'Interactive Learning Tools',
      description: 'Engage with interactive assignments, quizzes, and collaborative projects to deepen your understanding.'
    },
    {
      icon: <Devices />,
      title: 'Flexible Learning',
      description: 'Access courses anytime, anywhere, and learn at your own pace on any device.'
    },
    {
      icon: <Groups />,
      title: 'Community Support',
      description: 'Join forums and groups to collaborate, discuss, and grow with fellow learners.'
    }
  ];

  const advantages = [
    {
      icon: <EmojiObjects />,
      title: 'User-Friendly Interface',
      description: 'Designed for ease of navigation and a smooth learning experience.'
    },
    {
      icon: <TrendingUp />,
      title: 'Personalized Recommendations',
      description: 'Receive course suggestions based on your interests and learning progress.'
    },
    {
      icon: <Security />,
      title: 'Secure and Reliable',
      description: 'We prioritize your data privacy and platform stability.'
    },
    {
      icon: <Support />,
      title: 'Continuous Improvement',
      description: 'We constantly update our content and features based on user feedback and educational trends.'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <School sx={{ fontSize: 60, mr: 2 }} />
            <Typography variant="h2" component="h1" fontWeight="bold">
              About Evolve
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
            Empowering learners worldwide with innovative education technology and personalized learning experiences
          </Typography>
        </Container>
      </Box>

      {/* Welcome Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 4, mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary">
            Welcome to Evolve
          </Typography>
          <Typography variant="h6" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Evolve is a modern, flexible, and user-centric learning management system designed to empower learners and educators alike. Our platform provides seamless access to high-quality educational content, interactive tools, and personalized learning experiences that support professional and personal growth.
          </Typography>
        </Paper>

        {/* Mission Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Our Mission
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
            At Evolve, our mission is to make learning accessible, engaging, and effective for everyone. We strive to connect learners with expertly crafted courses across various fields, fostering a community where knowledge meets innovation.
          </Typography>
        </Box>

        {/* What We Offer Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 6 }}>
            What We Offer
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                          mr: 2
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" fontWeight="bold">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Evolve Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 6 }}>
            Why Choose Evolve?
          </Typography>
          <Grid container spacing={4}>
            {advantages.map((advantage, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 48,
                      height: 48,
                      mr: 3,
                      mt: 0.5
                    }}
                  >
                    {advantage.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                      {advantage.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {advantage.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Join Us Section */}
        <Paper
          elevation={3}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 6,
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Join Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.8, maxWidth: '600px', mx: 'auto' }}>
            Whether you are a student, professional, or educator, Evolve welcomes you to explore, learn, and grow. Together, let's shape the future of education.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<PersonAdd />}
              label="Students Welcome"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', py: 2, px: 1 }}
            />
            <Chip
              icon={<Verified />}
              label="Professionals"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', py: 2, px: 1 }}
            />
            <Chip
              icon={<School />}
              label="Educators"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', py: 2, px: 1 }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutEvolve;

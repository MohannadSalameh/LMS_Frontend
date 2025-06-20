import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Snackbar
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  ContactMail,
  Support,
  Business
} from '@mui/icons-material';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmitted(true);
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsLoading(false);
      }, 1000);
    }
  };

  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Address',
      content: '123 Evolve St, Amman, Jordan'
    },
    {
      icon: <Email />,
      title: 'Email',
      content: 'support@evolve.com'
    },
    {
      icon: <Phone />,
      title: 'Phone',
      content: '+962 7 1234 5678'
    },
    {
      icon: <AccessTime />,
      title: 'Working Hours',
      content: 'Sunday - Thursday, 9 AM - 5 PM'
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
            <ContactMail sx={{ fontSize: 60, mr: 2 }} />
            <Typography variant="h2" component="h1" fontWeight="bold">
              Contact Us
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Have questions, suggestions, or want to get in touch? We're here to help!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary">
                Send us a Message
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Fill out the form below and our team will respond as soon as possible.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for reaching out! We will get back to you shortly.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      disabled={isLoading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid rgba(102, 126, 234, 0.3)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '2px solid #667eea',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.2)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                          '&.Mui-focused': {
                            color: '#667eea',
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                            <ContactMail sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                          </Box>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      disabled={isLoading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid rgba(102, 126, 234, 0.3)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '2px solid #667eea',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.2)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                          '&.Mui-focused': {
                            color: '#667eea',
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                            <Email sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                          </Box>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                      disabled={isLoading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid rgba(102, 126, 234, 0.3)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '2px solid #667eea',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.2)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                          '&.Mui-focused': {
                            color: '#667eea',
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                            <Support sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                          </Box>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      disabled={isLoading}
                      placeholder="Write your message here..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid rgba(102, 126, 234, 0.3)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '2px solid #667eea',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.2)',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                          '&.Mui-focused': {
                            color: '#667eea',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      startIcon={<Send />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                        }
                      }}
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4, height: 'fit-content' }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary">
                Get in Touch
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                We're here to help and answer any questions you might have.
              </Typography>

              <List sx={{ p: 0 }}>
                {contactInfo.map((info, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                          {info.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold">
                            {info.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {info.content}
                          </Typography>
                        }
                        sx={{ ml: 2 }}
                      />
                    </ListItem>
                    {index < contactInfo.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {/* Additional Support Card */}
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                mt: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Support sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Need Immediate Help?
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Check out our FAQ section or browse our help documentation for quick answers.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Visit Help Center
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactUs;

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Home,
  School,
  Info,
  ContactMail,
  Help,
  Feedback,
  Policy,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../../src/assets/images/evolve-logo.svg';

function Footer() {
    const exploreLinks = [
        { text: 'Home', path: '/main', icon: <Home /> },
        { text: 'Courses', path: '/courses', icon: <School /> },
        { text: 'About Us', path: '/about', icon: <Info /> },
    ];

    const supportLinks = [
        { text: 'FAQ', path: '/faq', icon: <Help /> },
        { text: 'Contact', path: '/contact', icon: <ContactMail /> },
        { text: 'Feedback', path: '/feedback', icon: <Feedback /> },
        { text: 'Privacy Policy', path: '/privacy', icon: <Policy /> },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: <Facebook />, url: '#' },
        { name: 'Twitter', icon: <Twitter />, url: '#' },
        { name: 'Instagram', icon: <Instagram />, url: '#' },
        { name: 'YouTube', icon: <YouTube />, url: '#' },
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2C3E50',
                color: 'white',
                py: { xs: 2, sm: 2.5, md: 3 },
                px: { xs: 2, sm: 3, md: 4 },
                mt: 'auto',
                width: '100%',
                overflow: 'hidden',
                borderTop: '2px solid #34495E',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}
        >
            <Container 
                maxWidth="xl" 
                sx={{ 
                    position: 'relative', 
                    zIndex: 1,
                    maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px', xl: '1400px' }
                }}
            >
                <Grid 
                    container 
                    spacing={{ xs: 1.5, sm: 2, md: 3 }}
                    sx={{
                        justifyContent: { xs: 'center', md: 'space-between' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    {/* Logo Section */}
                    <Grid item xs={12} sm={6} md={3} lg={4}>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: { xs: 'center', md: 'flex-start' },
                                mb: { xs: 2, md: 3 },
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <Avatar
                                src={logo}
                                alt="Evolve"
                                sx={{ 
                                    width: { xs: 45, sm: 50, md: 55 }, 
                                    height: { xs: 45, sm: 50, md: 55 }, 
                                    mr: { xs: 1, md: 1.5 },
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        borderColor: 'rgba(255, 255, 255, 0.6)'
                                    }
                                }}
                            />
                            <Typography 
                                variant="h5" 
                                fontWeight="bold"
                                sx={{
                                    fontSize: { xs: '1.3rem', sm: '1.4rem', md: '1.5rem' },
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Evolve
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ 
                                fontStyle: 'italic', 
                                opacity: 0.9,
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                mb: { xs: 1.5, md: 2 },
                                color: 'rgba(255, 255, 255, 0.95)'
                            }}
                        >
                            Learn it. Live it. Love it.
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                opacity: 0.85,
                                lineHeight: 1.6,
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                maxWidth: { xs: '100%', md: '280px' }
                            }}
                        >
                            Empowering learners worldwide with quality education and innovative learning experiences.
                        </Typography>
                    </Grid>

                    {/* Explore Links */}
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                mb: { xs: 2, md: 2.5 },
                                color: 'rgba(255, 255, 255, 0.95)',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                                pb: 1,
                                display: 'inline-block'
                            }}
                        >
                            Explore
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: { xs: 1.5, md: 1.8 }
                        }}>
                            {exploreLinks.map((link) => (
                                <Link
                                    key={link.text}
                                    component={RouterLink}
                                    to={link.path}
                                    color="inherit"
                                    underline="none"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        opacity: 0.9,
                                        padding: { xs: '8px 12px', md: '6px 8px' },
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease-in-out',
                                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                                        '&:hover': { 
                                            opacity: 1,
                                            color: '#ffffff',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            transform: 'translateX(8px)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        }
                                    }}
                                >
                                    <Box sx={{ 
                                        mr: { xs: 1.5, md: 1.2 }, 
                                        fontSize: { xs: 18, md: 16 },
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.2)'
                                        }
                                    }}>
                                        {link.icon}
                                    </Box>
                                    {link.text}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Support Links */}
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                mb: { xs: 2, md: 2.5 },
                                color: 'rgba(255, 255, 255, 0.95)',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                                pb: 1,
                                display: 'inline-block'
                            }}
                        >
                            Support
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: { xs: 1.5, md: 1.8 }
                        }}>
                            {supportLinks.map((link) => (
                                <Link
                                    key={link.text}
                                    component={RouterLink}
                                    to={link.path}
                                    color="inherit"
                                    underline="none"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        opacity: 0.9,
                                        padding: { xs: '8px 12px', md: '6px 8px' },
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease-in-out',
                                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                                        '&:hover': { 
                                            opacity: 1,
                                            color: '#ffffff',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            transform: 'translateX(8px)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        }
                                    }}
                                >
                                    <Box sx={{ 
                                        mr: { xs: 1.5, md: 1.2 }, 
                                        fontSize: { xs: 18, md: 16 },
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.2)'
                                        }
                                    }}>
                                        {link.icon}
                                    </Box>
                                    {link.text}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Social Links */}
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                mb: { xs: 2, md: 2.5 },
                                color: 'rgba(255, 255, 255, 0.95)',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                                pb: 1,
                                display: 'inline-block'
                            }}
                        >
                            Stay Connected
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                mb: { xs: 2.5, md: 3 }, 
                                opacity: 0.85,
                                fontSize: { xs: '0.9rem', md: '0.95rem' },
                                lineHeight: 1.5,
                                maxWidth: { xs: '100%', md: '300px' }
                            }}
                        >
                            Follow us on social media for the latest updates, educational content, and community news.
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: { xs: 1.5, md: 2 },
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            alignItems: 'center'
                        }}>
                            {socialLinks.map((social) => (
                                <IconButton
                                    key={social.name}
                                    component="a"
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        width: { xs: 48, md: 52 },
                                        height: { xs: 48, md: 52 },
                                        borderRadius: '12px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                            borderColor: 'rgba(255, 255, 255, 0.4)',
                                            transform: 'translateY(-4px) scale(1.05)',
                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                                        },
                                        '&:active': {
                                            transform: 'translateY(-2px) scale(1.02)'
                                        }
                                    }}
                                    aria-label={social.name}
                                >
                                    <Box sx={{ fontSize: { xs: 20, md: 22 } }}>
                                        {social.icon}
                                    </Box>
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                <Divider 
                    sx={{ 
                        my: { xs: 2, md: 2.5 }, 
                        backgroundColor: '#34495E', 
                        height: '1px'
                    }} 
                />

                {/* Copyright */}
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        pt: { xs: 1, md: 1.5 },
                        pb: { xs: 0.5, md: 1 }
                    }}
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            opacity: 0.8,
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                            fontWeight: 400,
                            letterSpacing: '0.5px',
                            color: 'rgba(255, 255, 255, 0.85)'
                        }}
                    >
                        © {new Date().getFullYear()} Evolve — All rights reserved. Made with ❤️ for learners worldwide.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;

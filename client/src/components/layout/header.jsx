import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  School,
  Explore,
  ContactMail,
  Info,
  ExitToApp,
  Person,
  Close,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CourseSearch from '../ui/Courses/CourseSearch.jsx';
import logo from '../../../src/assets/images/evolve-logo.svg';

function Header() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/student/Dashboard' },
        { text: 'My Courses', icon: <School />, path: '/my-courses' },
        { text: 'Explore Courses', icon: <Explore />, path: '/course' },
        { text: 'Contact', icon: <ContactMail />, path: '/contact' },
        { text: 'About', icon: <Info />, path: '/about' },
    ];
    
    const handleNavigation = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };
    
    return (
        <>
            <AppBar 
                position="sticky" 
                elevation={1} 
                sx={{ 
                    backgroundColor: 'white', 
                    color: 'text.primary',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Toolbar 
                    sx={{ 
                        justifyContent: 'space-between',
                        minHeight: { xs: 56, sm: 64 },
                        px: { xs: 1, sm: 2 }
                    }}
                >
                    {/* Logo - Always on the left */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        flexShrink: 0,
                        zIndex: 1
                    }}>
                        <Avatar 
                            src={logo} 
                            alt="Evolve Logo" 
                            sx={{ 
                                width: { xs: 32, sm: 40 }, 
                                height: { xs: 32, sm: 40 }, 
                                mr: { xs: 0.5, sm: 1 }
                            }}
                        />
                        <Typography 
                            variant={isMobile ? 'h6' : 'h5'}
                            component={Link} 
                            to="/"
                            sx={{ 
                                fontWeight: 'bold', 
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                        >
                            Evolve
                        </Typography>
                    </Box>
                    
                    {/* Desktop: Search Bar and Navigation */}
                    {!isMobile && (
                        <>
                            {/* Search Bar */}
                            <Box sx={{ 
                                flexGrow: 1, 
                                mx: { sm: 2, md: 3 }, 
                                display: 'flex', 
                                justifyContent: 'center',
                                maxWidth: { sm: 300, md: 400 }
                            }}>
                                <Box sx={{ width: '100%' }}>
                                    <CourseSearch />
                                </Box>
                            </Box>
                            
                            {/* Desktop Navigation */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: { sm: 0.5, md: 1 },
                                flexShrink: 0
                            }}>
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.text}
                                        component={Link}
                                        to={item.path}
                                        color="inherit"
                                        startIcon={!isTablet ? item.icon : null}
                                        size={isTablet ? 'small' : 'medium'}
                                        sx={{ 
                                            textTransform: 'none',
                                            fontSize: { sm: '0.8rem', md: '0.875rem' },
                                            px: { sm: 1, md: 2 },
                                            minWidth: { sm: 'auto', md: 'auto' },
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        {isTablet ? item.text.split(' ')[0] : item.text}
                                    </Button>
                                ))}
                                
                                {/* Profile Menu */}
                                <IconButton
                                    size={isTablet ? 'medium' : 'large'}
                                    aria-label="account of current user"
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    sx={{ ml: { sm: 0.5, md: 1 } }}
                                >
                                    <Avatar 
                                        src={user?.avatar || "https://i.pravatar.cc/80?img=21"}
                                        alt="Profile"
                                        sx={{ 
                                            width: { sm: 28, md: 32 }, 
                                            height: { sm: 28, md: 32 }
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </>
                    )}
                    
                    {/* Mobile: Only Burger Menu on the right */}
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMobileMenuToggle}
                            sx={{ 
                                zIndex: 1,
                                p: 1
                            }}
                        >
                            <MenuIcon sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                    )}
                </Toolbar>
                
                {/* Mobile Search Bar */}
                {isMobile && (
                    <Box sx={{ 
                        px: { xs: 1, sm: 2 }, 
                        py: 1, 
                        borderTop: '1px solid #e0e0e0',
                        backgroundColor: '#fafafa'
                    }}>
                        <CourseSearch />
                    </Box>
                )}
            </AppBar>
            
            {/* Profile Menu */}
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <Person fontSize="small" sx={{ mr: 1 }} />
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate('/logout')}>
                    <ExitToApp fontSize="small" sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
            
            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={handleMobileMenuToggle}
                PaperProps={{
                    sx: { 
                        width: { xs: '100%', sm: 320 },
                        maxWidth: '100vw',
                        height: '100%',
                        backgroundColor: '#ffffff'
                    }
                }}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
            >
                <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                            src={logo} 
                            alt="Evolve Logo" 
                            sx={{ width: 32, height: 32, mr: 1 }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            Evolve
                        </Typography>
                    </Box>
                    <IconButton onClick={handleMobileMenuToggle}>
                        <Close />
                    </IconButton>
                </Box>
                
                {/* User Profile Section in Mobile Menu */}
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                            src={user?.avatar || "https://i.pravatar.cc/80?img=21"}
                            alt="Profile"
                            sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {user?.name || 'User'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.email || 'user@example.com'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
                {/* Navigation Menu */}
                <List sx={{ pt: 0 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton 
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                            color: 'white'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    primaryTypographyProps={{
                                        fontWeight: 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    
                    <Divider sx={{ my: 1 }} />
                    
                    {/* Profile and Logout in Mobile Menu */}
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => handleNavigation('/profile')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon sx={{ color: 'primary.main' }}>
                                <Person />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Profile" 
                                primaryTypographyProps={{
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => handleNavigation('/logout')}
                            sx={{ 
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'error.light',
                                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                        color: 'white'
                                    }
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'error.main' }}>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Logout" 
                                primaryTypographyProps={{
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Header;
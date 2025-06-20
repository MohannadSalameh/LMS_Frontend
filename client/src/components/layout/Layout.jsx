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
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  Collapse,
  Tooltip,
} from '@mui/material';
import logo from '../../assets/images/evolve-logo.svg';
import meeeImage from '../../assets/images/meeee.jpg';
import {
  Menu as MenuIcon,
  Dashboard,
  School,
  Category,
  Person,
  Settings,
  Logout,
  Notifications,
  Home,
  BookmarkBorder,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;
const mobileDrawerWidth = 280;
const collapsedDrawerWidth = 64;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const { user, logout } = useAuth();

  const currentDrawerWidth = isMobile ? mobileDrawerWidth : (drawerCollapsed ? collapsedDrawerWidth : drawerWidth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [
      { text: 'Home', icon: <Home />, path: '/' },
      { text: 'Browse Courses', icon: <School />, path: '/course' },
      { text: 'Categories', icon: <Category />, path: '/categories' },
    ];

    if (!user) return baseItems;

    const roleSpecificItems = {
      student: [
        { text: 'Dashboard', icon: <Dashboard />, path: '/student/Dashboard' },
        { text: 'My Courses', icon: <BookmarkBorder />, path: '/my-courses' },
      ],
      instructor: [
        { text: 'Instructor Dashboard', icon: <Dashboard />, path: '/instructor/dashboard' },
        { text: 'My Courses', icon: <BookmarkBorder />, path: '/my-courses' },
      ],
      admin: [
        { text: 'Admin Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { text: 'My Courses', icon: <BookmarkBorder />, path: '/my-courses' },
      ],
    };

    const userItems = roleSpecificItems[user.role] || roleSpecificItems.student;
    const commonItems = [
      { text: 'Profile', icon: <Person />, path: '/profile' },
      { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    return [...baseItems, ...userItems, ...commonItems];
  };

  const menuItems = getMenuItems();

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar 
        sx={{ 
          minHeight: { xs: '56px', sm: '64px' },
          px: { xs: 2, sm: 3 },
          justifyContent: drawerCollapsed && !isMobile ? 'center' : 'flex-start'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%',
          justifyContent: drawerCollapsed && !isMobile ? 'center' : 'flex-start'
        }}>
          <img 
            src={logo} 
            alt="Evolve Logo" 
            style={{ 
              height: '40px', 
              width: '40px', 
              marginRight: drawerCollapsed && !isMobile ? '0' : '12px',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }} 
          />
          {(!drawerCollapsed || isMobile) && (
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Evolve
            </Typography>
          )}
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <Tooltip 
              title={drawerCollapsed && !isMobile ? item.text : ''} 
              placement="right"
              arrow
            >
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: drawerCollapsed && !isMobile ? 'center' : 'flex-start',
                  px: drawerCollapsed && !isMobile ? 1 : 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: drawerCollapsed && !isMobile ? 0 : 40,
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {(!drawerCollapsed || isMobile) && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 500
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { md: `${currentDrawerWidth}px` },
          transition: 'width 0.3s ease, margin 0.3s ease',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: { xs: '56px', sm: '64px' },
            px: { xs: 2, sm: 3 }
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              minWidth: 48,
              minHeight: 48
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {!isMobile && (
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={() => setDrawerCollapsed(!drawerCollapsed)}
              sx={{ 
                mr: 2,
                minWidth: 48,
                minHeight: 48
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {isMobile ? 'Evolve' : ''}
          </Typography>
          
          <Tooltip title="Notifications" arrow>
            <IconButton 
              color="inherit" 
              sx={{ 
                mr: { xs: 1, sm: 2 },
                minWidth: 48,
                minHeight: 48
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {user ? (
            <>
              <Tooltip title="Profile menu" arrow>
                <IconButton 
                  onClick={handleProfileMenuOpen} 
                  sx={{ 
                    p: 0.5,
                    minWidth: 48,
                    minHeight: 48
                  }}
                >
                  <Avatar
                    alt={user.name}
                    src={user.avatar || meeeImage}
                    sx={{ 
                      width: { xs: 36, sm: 40 }, 
                      height: { xs: 36, sm: 40 },
                      border: '2px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <MenuItem 
                  onClick={() => navigate('/profile')}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    minHeight: 48
                  }}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={() => navigate('/settings')}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    minHeight: 48
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    minHeight: 48,
                    color: 'error.main'
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" color="error" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="primary" 
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ 
                  minHeight: 40,
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Login
              </Button>
              <Button 
                color="primary" 
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{ 
                  minHeight: 40,
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ 
          width: { md: currentDrawerWidth }, 
          flexShrink: { md: 0 },
          transition: 'width 0.3s ease'
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: mobileDrawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: currentDrawerWidth,
              transition: 'width 0.3s ease',
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              overflowX: 'hidden'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          mt: { xs: '56px', sm: '64px' },
          minHeight: 'calc(100vh - 56px)',
          backgroundColor: 'background.default',
          transition: 'width 0.3s ease, margin 0.3s ease',
          overflow: 'hidden'
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 2 },
            height: '100%',
            maxWidth: '100%'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
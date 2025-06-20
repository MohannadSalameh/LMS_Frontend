import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Typography,
    Divider,
    IconButton,
    Collapse,
    useTheme,
    useMediaQuery,
    Paper,
} from '@mui/material';
import {
    Dashboard,
    LibraryBooks,
    People,
    Settings,
    ExpandMore,
    ExpandLess,
    ExitToApp,
    Menu,
    Close,
    Person,
    School,
    Explore,
    Recommend,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const menuItems = [
        { title: 'Dashboard', icon: <Dashboard />, path: '/student/Dashboard' },
        {
            title: 'My Courses',
            icon: <LibraryBooks />,
            path: '/my-courses',
            subItems: [
                { title: 'Enrolled', icon: <School />, path: '/my-courses' },
                { title: 'Recommended', icon: <Recommend />, path: '/course/recommended' },
                { title: 'Explore', icon: <Explore />, path: '/course' },
            ],
        },
        { title: 'Community', icon: <People />, path: '/community' },
        { title: 'Profile', icon: <Person />, path: '/profile' },
        { title: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    const toggleSubmenu = (title) => {
        setOpenSubmenu(openSubmenu === title ? null : title);
    };

    const isActive = (path) => location.pathname === path;

    const handleDrawerToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClick = (hasSubItems) => {
        if (!hasSubItems && isMobile) {
            setIsOpen(false);
        }
    };

    const drawerWidth = 280;

    const sidebarContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Profile Section */}
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 20px rgba(107, 127, 191, 0.3)',
                        border: '3px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 25px rgba(107, 127, 191, 0.4)',
                        },
                    }}
                >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {user?.name || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user?.role || 'Student'}
                </Typography>
            </Box>

            <Divider />

            {/* Navigation Menu */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List sx={{ px: 1 }}>
                    {menuItems.map(({ title, icon, path, subItems }) => (
                        <React.Fragment key={title}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={subItems ? 'div' : RouterLink}
                                    to={subItems ? undefined : path}
                                    selected={isActive(path)}
                                    onClick={() => {
                                        if (subItems) {
                                            toggleSubmenu(title);
                                        } else {
                                            handleMenuClick(false);
                                        }
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        mx: 1,
                                        mb: 0.5,
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive(path) ? 'white' : 'inherit',
                                            minWidth: 40,
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                    {subItems && (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubmenu(title);
                                            }}
                                            sx={{ color: isActive(path) ? 'white' : 'inherit' }}
                                        >
                                            {openSubmenu === title ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    )}
                                </ListItemButton>
                            </ListItem>

                            {/* Submenu */}
                            {subItems && (
                                <Collapse in={openSubmenu === title} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {subItems.map(({ title: subTitle, icon: subIcon, path: subPath }) => (
                                            <ListItem key={subTitle} disablePadding>
                                                <ListItemButton
                                                    component={RouterLink}
                                                    to={subPath}
                                                    selected={isActive(subPath)}
                                                    onClick={() => handleMenuClick(false)}
                                                    sx={{
                                                        borderRadius: 2,
                                                        mx: 2,
                                                        mb: 0.5,
                                                        pl: 4,
                                                        '&.Mui-selected': {
                                                            bgcolor: 'primary.light',
                                                            color: 'primary.main',
                                                            '&:hover': {
                                                                bgcolor: 'primary.light',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {subIcon && (
                                                        <ListItemIcon
                                                            sx={{
                                                                color: isActive(subPath) ? 'primary.main' : 'inherit',
                                                                minWidth: 32,
                                                            }}
                                                        >
                                                            {subIcon}
                                                        </ListItemIcon>
                                                    )}
                                                    <ListItemText primary={subTitle} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <Divider />

            {/* Logout Button */}
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={() => {
                        logout();
                        setIsOpen(false);
                    }}
                    sx={{
                        borderRadius: 2,
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.light',
                            color: 'error.dark',
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box>
            {/* Mobile Toggle Button */}
            {isMobile && (
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: theme.zIndex.drawer + 1,
                        bgcolor: 'background.paper',
                        boxShadow: 2,
                        '&:hover': {
                            bgcolor: 'background.paper',
                        },
                    }}
                    aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    {isOpen ? <Close /> : <Menu />}
                </IconButton>
            )}

            {/* Desktop Sidebar */}
            {!isMobile && (
                <Paper
                    elevation={3}
                    sx={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: drawerWidth,
                        height: '100vh',
                        zIndex: theme.zIndex.drawer,
                        overflow: 'hidden',
                    }}
                >
                    {sidebarContent}
                </Paper>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={isOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;

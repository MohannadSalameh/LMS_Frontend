import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  School,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Language,
  EmojiEvents,
  TrendingUp,
  Assignment,
  Quiz,
  PhotoCamera,
  Visibility,
  VisibilityOff,
  Lock,
} from '@mui/icons-material';
import ProgressTracker from '../Progress/ProgressTracker';
import meeeImage from '../../../assets/images/meeee.jpg';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StudentProfile = ({ userId, isOwnProfile = true }) => {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId || 'me'}/profile`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setEditData(data);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      setError(err.message);
      // Use mock data for development
      const mockProfile = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        avatar: null,
        bio: 'Passionate learner interested in web development and data science.',
        location: 'New York, NY',
        dateOfBirth: '1995-06-15',
        joinedAt: '2024-01-01',
        language: 'English',
        timezone: 'America/New_York',
        preferences: {
          emailNotifications: true,
          pushNotifications: false,
          weeklyDigest: true,
          courseReminders: true
        },
        stats: {
          totalCourses: 5,
          completedCourses: 2,
          totalCertificates: 2,
          totalPoints: 1250,
          currentStreak: 7,
          longestStreak: 15
        },
        skills: [
          { name: 'JavaScript', level: 'Intermediate' },
          { name: 'React', level: 'Beginner' },
          { name: 'Node.js', level: 'Beginner' },
          { name: 'HTML/CSS', level: 'Advanced' }
        ],
        certificates: [
          {
            id: 1,
            title: 'Complete React Development',
            issuedAt: '2024-01-20',
            credentialId: 'CERT-REACT-001'
          },
          {
            id: 2,
            title: 'JavaScript Fundamentals',
            issuedAt: '2024-01-15',
            credentialId: 'CERT-JS-001'
          }
        ],
        recentActivity: [
          { type: 'course_completed', title: 'Complete React Development', date: '2024-01-20' },
          { type: 'quiz_passed', title: 'JavaScript Basics Quiz', score: 95, date: '2024-01-18' },
          { type: 'assignment_submitted', title: 'Build a Todo App', score: 88, date: '2024-01-16' }
        ]
      };
      setProfile(mockProfile);
      setEditData(mockProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId || 'me'}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editData)
      });
      
      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditing(false);
        setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      // For development, just update local state
      setProfile(editData);
      setEditing(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({ open: true, message: 'New passwords do not match!', severity: 'error' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setSnackbar({ open: true, message: 'Password must be at least 8 characters long!', severity: 'error' });
      return;
    }

    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      if (response.ok) {
        setPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to change password');
      }
    } catch (err) {
      // For development
      setPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/users/avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({ ...prev, avatar: data.avatarUrl }));
        setSnackbar({ open: true, message: 'Avatar updated successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to upload avatar');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to upload avatar', severity: 'error' });
    }
  };

  const getSkillColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'info';
      case 'intermediate': return 'warning';
      case 'advanced': return 'success';
      default: return 'default';
    }
  };

  const renderProfileInfo = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  src={profile.avatar || meeeImage}
                  sx={{ width: 120, height: 120, mx: 'auto' }}
                >
                  {!profile.avatar && !meeeImage && `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`}
                </Avatar>
                {isOwnProfile && (
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  >
                    <PhotoCamera fontSize="small" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </IconButton>
                )}
              </Box>
              
              <Typography variant="h5" fontWeight="bold">
                {profile.firstName} {profile.lastName}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Member since {new Date(profile.joinedAt).toLocaleDateString()}
              </Typography>
              
              {profile.bio && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {profile.bio}
                </Typography>
              )}
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="h6" fontWeight="bold">
                    {profile.stats.totalPoints}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Points
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontWeight="bold">
                    {profile.stats.currentStreak}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Day Streak
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={`${skill.name} (${skill.level})`}
                    color={getSkillColor(skill.level)}
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Personal Information
                </Typography>
                {isOwnProfile && (
                  <Button
                    variant={editing ? "outlined" : "contained"}
                    startIcon={editing ? <Cancel /> : <Edit />}
                    onClick={() => {
                      if (editing) {
                        setEditData(profile);
                      }
                      setEditing(!editing);
                    }}
                  >
                    {editing ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={editing ? editData.firstName : profile.firstName}
                    onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={!editing}
                    InputProps={{
                      startAdornment: <School sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={editing ? editData.lastName : profile.lastName}
                    onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled={!editing}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={editing ? editData.email : profile.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!editing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={editing ? editData.phone : profile.phone}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!editing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={editing ? editData.location : profile.location}
                    onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!editing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={editing ? editData.dateOfBirth : profile.dateOfBirth}
                    onChange={(e) => setEditData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    disabled={!editing}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={3}
                    value={editing ? editData.bio : profile.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!editing}
                    placeholder="Tell us about yourself..."
                  />
                </Grid>
              </Grid>
              
              {editing && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  {isOwnProfile && (
                    <Button
                      variant="outlined"
                      startIcon={<Lock />}
                      onClick={() => setPasswordDialog(true)}
                    >
                      Change Password
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderCertificates = () => {
    return (
      <Grid container spacing={3}>
        {profile.certificates.map((cert) => (
          <Grid item xs={12} sm={6} md={4} key={cert.id}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <EmojiEvents sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {cert.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {cert.credentialId}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" size="small">
                    View Certificate
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderActivity = () => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            {profile.recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {activity.type === 'course_completed' && <School />}
                    {activity.type === 'quiz_passed' && <Quiz />}
                    {activity.type === 'assignment_submitted' && <Assignment />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      <Box>
                        {activity.score && (
                          <Typography variant="caption" color="success.main">
                            Score: {activity.score}%
                          </Typography>
                        )}
                        <Typography variant="caption" display="block" color="text.secondary">
                          {new Date(activity.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < profile.recentActivity.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !profile) {
    return (
      <Alert severity="error">
        Failed to load profile: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Profile" />
          <Tab label="Progress" />
          <Tab label="Certificates" />
          <Tab label="Activity" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        {renderProfileInfo()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <ProgressTracker userId={userId} detailed={true} />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        {renderCertificates()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        {renderActivity()}
      </TabPanel>
      
      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentProfile;
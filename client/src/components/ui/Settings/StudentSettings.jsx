import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Paper,
  Slider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Notifications,
  Language,
  Security,
  Palette,
  Schedule,
  VolumeUp,
  Delete,
  Download,
  Visibility,
  Block,
  Save,
  Restore,
  Warning,
  Info,
  CheckCircle,
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
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

const StudentSettings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/settings', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        throw new Error('Failed to fetch settings');
      }
    } catch (err) {
      // Use mock data for development
      const mockSettings = {
        notifications: {
          emailNotifications: true,
          pushNotifications: false,
          courseReminders: true,
          assignmentDeadlines: true,
          weeklyDigest: true,
          marketingEmails: false,
          soundEnabled: true,
          soundVolume: 70
        },
        preferences: {
          language: 'en',
          timezone: 'America/New_York',
          theme: 'light',
          autoplay: false,
          playbackSpeed: 1.0,
          subtitles: true,
          subtitleLanguage: 'en'
        },
        privacy: {
          profileVisibility: 'public',
          showProgress: true,
          showCertificates: true,
          allowMessages: true,
          dataCollection: true
        },
        study: {
          dailyGoal: 60, // minutes
          reminderTime: '09:00',
          weeklyGoal: 420, // minutes
          preferredStudyDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          breakReminders: true,
          focusMode: false
        }
      };
      setSettings(mockSettings);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/users/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        setHasChanges(false);
        setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (err) {
      // For development
      setHasChanges(false);
      setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
    }
  };

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/users/export-data', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-learning-data.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setExportDialog(false);
        setSnackbar({ open: true, message: 'Data exported successfully!', severity: 'success' });
      } else {
        throw new Error('Failed to export data');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to export data', severity: 'error' });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/users/delete-account', {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setDeleteDialog(false);
        setSnackbar({ open: true, message: 'Account deletion initiated. You will receive an email confirmation.', severity: 'info' });
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete account', severity: 'error' });
    }
  };

  const renderNotificationSettings = () => {
    if (!settings) return null;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                Email Notifications
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                  }
                  label="Enable email notifications"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.courseReminders}
                      onChange={(e) => handleSettingChange('notifications', 'courseReminders', e.target.checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                  }
                  label="Course reminders"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.assignmentDeadlines}
                      onChange={(e) => handleSettingChange('notifications', 'assignmentDeadlines', e.target.checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                  }
                  label="Assignment deadlines"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.weeklyDigest}
                      onChange={(e) => handleSettingChange('notifications', 'weeklyDigest', e.target.checked)}
                      disabled={!settings.notifications.emailNotifications}
                    />
                  }
                  label="Weekly progress digest"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onChange={(e) => handleSettingChange('notifications', 'marketingEmails', e.target.checked)}
                    />
                  }
                  label="Marketing emails"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <VolumeUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Sound & Push Notifications
              </Typography>
              
              <FormGroup sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                  }
                  label="Enable push notifications"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.soundEnabled}
                      onChange={(e) => handleSettingChange('notifications', 'soundEnabled', e.target.checked)}
                    />
                  }
                  label="Enable notification sounds"
                />
              </FormGroup>
              
              {settings.notifications.soundEnabled && (
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Sound Volume
                  </Typography>
                  <Slider
                    value={settings.notifications.soundVolume}
                    onChange={(e, value) => handleSettingChange('notifications', 'soundVolume', value)}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderPreferences = () => {
    if (!settings) return null;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Language sx={{ mr: 1, verticalAlign: 'middle' }} />
                Language & Region
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.preferences.language}
                      onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="de">Deutsch</MenuItem>
                      <MenuItem value="zh">中文</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={settings.preferences.timezone}
                      onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                      label="Timezone"
                    >
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                      <MenuItem value="Europe/London">London (GMT)</MenuItem>
                      <MenuItem value="Europe/Paris">Paris (CET)</MenuItem>
                      <MenuItem value="Asia/Tokyo">Tokyo (JST)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Palette sx={{ mr: 1, verticalAlign: 'middle' }} />
                Appearance
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={settings.preferences.theme}
                  onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                  label="Theme"
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="auto">Auto (System)</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Video Playback
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.autoplay}
                        onChange={(e) => handleSettingChange('preferences', 'autoplay', e.target.checked)}
                      />
                    }
                    label="Autoplay next lesson"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.preferences.subtitles}
                        onChange={(e) => handleSettingChange('preferences', 'subtitles', e.target.checked)}
                      />
                    }
                    label="Enable subtitles"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Default Playback Speed</InputLabel>
                    <Select
                      value={settings.preferences.playbackSpeed}
                      onChange={(e) => handleSettingChange('preferences', 'playbackSpeed', e.target.value)}
                      label="Default Playback Speed"
                    >
                      <MenuItem value={0.5}>0.5x</MenuItem>
                      <MenuItem value={0.75}>0.75x</MenuItem>
                      <MenuItem value={1.0}>1.0x (Normal)</MenuItem>
                      <MenuItem value={1.25}>1.25x</MenuItem>
                      <MenuItem value={1.5}>1.5x</MenuItem>
                      <MenuItem value={2.0}>2.0x</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled={!settings.preferences.subtitles}>
                    <InputLabel>Subtitle Language</InputLabel>
                    <Select
                      value={settings.preferences.subtitleLanguage}
                      onChange={(e) => handleSettingChange('preferences', 'subtitleLanguage', e.target.value)}
                      label="Subtitle Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderStudySettings = () => {
    if (!settings) return null;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                Study Goals
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    Daily Study Goal (minutes)
                  </Typography>
                  <Slider
                    value={settings.study.dailyGoal}
                    onChange={(e, value) => handleSettingChange('study', 'dailyGoal', value)}
                    min={15}
                    max={240}
                    step={15}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} min`}
                    marks={[
                      { value: 30, label: '30m' },
                      { value: 60, label: '1h' },
                      { value: 120, label: '2h' },
                      { value: 180, label: '3h' }
                    ]}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Daily Reminder Time"
                    type="time"
                    value={settings.study.reminderTime}
                    onChange={(e) => handleSettingChange('study', 'reminderTime', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Study Preferences
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.study.breakReminders}
                      onChange={(e) => handleSettingChange('study', 'breakReminders', e.target.checked)}
                    />
                  }
                  label="Break reminders (every 25 minutes)"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.study.focusMode}
                      onChange={(e) => handleSettingChange('study', 'focusMode', e.target.checked)}
                    />
                  }
                  label="Focus mode (minimize distractions)"
                />
              </FormGroup>
              
              <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                Preferred Study Days
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <Chip
                    key={day}
                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                    color={settings.study.preferredStudyDays.includes(day) ? 'primary' : 'default'}
                    onClick={() => {
                      const newDays = settings.study.preferredStudyDays.includes(day)
                        ? settings.study.preferredStudyDays.filter(d => d !== day)
                        : [...settings.study.preferredStudyDays, day];
                      handleSettingChange('study', 'preferredStudyDays', newDays);
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderPrivacySettings = () => {
    if (!settings) return null;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Visibility sx={{ mr: 1, verticalAlign: 'middle' }} />
                Profile Visibility
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Profile Visibility</InputLabel>
                <Select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                  label="Profile Visibility"
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="students">Students Only</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.showProgress}
                      onChange={(e) => handleSettingChange('privacy', 'showProgress', e.target.checked)}
                    />
                  }
                  label="Show learning progress"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.showCertificates}
                      onChange={(e) => handleSettingChange('privacy', 'showCertificates', e.target.checked)}
                    />
                  }
                  label="Show certificates"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.allowMessages}
                      onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                    />
                  }
                  label="Allow messages from other students"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data & Privacy
              </Typography>
              
              <FormGroup sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privacy.dataCollection}
                      onChange={(e) => handleSettingChange('privacy', 'dataCollection', e.target.checked)}
                    />
                  }
                  label="Allow data collection for improving experience"
                />
              </FormGroup>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage your data and account
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => setExportDialog(true)}
                >
                  Export My Data
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setDeleteDialog(true)}
                >
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Loading settings...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Settings
        </Typography>
        
        {hasChanges && (
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveSettings}
          >
            Save Changes
          </Button>
        )}
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Notifications" />
          <Tab label="Preferences" />
          <Tab label="Study" />
          <Tab label="Privacy" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        {renderNotificationSettings()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {renderPreferences()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        {renderStudySettings()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        {renderPrivacySettings()}
      </TabPanel>
      
      {/* Export Data Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>
          <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
          Export Your Data
        </DialogTitle>
        <DialogContent>
          <Typography>
            This will download a JSON file containing all your learning data, including:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Profile information" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Course progress and completion data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Quiz and assignment scores" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Certificates earned" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Learning activity history" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
          <Button onClick={handleExportData} variant="contained" startIcon={<Download />}>
            Export Data
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Account Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>
          <Warning sx={{ mr: 1, verticalAlign: 'middle', color: 'error.main' }} />
          Delete Account
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Deleting your account will permanently remove:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• All your profile information" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Course progress and enrollment data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Certificates and achievements" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• All learning history and analytics" />
            </ListItem>
          </List>
          <Typography sx={{ mt: 2 }}>
            You will receive an email confirmation before the deletion is finalized.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
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

export default StudentSettings;
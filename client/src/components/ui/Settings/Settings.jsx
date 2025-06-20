import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Card,
    CardContent,
    Box,
    Grid,
    Alert,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import {
    Settings as SettingsIcon,
    Person,
    Email,
    Palette,
    Notifications,
    Save
} from '@mui/icons-material';
import { useAuth } from "../../../contexts/AuthContext";

function Settings() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });
    const { user } = useAuth()
    const [preferences, setPreferences] = useState({
        darkMode: false,
        notifications: true,
    });

    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = {
                    name: user?.name || null,
                    email: user?.email || null ,
                    darkMode: false,
                    notifications: true,
                };
                setProfile({ name: data.name, email: data.email });
                setPreferences({
                    darkMode: data.darkMode,
                    notifications: data.notifications,
                });
            } catch {
                setError("Failed to load settings.");
            }
        }
        fetchSettings();
    }, []);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handlePreferenceChange = (e) => {
        const { name, checked } = e.target;
        setPreferences((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);
        setStatus(null);

        try {
            // Replace with your API call to save settings
            // await api.saveSettings({ profile, preferences });

            // Mock success response
            setStatus("Settings saved successfully.");
        } catch {
            setError("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 4
            }}>
                <SettingsIcon sx={{ fontSize: '2.5rem', color: '#6B7FBF' }} />
                Settings
            </Typography>

            <Box component="form" onSubmit={handleSave}>
                <Grid container spacing={4}>
                    {/* Profile Information Card */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 8px 32px rgba(107, 127, 191, 0.1)',
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 3
                                }}>
                                    <Person /> Profile Information
                                </Typography>
                                
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    required
                                    disabled={isSaving}
                                    sx={{ 
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            border: '2px solid transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                border: '2px solid rgba(107, 127, 191, 0.3)',
                                                boxShadow: '0 4px 12px rgba(107, 127, 191, 0.1)',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: '2px solid #6B7FBF',
                                                boxShadow: '0 4px 16px rgba(107, 127, 191, 0.2)',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontWeight: 500,
                                            '&.Mui-focused': {
                                                color: '#6B7FBF',
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleProfileChange}
                                    required
                                    disabled={isSaving}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            border: '2px solid transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                border: '2px solid rgba(107, 127, 191, 0.3)',
                                                boxShadow: '0 4px 12px rgba(107, 127, 191, 0.1)',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: '2px solid #6B7FBF',
                                                boxShadow: '0 4px 16px rgba(107, 127, 191, 0.2)',
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontWeight: 500,
                                            '&.Mui-focused': {
                                                color: '#6B7FBF',
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Preferences Card */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 8px 32px rgba(107, 127, 191, 0.1)',
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{ 
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mb: 3
                                }}>
                                    <Palette /> Preferences
                                </Typography>
                                
                                <Box sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="darkMode"
                                                checked={preferences.darkMode}
                                                onChange={handlePreferenceChange}
                                                disabled={isSaving}
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#6B7FBF',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#6B7FBF',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Palette sx={{ color: 'primary.main' }} />
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    Enable Dark Mode
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ mb: 2 }}
                                    />
                                </Box>
                                
                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="notifications"
                                                checked={preferences.notifications}
                                                onChange={handlePreferenceChange}
                                                disabled={isSaving}
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#6B7FBF',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#6B7FBF',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Notifications sx={{ color: 'primary.main' }} />
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    Receive Email Notifications
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Status Messages */}
                {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}
                {status && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                        {status}
                    </Alert>
                )}

                {/* Save Button */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSaving}
                        startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                            boxShadow: '0 4px 15px rgba(107, 127, 191, 0.3)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5A6EAE 0%, #7989C0 100%)',
                                boxShadow: '0 6px 20px rgba(107, 127, 191, 0.4)',
                                transform: 'translateY(-2px)',
                            },
                            '&:disabled': {
                                background: 'rgba(107, 127, 191, 0.5)',
                                transform: 'none',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isSaving ? "Saving..." : "Save Settings"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Settings;

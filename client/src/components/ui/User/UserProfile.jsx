import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Divider,
    Alert,
    CircularProgress,
    InputAdornment,
    Card,
    CardContent,
} from '@mui/material';
import {
    Person,
    Email,
    Lock,
    PhotoCamera,
    Save,
    Security,
} from '@mui/icons-material';
import styles from "./UserProfile.module.css";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [updateStatus, setUpdateStatus] = useState(null);
    const [passwordStatus, setPasswordStatus] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                const res = await fetch("/api/profile", { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setUser(data);
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    avatar: data.avatar || "",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handlePasswordChange(e) {
        setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleProfileUpdate(e) {
        e.preventDefault();
        setUpdateStatus(null);
        setError(null);
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Failed to update profile");
            const data = await res.json();
            setUser(data);
            setUpdateStatus("Profile updated successfully.");
        } catch (err) {
            setError(err.message);
        }
    }

    async function handlePasswordUpdate(e) {
        e.preventDefault();
        setPasswordStatus(null);
        setError(null);

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setPasswordStatus("New passwords do not match.");
            return;
        }

        try {
            // Assuming your backend expects oldPassword and newPassword fields
            const res = await fetch("/api/user/change-password", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }),

            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Password change failed");
            }
            setPasswordStatus("Password changed successfully.");
            setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (err) {
            setPasswordStatus(err.message);
        }
    }

    if (loading) return <div className={styles.loading}>Loading profile...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!user) return null;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 4
            }}>
                User Profile
            </Typography>

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
                            
                            {/* Avatar Section */}
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Avatar
                                    src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
                                    alt="User Avatar"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        mx: 'auto',
                                        mb: 2,
                                        border: '4px solid',
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 20px rgba(107, 127, 191, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 6px 25px rgba(107, 127, 191, 0.4)',
                                        },
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Click to change avatar
                                </Typography>
                            </Box>

                            <Box component="form" onSubmit={handleProfileUpdate}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
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
                                                <Email sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="Avatar URL"
                                    name="avatar"
                                    type="url"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    placeholder="https://example.com/avatar.jpg"
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
                                                <PhotoCamera sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<Save />}
                                    sx={{
                                        py: 1.5,
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
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Update Profile
                                </Button>
                                
                                {updateStatus && (
                                    <Alert severity="success" sx={{ mt: 2 }}>
                                        {updateStatus}
                                    </Alert>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Password Change Card */}
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
                                <Lock /> Change Password
                            </Typography>
                            
                            <Box component="form" onSubmit={handlePasswordUpdate}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    name="oldPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    required
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
                                                <Lock sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    inputProps={{ minLength: 6 }}
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
                                                <VpnKey sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    name="confirmNewPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={passwordData.confirmNewPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    inputProps={{ minLength: 6 }}
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
                                                <VpnKey sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<Security />}
                                    sx={{
                                        py: 1.5,
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
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Change Password
                                </Button>
                                
                                {passwordStatus && (
                                    <Alert 
                                        severity={passwordStatus.includes("success") ? "success" : "error"} 
                                        sx={{ mt: 2 }}
                                    >
                                        {passwordStatus}
                                    </Alert>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Enrolled Courses Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3
                }}>
                    <School /> Enrolled Courses
                </Typography>
                
                {(user.enrolledCourses ?? []).length === 0 ? (
                    <Card sx={{ 
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 8px 32px rgba(107, 127, 191, 0.1)',
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            You are not enrolled in any courses yet.
                        </Typography>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {user.enrolledCourses.map((course) => (
                            <Grid item xs={12} sm={6} md={4} key={course.id}>
                                <Card sx={{
                                    height: '100%',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 8px 32px rgba(107, 127, 191, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(107, 127, 191, 0.2)',
                                    },
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={course.thumbnail_url || "/default-course.jpg"}
                                        alt={course.title}
                                        sx={{ borderRadius: '12px 12px 0 0' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Instructor: {course.instructor_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Enrolled: {new Date(course.enrollment_date).toLocaleDateString()}
                                        </Typography>
                                        
                                        <Box sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2">Progress</Typography>
                                                <Typography variant="body2">{course.progress}%</Typography>
                                            </Box>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={course.progress} 
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: 'rgba(107, 127, 191, 0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 4,
                                                        background: 'linear-gradient(135deg, #6B7FBF 0%, #8A9BD1 100%)',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
}

export default UserProfile;

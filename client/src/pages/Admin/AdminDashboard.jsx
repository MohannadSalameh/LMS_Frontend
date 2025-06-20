import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ApproveIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI, courseAPI, categoryAPI } from '../../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalCategories: 0,
    pendingApprovals: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'user', 'course', 'category'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersRes, coursesRes, categoriesRes] = await Promise.all([
        userAPI.getAllUsers(),
        courseAPI.getAllCourses(),
        categoryAPI.getAllCategories(),
      ]);
      
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
      setCategories(categoriesRes.data);
      
      // Calculate stats
      const pendingCourses = coursesRes.data.filter(course => !course.is_published).length;
      
      setStats({
        totalUsers: usersRes.data.length,
        totalCourses: coursesRes.data.length,
        totalCategories: categoriesRes.data.length,
        pendingApprovals: pendingCourses,
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = (type) => {
    setDialogType(type);
    setSelectedItem(null);
    setFormData({});
    setOpenDialog(true);
  };

  const handleEditItem = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
    setFormData(item);
    setOpenDialog(true);
  };

  const handleSaveItem = async () => {
    try {
      if (dialogType === 'user') {
        if (selectedItem) {
          await userAPI.updateUser(selectedItem.id, formData);
        } else {
          await userAPI.createUser(formData);
        }
      } else if (dialogType === 'category') {
        if (selectedItem) {
          await categoryAPI.updateCategory(selectedItem.id, formData);
        } else {
          await categoryAPI.createCategory(formData);
        }
      }
      setOpenDialog(false);
      fetchAdminData();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'user') {
          await userAPI.deleteUser(id);
        } else if (type === 'course') {
          await courseAPI.deleteCourse(id);
        } else if (type === 'category') {
          await categoryAPI.deleteCategory(id);
        }
        fetchAdminData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await userAPI.updateUser(userId, { is_active: !currentStatus });
      fetchAdminData();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      await courseAPI.updateCourse(courseId, { is_published: true });
      fetchAdminData();
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box color={color}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const UsersTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleCreateItem('user')}
        >
          Add User
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.profile_picture_url}>
                    {user.name?.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'admin' ? 'error' : user.role === 'instructor' ? 'warning' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.is_active ? 'Active' : 'Blocked'}
                    color={user.is_active ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditItem('user', user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                    color={user.is_active ? 'error' : 'success'}
                  >
                    {user.is_active ? <BlockIcon /> : <ApproveIcon />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteItem('user', user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const CoursesTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Course Management</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => {
              const instructor = users.find(u => u.id === course.instructor_id);
              const category = categories.find(c => c.id === course.category_id);
              
              return (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{instructor?.name || 'N/A'}</TableCell>
                  <TableCell>{category?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={course.is_published ? 'Published' : 'Pending'}
                      color={course.is_published ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{course.enrolled_count || 0}</TableCell>
                  <TableCell>
                    {new Date(course.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {!course.is_published && (
                      <IconButton
                        size="small"
                        onClick={() => handleApproveCourse(course.id)}
                        color="success"
                      >
                        <ApproveIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem('course', course.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const CategoriesTab = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Category Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleCreateItem('category')}
        >
          Add Category
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              const courseCount = courses.filter(c => c.category_id === category.id).length;
              
              return (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{courseCount}</TableCell>
                  <TableCell>
                    {new Date(category.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditItem('category', category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem('category', category.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderDialogContent = () => {
    if (dialogType === 'user') {
      return (
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {!selectedItem && (
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password || ''}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
            />
          )}
        </Box>
      );
    } else if (dialogType === 'category') {
      return (
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography>Loading...</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          System Administration Panel
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon fontSize="large" />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              icon={<SchoolIcon fontSize="large" />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Categories"
              value={stats.totalCategories}
              icon={<CategoryIcon fontSize="large" />}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Approvals"
              value={stats.pendingApprovals}
              icon={<TrendingUpIcon fontSize="large" />}
              color="error.main"
            />
          </Grid>
        </Grid>

        {/* Management Tabs */}
        <Card>
          <CardContent>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Users" />
              <Tab label="Courses" />
              <Tab label="Categories" />
            </Tabs>
            
            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && <UsersTab />}
              {activeTab === 1 && <CoursesTab />}
              {activeTab === 2 && <CategoriesTab />}
            </Box>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedItem ? `Edit ${dialogType}` : `Create New ${dialogType}`}
          </DialogTitle>
          <DialogContent>
            {renderDialogContent()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveItem} variant="contained">
              {selectedItem ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default AdminDashboard;
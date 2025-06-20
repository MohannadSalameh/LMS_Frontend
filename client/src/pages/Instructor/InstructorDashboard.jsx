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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { courseAPI, categoryAPI } from '../../services/api';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalAssignments: 0,
    averageRating: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category_id: '',
    thumbnail_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const fetchInstructorData = async () => {
    try {
      setLoading(true);
      const [coursesRes, categoriesRes] = await Promise.all([
        courseAPI.getAllCourses(),
        categoryAPI.getAllCategories(),
      ]);
      
      // Filter courses by instructor
      const instructorCourses = coursesRes.data.filter(
        course => course.instructor_id === user.id
      );
      
      setCourses(instructorCourses);
      setCategories(categoriesRes.data);
      
      // Calculate stats
      const totalStudents = instructorCourses.reduce(
        (sum, course) => sum + (course.enrolled_count || 0), 0
      );
      
      setStats({
        totalCourses: instructorCourses.length,
        totalStudents,
        totalAssignments: instructorCourses.reduce(
          (sum, course) => sum + (course.assignments_count || 0), 0
        ),
        averageRating: instructorCourses.reduce(
          (sum, course) => sum + (course.rating || 0), 0
        ) / instructorCourses.length || 0,
      });
    } catch (error) {
      console.error('Error fetching instructor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setCourseForm({
      title: '',
      description: '',
      category_id: '',
      thumbnail_url: '',
    });
    setOpenDialog(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category_id: course.category_id,
      thumbnail_url: course.thumbnail_url || '',
    });
    setOpenDialog(true);
  };

  const handleSaveCourse = async () => {
    try {
      if (selectedCourse) {
        await courseAPI.updateCourse(selectedCourse.id, courseForm);
      } else {
        await courseAPI.createCourse({
          ...courseForm,
          instructor_id: user.id,
        });
      }
      setOpenDialog(false);
      fetchInstructorData();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(courseId);
        fetchInstructorData();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
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
          Instructor Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              icon={<SchoolIcon fontSize="large" />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={<PeopleIcon fontSize="large" />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Assignments"
              value={stats.totalAssignments}
              icon={<AssignmentIcon fontSize="large" />}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Avg Rating"
              value={stats.averageRating.toFixed(1)}
              icon={<TrendingUpIcon fontSize="large" />}
              color="info.main"
            />
          </Grid>
        </Grid>

        {/* Courses Table */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">My Courses</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateCourse}
              >
                Create Course
              </Button>
            </Box>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>
                        {categories.find(cat => cat.id === course.category_id)?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.is_published ? 'Published' : 'Draft'}
                          color={course.is_published ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{course.enrolled_count || 0}</TableCell>
                      <TableCell>
                        {new Date(course.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => window.open(`/course/${course.id}`, '_blank')}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditCourse(course)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteCourse(course.id)}
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
          </CardContent>
        </Card>

        {/* Course Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedCourse ? 'Edit Course' : 'Create New Course'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Course Title"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                margin="normal"
                multiline
                rows={4}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={courseForm.category_id}
                  onChange={(e) => setCourseForm({ ...courseForm, category_id: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Thumbnail URL"
                value={courseForm.thumbnail_url}
                onChange={(e) => setCourseForm({ ...courseForm, thumbnail_url: e.target.value })}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveCourse} variant="contained">
              {selectedCourse ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default InstructorDashboard;
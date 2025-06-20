import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh-token'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  changePassword: (data) => api.put('/users/change-password', data),
};

// Course API calls
export const courseAPI = {
  getAllCourses: () => api.get('/course'),
  getCourseById: (id) => api.get(`/course/${id}`),
  createCourse: (data) => api.post('/course', data),
  updateCourse: (id, data) => api.put(`/course/${id}`, data),
  deleteCourse: (id) => api.delete(`/course/${id}`),
  searchCourses: (query) => api.get(`/course/search?q=${query}`),
  getCoursesByCategory: (categoryId) => api.get(`/course/category/${categoryId}`),
  getRecommendedCourses: () => api.get('/course/recommended'),
};

// Category API calls
export const categoryAPI = {
  getAllCategories: () => api.get('/category'),
  getCategoryById: (id) => api.get(`/category/${id}`),
  createCategory: (data) => api.post('/category', data),
  updateCategory: (id, data) => api.put(`/category/${id}`, data),
  deleteCategory: (id) => api.delete(`/category/${id}`),
};

// Enrollment API calls
export const enrollmentAPI = {
  enrollInCourse: (courseId) => api.post('/enrolments', { course_id: courseId }),
  getUserEnrollments: () => api.get('/enrolments'),
  getEnrollmentById: (id) => api.get(`/enrolments/${id}`),
  updateProgress: (enrollmentId, progress) => api.put(`/enrolments/${enrollmentId}/progress`, { progress }),
  unenroll: (enrollmentId) => api.delete(`/enrolments/${enrollmentId}`),
};

// Module API calls
export const moduleAPI = {
  getCourseModules: (courseId) => api.get(`/modules/course/${courseId}`),
  getModuleById: (id) => api.get(`/modules/${id}`),
  createModule: (data) => api.post('/modules', data),
  updateModule: (id, data) => api.put(`/modules/${id}`, data),
  deleteModule: (id) => api.delete(`/modules/${id}`),
};

// Lesson API calls
export const lessonAPI = {
  getModuleLessons: (moduleId) => api.get(`/lessons/module/${moduleId}`),
  getLessonById: (id) => api.get(`/lessons/${id}`),
  createLesson: (data) => api.post('/lessons', data),
  updateLesson: (id, data) => api.put(`/lessons/${id}`, data),
  deleteLesson: (id) => api.delete(`/lessons/${id}`),
};

// Quiz API calls
export const quizAPI = {
  getModuleQuizzes: (moduleId) => api.get(`/quizzes/module/${moduleId}`),
  getQuizById: (id) => api.get(`/quizzes/${id}`),
  createQuiz: (data) => api.post('/quizzes', data),
  updateQuiz: (id, data) => api.put(`/quizzes/${id}`, data),
  deleteQuiz: (id) => api.delete(`/quizzes/${id}`),
  submitQuiz: (quizId, answers) => api.post(`/quizzes/${quizId}/submit`, { answers }),
};

// Assignment API calls
export const assignmentAPI = {
  getModuleAssignments: (moduleId) => api.get(`/assignments/module/${moduleId}`),
  getAssignmentById: (id) => api.get(`/assignments/${id}`),
  createAssignment: (data) => api.post('/assignments', data),
  updateAssignment: (id, data) => api.put(`/assignments/${id}`, data),
  deleteAssignment: (id) => api.delete(`/assignments/${id}`),
};

// Submissions API
export const submissionsAPI = {
  // Get submissions for an assignment
  getByAssignment: (assignmentId) => api.get(`/submissions/assignment/${assignmentId}`),
  
  // Get submissions by student
  getByStudent: (studentId) => api.get(`/submissions/student/${studentId}`),
  
  // Create submission
  create: (data) => api.post('/submissions', data),
  
  // Update submission
  update: (id, data) => api.put(`/submissions/${id}`, data),
  
  // Delete submission
  delete: (id) => api.delete(`/submissions/${id}`),
  
  // Grade submission
  grade: (id, data) => api.put(`/submissions/${id}/grade`, data)
};

// Upload API
export const uploadAPI = {
  // Upload image (profile pictures, course thumbnails)
  uploadImage: (file, type = 'course') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Upload document (assignments, course materials)
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Delete file from Cloudinary
  deleteFile: (publicId, resourceType = 'image') => {
    return api.delete('/upload/delete', {
      data: {
        public_id: publicId,
        resource_type: resourceType
      }
    });
  },
  
  // Get upload signature (for direct uploads)
  getSignature: (folder, transformation) => {
    return api.post('/upload/signature', {
      folder,
      transformation
    });
  }
};

export default api;

// Mock data for Evolve LMS

import meeeImage from '../assets/images/meeee.jpg';

export const mockUsers = {
  student: {
    id: 1,
    name: 'Mohannad Salameh',
    email: 'john.doe@example.com',
    role: 'student',
    avatar: meeeImage,
    joinDate: '2024-01-15',
    totalCourses: 5,
    completedCourses: 2,
    points: 1250,
  },
  instructor: {
    id: 2,
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?img=2',
    joinDate: '2023-08-10',
    coursesCreated: 8,
    totalStudents: 245,
    rating: 4.8,
  },
  admin: {
    id: 3,
    name: 'Admin User',
    email: 'admin@evolve.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joinDate: '2023-01-01',
  },
};

export const mockCourses = [
  {
    id: 1,
    title: 'Complete React Development Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
    instructor: 'Dr. Sarah Wilson',
    instructorId: 2,
    category: 'Programming',
    categoryId: 1,
    level: 'Intermediate',
    duration: '12 weeks',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.8,
    studentsEnrolled: 1250,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    modules: 8,
    lessons: 45,
    quizzes: 12,
    assignments: 6,
    isEnrolled: true,
    progress: 65,
    lastAccessed: '2024-01-20',
    certificate: true,
    featured: true,
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Learn Python programming with focus on data analysis, visualization, and machine learning.',
    instructor: 'Prof. Michael Chen',
    instructorId: 4,
    category: 'Data Science',
    categoryId: 2,
    level: 'Beginner',
    duration: '10 weeks',
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.6,
    studentsEnrolled: 890,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
    modules: 6,
    lessons: 38,
    quizzes: 10,
    assignments: 8,
    isEnrolled: true,
    progress: 30,
    lastAccessed: '2024-01-18',
    certificate: true,
    featured: false,
  },
  {
    id: 3,
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to digital marketing including SEO, social media, and content marketing.',
    instructor: 'Emma Rodriguez',
    instructorId: 5,
    category: 'Marketing',
    categoryId: 3,
    level: 'Intermediate',
    duration: '8 weeks',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.7,
    studentsEnrolled: 2100,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    tags: ['Marketing', 'SEO', 'Social Media', 'Content Marketing'],
    modules: 5,
    lessons: 32,
    quizzes: 8,
    assignments: 5,
    isEnrolled: false,
    progress: 0,
    lastAccessed: null,
    certificate: true,
    featured: true,
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design with hands-on projects.',
    instructor: 'Alex Thompson',
    instructorId: 6,
    category: 'Design',
    categoryId: 4,
    level: 'Beginner',
    duration: '6 weeks',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.9,
    studentsEnrolled: 1580,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
    modules: 4,
    lessons: 28,
    quizzes: 6,
    assignments: 4,
    isEnrolled: true,
    progress: 85,
    lastAccessed: '2024-01-21',
    certificate: true,
    featured: false,
  },
  {
    id: 5,
    title: 'Business Analytics with Excel',
    description: 'Master Excel for business analytics, data visualization, and reporting.',
    instructor: 'Dr. Lisa Park',
    instructorId: 7,
    category: 'Business',
    categoryId: 5,
    level: 'Intermediate',
    duration: '4 weeks',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    studentsEnrolled: 950,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    tags: ['Excel', 'Analytics', 'Business Intelligence', 'Data Visualization'],
    modules: 3,
    lessons: 24,
    quizzes: 5,
    assignments: 3,
    isEnrolled: true,
    progress: 45,
    lastAccessed: '2024-01-19',
    certificate: true,
    featured: false,
  },
  {
    id: 6,
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile applications using Flutter and Dart.',
    instructor: 'James Kumar',
    instructorId: 8,
    category: 'Programming',
    categoryId: 1,
    level: 'Advanced',
    duration: '14 weeks',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.7,
    studentsEnrolled: 680,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    tags: ['Flutter', 'Dart', 'Mobile Development', 'Cross-platform'],
    modules: 10,
    lessons: 52,
    quizzes: 15,
    assignments: 8,
    isEnrolled: false,
    progress: 0,
    lastAccessed: null,
    certificate: true,
    featured: true,
  },
];

export const mockCategories = [
  {
    id: 1,
    name: 'Programming',
    description: 'Learn various programming languages and frameworks',
    icon: 'Code',
    courseCount: 45,
    color: '#1976d2',
  },
  {
    id: 2,
    name: 'Data Science',
    description: 'Master data analysis, machine learning, and AI',
    icon: 'Analytics',
    courseCount: 28,
    color: '#388e3c',
  },
  {
    id: 3,
    name: 'Marketing',
    description: 'Digital marketing, SEO, and business growth',
    icon: 'TrendingUp',
    courseCount: 32,
    color: '#f57c00',
  },
  {
    id: 4,
    name: 'Design',
    description: 'UI/UX design, graphic design, and creative skills',
    icon: 'Palette',
    courseCount: 24,
    color: '#7b1fa2',
  },
  {
    id: 5,
    name: 'Business',
    description: 'Business management, finance, and entrepreneurship',
    icon: 'Business',
    courseCount: 38,
    color: '#d32f2f',
  },
  {
    id: 6,
    name: 'Photography',
    description: 'Photography techniques and photo editing',
    icon: 'CameraAlt',
    courseCount: 16,
    color: '#455a64',
  },
];

export const mockModules = [
  {
    id: 1,
    courseId: 1,
    title: 'Introduction to React',
    description: 'Getting started with React fundamentals',
    order: 1,
    duration: '2 hours',
    lessons: 6,
    isCompleted: true,
    isLocked: false,
  },
  {
    id: 2,
    courseId: 1,
    title: 'Components and Props',
    description: 'Understanding React components and props',
    order: 2,
    duration: '3 hours',
    lessons: 8,
    isCompleted: true,
    isLocked: false,
  },
  {
    id: 3,
    courseId: 1,
    title: 'State and Lifecycle',
    description: 'Managing component state and lifecycle methods',
    order: 3,
    duration: '2.5 hours',
    lessons: 7,
    isCompleted: false,
    isLocked: false,
  },
  {
    id: 4,
    courseId: 1,
    title: 'Hooks and Context',
    description: 'Modern React with hooks and context API',
    order: 4,
    duration: '4 hours',
    lessons: 10,
    isCompleted: false,
    isLocked: true,
  },
];

export const mockLessons = [
  {
    id: 1,
    moduleId: 1,
    title: 'What is React?',
    description: 'Introduction to React library and its benefits',
    type: 'video',
    duration: '15 min',
    order: 1,
    isCompleted: true,
    videoUrl: 'https://example.com/video1',
  },
  {
    id: 2,
    moduleId: 1,
    title: 'Setting up Development Environment',
    description: 'Installing Node.js, npm, and creating React app',
    type: 'video',
    duration: '20 min',
    order: 2,
    isCompleted: true,
    videoUrl: 'https://example.com/video2',
  },
  {
    id: 3,
    moduleId: 1,
    title: 'Your First React Component',
    description: 'Creating and rendering your first React component',
    type: 'video',
    duration: '18 min',
    order: 3,
    isCompleted: false,
    videoUrl: 'https://example.com/video3',
  },
];

export const mockQuizzes = [
  {
    id: 1,
    moduleId: 1,
    title: 'React Basics Quiz',
    description: 'Test your understanding of React fundamentals',
    questions: 10,
    timeLimit: 15,
    passingScore: 70,
    attempts: 3,
    userScore: 85,
    isCompleted: true,
  },
  {
    id: 2,
    moduleId: 2,
    title: 'Components and Props Quiz',
    description: 'Quiz on React components and props',
    questions: 8,
    timeLimit: 12,
    passingScore: 70,
    attempts: 3,
    userScore: null,
    isCompleted: false,
  },
];

export const mockAssignments = [
  {
    id: 1,
    courseId: 1,
    title: 'Build a Todo App',
    description: 'Create a fully functional todo application using React',
    dueDate: '2024-02-15',
    maxScore: 100,
    userScore: 92,
    status: 'graded',
    submittedAt: '2024-02-10',
    feedback: 'Excellent work! Clean code and good component structure.',
  },
  {
    id: 2,
    courseId: 1,
    title: 'Weather App with API',
    description: 'Build a weather application that fetches data from an API',
    dueDate: '2024-03-01',
    maxScore: 100,
    userScore: null,
    status: 'pending',
    submittedAt: null,
    feedback: null,
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: 'New Assignment Posted',
    message: 'Weather App assignment has been posted in React Development Course',
    type: 'assignment',
    isRead: false,
    createdAt: '2024-01-21T10:30:00Z',
  },
  {
    id: 2,
    title: 'Quiz Graded',
    message: 'Your React Basics Quiz has been graded. Score: 85/100',
    type: 'grade',
    isRead: true,
    createdAt: '2024-01-20T14:15:00Z',
  },
  {
    id: 3,
    title: 'Course Recommendation',
    message: 'Based on your progress, we recommend "Advanced React Patterns"',
    type: 'recommendation',
    isRead: false,
    createdAt: '2024-01-19T09:00:00Z',
  },
];

export const mockStats = {
  totalUsers: 15420,
  totalCourses: 245,
  totalEnrollments: 45680,
  activeUsers: 8920,
  completionRate: 78,
  averageRating: 4.6,
  monthlyGrowth: 12.5,
  revenueThisMonth: 125000,
};

export const mockQuotes = [
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
];

export const mockTodos = [
  {
    id: 1,
    text: 'Complete React Hooks lesson',
    completed: false,
    priority: 'high',
  },
  {
    id: 2,
    text: 'Submit Weather App assignment',
    completed: false,
    priority: 'medium',
  },
  {
    id: 3,
    text: 'Review Python basics',
    completed: true,
    priority: 'low',
  },
];
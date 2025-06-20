import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import TextRotator from "../../components/ui/TextRotator/TextRotator";
import CourseCards from '../../components/ui/Courses/ViewCourses';

function MainStudent() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
                minHeight: '100vh'
            }}>
                <TextRotator />
                <CourseCards />
            </Box>
        </Layout>
    );
}

export default MainStudent;

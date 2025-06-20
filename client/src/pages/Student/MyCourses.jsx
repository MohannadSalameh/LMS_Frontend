import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import EnrolledCourses from "../../components/ui/enrollments/EnrolledCourse";

export default function MyCourses() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                minHeight: '100vh'
            }}>
                <EnrolledCourses />
            </Box>
        </Layout>
    );
}
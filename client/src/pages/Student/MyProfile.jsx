import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import StudentProfile from "../../components/ui/Profile/StudentProfile";

function MyProfile() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                minHeight: '100vh'
            }}>
                <StudentProfile isOwnProfile={true} />
            </Box>
        </Layout>
    );
}

export default MyProfile;
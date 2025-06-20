import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import StudentSettings from '../../components/ui/Settings/StudentSettings';

function SettingsPage() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                minHeight: '100vh'
            }}>
                <StudentSettings />
            </Box>
        </Layout>
    );
}

export default SettingsPage;

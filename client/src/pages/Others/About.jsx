import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import About from '../../components/ui/Others/About';

function AboutUs() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                minHeight: '100vh'
            }}>
                <About />
            </Box>
        </Layout>
    );
}

export default AboutUs;

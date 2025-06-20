import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/layout/Layout';
import Contact from '../../components/ui/Others/Contact';

function ContactUs() {
    return (
        <Layout>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                minHeight: '100vh'
            }}>
                <Contact />
            </Box>
        </Layout>
    );
}

export default ContactUs;

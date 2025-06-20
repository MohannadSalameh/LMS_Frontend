import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert
} from '@mui/material';
import FileUpload from '../common/FileUpload';

const CourseUploadExample = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    materials: []
  });
  const [message, setMessage] = useState(null);

  const handleThumbnailUpload = (uploadResult) => {
    setCourseData(prev => ({
      ...prev,
      thumbnail: uploadResult
    }));
    setMessage({
      type: 'success',
      text: 'Course thumbnail uploaded successfully!'
    });
  };

  const handleMaterialsUpload = (uploadResults) => {
    setCourseData(prev => ({
      ...prev,
      materials: [...prev.materials, ...uploadResults]
    }));
    setMessage({
      type: 'success',
      text: `${uploadResults.length} course material(s) uploaded successfully!`
    });
  };

  const handleUploadError = (error) => {
    setMessage({
      type: 'error',
      text: error.message || 'Upload failed'
    });
  };

  const handleSubmit = () => {
    // Here you would typically send the course data to your API
    console.log('Course data to submit:', courseData);
    setMessage({
      type: 'info',
      text: 'Course data logged to console (check developer tools)'
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Course Upload Example
      </Typography>
      
      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 3 }}
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Course Basic Info */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Information
              </Typography>
              
              <TextField
                fullWidth
                label="Course Title"
                value={courseData.title}
                onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                margin="normal"
              />
              
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Course Description"
                value={courseData.description}
                onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Course Thumbnail Upload */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Thumbnail
              </Typography>
              
              <FileUpload
                onUploadSuccess={handleThumbnailUpload}
                onUploadError={handleUploadError}
                acceptedTypes="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                uploadType="image"
                multiple={false}
                label="Upload Thumbnail"
                description="Upload a course thumbnail image"
              />
              
              {courseData.thumbnail && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Current thumbnail: {courseData.thumbnail.originalName}
                  </Typography>
                  <img 
                    src={courseData.thumbnail.url} 
                    alt="Course thumbnail" 
                    style={{ 
                      width: '100%', 
                      maxWidth: 200, 
                      height: 'auto', 
                      marginTop: 8,
                      borderRadius: 8
                    }} 
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Course Materials Upload */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Materials
              </Typography>
              
              <FileUpload
                onUploadSuccess={handleMaterialsUpload}
                onUploadError={handleUploadError}
                acceptedTypes=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                maxSize={10 * 1024 * 1024} // 10MB
                uploadType="document"
                multiple={true}
                label="Upload Materials"
                description="Upload course materials (PDF, Word, PowerPoint, etc.)"
              />
              
              {courseData.materials.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Uploaded materials ({courseData.materials.length}):
                  </Typography>
                  {courseData.materials.map((material, index) => (
                    <Typography key={index} variant="caption" display="block">
                      • {material.originalName}
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleSubmit}
              disabled={!courseData.title || !courseData.description}
            >
              Create Course
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseUploadExample;
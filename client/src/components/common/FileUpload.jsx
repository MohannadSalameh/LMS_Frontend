import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  Image,
  Description,
  CheckCircle
} from '@mui/icons-material';
import { uploadAPI } from '../../services/api';

const FileUpload = ({
  onUploadSuccess,
  onUploadError,
  acceptedTypes = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  uploadType = 'image', // 'image' or 'document'
  multiple = false,
  disabled = false,
  label = 'Upload File',
  description = 'Click to select or drag and drop'
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxSize) {
      throw new Error(`File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`);
    }

    // Check file type
    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
    const isValidType = acceptedTypesArray.some(type => {
      if (type === 'image/*') return file.type.startsWith('image/');
      if (type === 'application/*') return file.type.startsWith('application/');
      return file.type === type;
    });

    if (!isValidType) {
      throw new Error(`File type ${file.type} is not supported`);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFiles = async (files) => {
    if (disabled) return;

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const filesToUpload = multiple ? files : [files[0]];
      const uploadPromises = filesToUpload.map(async (file, index) => {
        validateFile(file);

        let response;
        if (uploadType === 'image') {
          response = await uploadAPI.uploadImage(file, 'course');
        } else {
          response = await uploadAPI.uploadDocument(file);
        }

        // Simulate progress for better UX
        const progressIncrement = 100 / filesToUpload.length;
        setUploadProgress(prev => prev + progressIncrement);

        return {
          ...response.data.data,
          originalName: file.name,
          size: file.size,
          type: file.type
        };
      });

      const results = await Promise.all(uploadPromises);
      setUploadedFiles(prev => multiple ? [...prev, ...results] : results);
      
      if (onUploadSuccess) {
        onUploadSuccess(multiple ? results : results[0]);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Upload failed');
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = async (fileToRemove, index) => {
    try {
      // Delete from Cloudinary
      await uploadAPI.deleteFile(fileToRemove.public_id, uploadType);
      
      // Remove from local state
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete file');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      {/* Upload Area */}
      <Card
        sx={{
          border: '2px dashed',
          borderColor: uploading ? 'primary.main' : 'grey.300',
          backgroundColor: uploading ? 'action.hover' : 'background.paper',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: disabled ? 'grey.300' : 'primary.main',
            backgroundColor: disabled ? 'background.paper' : 'action.hover'
          }
        }}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB
          </Typography>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            multiple={multiple}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            disabled={disabled}
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Uploading... {Math.round(uploadProgress)}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Uploaded Files:
          </Typography>
          {uploadedFiles.map((file, index) => (
            <Card key={index} sx={{ mb: 1 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                {uploadType === 'image' ? (
                  <Image sx={{ mr: 2, color: 'primary.main' }} />
                ) : (
                  <Description sx={{ mr: 2, color: 'primary.main' }} />
                )}
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" noWrap>
                    {file.originalName || 'Uploaded file'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                </Box>
                
                <Chip
                  icon={<CheckCircle />}
                  label="Uploaded"
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                />
                
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(file, index)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
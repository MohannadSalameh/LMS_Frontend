import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Alert,
  Chip,
  Paper,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Assignment,
  CloudUpload,
  Download,
  CheckCircle,
  Schedule,
  Warning,
  ExpandMore,
  Delete,
  Visibility,
  Send,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../common/FileUpload';

const AssignmentComponent = ({ assignmentData, onAssignmentSubmit, courseId, moduleId }) => {
  const navigate = useNavigate();
  const [textSubmission, setTextSubmission] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmission();
  }, [assignmentData.id]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/assignments/${assignmentData.id}/submission`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmission(data.submission);
        if (data.submission) {
          setTextSubmission(data.submission.textContent || '');
          setUploadedFiles(data.submission.files || []);
        }
      } else if (response.status !== 404) {
        throw new Error('Failed to fetch submission');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileIndex) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const handleSubmit = async () => {
    if (!textSubmission.trim() && uploadedFiles.length === 0) {
      setError('Please provide either text content or upload files for your submission.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        assignmentId: assignmentData.id,
        courseId,
        moduleId,
        textContent: textSubmission,
        files: uploadedFiles
      };

      const response = await fetch('/api/assignments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        setSubmission(result.submission);
        setShowSubmitDialog(false);
        if (onAssignmentSubmit) {
          onAssignmentSubmit(result);
        }
      } else {
        throw new Error('Failed to submit assignment');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDue = () => {
    if (!assignmentData.dueDate) return null;
    const now = new Date();
    const dueDate = new Date(assignmentData.dueDate);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusChip = () => {
    if (!submission) {
      const daysUntilDue = getDaysUntilDue();
      if (daysUntilDue < 0) {
        return <Chip label="Overdue" color="error" icon={<Warning />} />;
      } else if (daysUntilDue <= 1) {
        return <Chip label="Due Soon" color="warning" icon={<Schedule />} />;
      } else {
        return <Chip label="Not Submitted" color="default" icon={<Assignment />} />;
      }
    }

    switch (submission.status) {
      case 'submitted':
        return <Chip label="Submitted" color="success" icon={<CheckCircle />} />;
      case 'graded':
        return <Chip label="Graded" color="primary" icon={<CheckCircle />} />;
      case 'late':
        return <Chip label="Late Submission" color="warning" icon={<Warning />} />;
      default:
        return <Chip label="Draft" color="default" />;
    }
  };

  const renderGradingInfo = () => {
    if (!submission || !submission.grade) return null;

    return (
      <Card sx={{ mt: 3, bgcolor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Grading Information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h4" color="primary.main">
              {submission.grade.score}/{submission.grade.maxScore}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({Math.round((submission.grade.score / submission.grade.maxScore) * 100)}%)
            </Typography>
          </Box>
          
          {submission.grade.feedback && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Instructor Feedback:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="body2">
                  {submission.grade.feedback}
                </Typography>
              </Paper>
            </Box>
          )}
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Graded on: {formatDate(submission.grade.gradedAt)}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const renderSubmissionHistory = () => {
    if (!submission || !submission.history) return null;

    return (
      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Submission History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {submission.history.map((entry, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={`Submission ${index + 1}`}
                  secondary={`Submitted on: ${formatDate(entry.submittedAt)}`}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <LinearProgress sx={{ width: '100%' }} />
      </Box>
    );
  }

  if (!assignmentData) {
    return (
      <Alert severity="error">
        Assignment data not found.
      </Alert>
    );
  }

  const isOverdue = getDaysUntilDue() < 0;
  const canSubmit = !submission || (submission.status === 'draft' && !isOverdue);

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Assignment Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              {assignmentData.title}
            </Typography>
            {getStatusChip()}
          </Box>
          
          <Typography variant="body1" paragraph>
            {assignmentData.description}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {assignmentData.dueDate && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Due Date
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {formatDate(assignmentData.dueDate)}
                </Typography>
              </Box>
            )}
            
            <Box>
              <Typography variant="caption" color="text.secondary">
                Max Score
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {assignmentData.maxScore} points
              </Typography>
            </Box>
            
            {assignmentData.allowedFileTypes && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Allowed File Types
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {assignmentData.allowedFileTypes.join(', ')}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Assignment Instructions */}
      {assignmentData.instructions && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {assignmentData.instructions}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Assignment Resources */}
      {assignmentData.resources && assignmentData.resources.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <List>
              {assignmentData.resources.map((resource, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Download />
                  </ListItemIcon>
                  <ListItemText
                    primary={resource.name}
                    secondary={resource.description}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Download />}
                    href={resource.url}
                    target="_blank"
                  >
                    Download
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Submission Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Submission
          </Typography>
          
          {submission && submission.status === 'submitted' ? (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                Your assignment has been submitted successfully!
              </Alert>
              
              {submission.textContent && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Text Submission:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {submission.textContent}
                    </Typography>
                  </Paper>
                </Box>
              )}
              
              {submission.files && submission.files.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <List>
                    {submission.files.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Visibility />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Download />}
                          href={file.url}
                          target="_blank"
                        >
                          View
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              
              <Typography variant="caption" color="text.secondary">
                Submitted on: {formatDate(submission.submittedAt)}
              </Typography>
            </Box>
          ) : (
            <Box>
              {isOverdue && !submission && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  This assignment is overdue. You can no longer submit.
                </Alert>
              )}
              
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Text Submission"
                value={textSubmission}
                onChange={(e) => setTextSubmission(e.target.value)}
                placeholder="Enter your assignment response here..."
                disabled={!canSubmit}
                sx={{ mb: 3 }}
              />
              
              {canSubmit && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Upload Files (Optional)
                  </Typography>
                  <FileUpload
                    onUpload={handleFileUpload}
                    acceptedTypes={assignmentData.allowedFileTypes}
                    maxSize={10} // 10MB
                    multiple
                  />
                </Box>
              )}
              
              {uploadedFiles.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uploaded Files:
                  </Typography>
                  <List>
                    {uploadedFiles.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CloudUpload />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                        />
                        {canSubmit && (
                          <IconButton
                            edge="end"
                            onClick={() => handleFileRemove(index)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              
              {canSubmit && (
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={() => setShowSubmitDialog(true)}
                  disabled={!textSubmission.trim() && uploadedFiles.length === 0}
                >
                  Submit Assignment
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Grading Information */}
      {renderGradingInfo()}

      {/* Submission History */}
      {renderSubmissionHistory()}

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <DialogTitle>Submit Assignment?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your assignment? You won't be able to make changes after submission.
          </Typography>
          {assignmentData.dueDate && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Due: {formatDate(assignmentData.dueDate)}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/courses/${courseId}/modules`)}
        >
          Back to Course
        </Button>
      </Box>
    </Box>
  );
};

export default AssignmentComponent;
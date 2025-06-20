import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  TextField,
  LinearProgress,
  Alert,
  Chip,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Timer,
  NavigateNext,
  NavigateBefore,
  Flag,
  Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuizComponent = ({ quizData, onQuizComplete, courseId, moduleId }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Initialize timer when quiz starts
  useEffect(() => {
    if (quizStarted && quizData.timeLimit && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, timeRemaining]);

  const startQuiz = () => {
    setQuizStarted(true);
    if (quizData.timeLimit) {
      setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleMultipleAnswerChange = (questionId, optionId, checked) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionId]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(id => id !== optionId)
        };
      }
    });
  };

  const toggleFlag = (questionIndex) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'multiple-choice') {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      } else if (question.type === 'multiple-select') {
        const correctSet = new Set(question.correctAnswers);
        const userSet = new Set(userAnswer || []);
        if (correctSet.size === userSet.size && 
            [...correctSet].every(x => userSet.has(x))) {
          correctAnswers++;
        }
      } else if (question.type === 'text') {
        if (userAnswer && 
            userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
          correctAnswers++;
        }
      }
    });
    return (correctAnswers / quizData.questions.length) * 100;
  };

  const handleSubmitQuiz = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    setShowResults(true);

    // Submit to backend
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quizId: quizData.id,
          courseId,
          moduleId,
          answers,
          score: finalScore,
          timeSpent: quizData.timeLimit ? (quizData.timeLimit * 60 - timeRemaining) : null
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (onQuizComplete) {
          onQuizComplete(result);
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getQuestionIcon = (questionIndex) => {
    const question = quizData.questions[questionIndex];
    const hasAnswer = answers[question.id] !== undefined && answers[question.id] !== '';
    
    if (hasAnswer) {
      return <CheckCircle color="success" />;
    }
    return <Cancel color="error" />;
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              {question.question}
            </FormLabel>
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'multiple-select':
        return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              {question.question}
            </FormLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select all that apply
            </Typography>
            <FormGroup>
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={(answers[question.id] || []).includes(option.id)}
                      onChange={(e) => handleMultipleAnswerChange(question.id, option.id, e.target.checked)}
                    />
                  }
                  label={option.text}
                  sx={{ mb: 1 }}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      case 'text':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {question.question}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Type your answer here..."
              variant="outlined"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    return (
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Quiz Results
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h3" color={score >= 70 ? 'success.main' : 'error.main'}>
              {Math.round(score)}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {score >= 70 ? 'Congratulations! You passed!' : 'You need 70% to pass. Try again!'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Question Review
          </Typography>
          
          {quizData.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            let isCorrect = false;
            
            if (question.type === 'multiple-choice') {
              isCorrect = userAnswer === question.correctAnswer;
            } else if (question.type === 'multiple-select') {
              const correctSet = new Set(question.correctAnswers);
              const userSet = new Set(userAnswer || []);
              isCorrect = correctSet.size === userSet.size && 
                         [...correctSet].every(x => userSet.has(x));
            } else if (question.type === 'text') {
              isCorrect = userAnswer && 
                         userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
            }
            
            return (
              <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    Question {index + 1}
                  </Typography>
                  <Chip 
                    icon={isCorrect ? <CheckCircle /> : <Cancel />}
                    label={isCorrect ? 'Correct' : 'Incorrect'}
                    color={isCorrect ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {question.question}
                </Typography>
                {question.explanation && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <strong>Explanation:</strong> {question.explanation}
                  </Alert>
                )}
              </Paper>
            );
          })}
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
            {score < 70 && (
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={() => {
                  setQuizStarted(false);
                  setQuizCompleted(false);
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setFlaggedQuestions(new Set());
                  setScore(0);
                }}
              >
                Retake Quiz
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => navigate(`/courses/${courseId}/modules`)}
            >
              Back to Course
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (!quizData) {
    return (
      <Alert severity="error">
        Quiz data not found.
      </Alert>
    );
  }

  if (!quizStarted) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {quizData.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {quizData.description}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              • {quizData.questions.length} questions
            </Typography>
            {quizData.timeLimit && (
              <Typography variant="body2" color="text.secondary">
                • Time limit: {quizData.timeLimit} minutes
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              • Passing score: 70%
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            onClick={startQuiz}
            startIcon={<Timer />}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    return renderResults();
  }

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {quizData.title}
          </Typography>
          {timeRemaining !== null && (
            <Chip
              icon={<Timer />}
              label={formatTime(timeRemaining)}
              color={timeRemaining < 300 ? 'error' : 'primary'}
              variant="outlined"
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2">
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Paper>

      {/* Question */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Question {currentQuestion + 1}
            </Typography>
            <IconButton
              onClick={() => toggleFlag(currentQuestion)}
              color={flaggedQuestions.has(currentQuestion) ? 'warning' : 'default'}
            >
              <Flag />
            </IconButton>
          </Box>
          
          {renderQuestion(currentQ)}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {quizData.questions.map((_, index) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => setCurrentQuestion(index)}
              sx={{
                bgcolor: index === currentQuestion ? 'primary.main' : 'transparent',
                color: index === currentQuestion ? 'white' : 'inherit',
                border: flaggedQuestions.has(index) ? '2px solid orange' : '1px solid #ddd'
              }}
            >
              {getQuestionIcon(index)}
            </IconButton>
          ))}
        </Box>
        
        {currentQuestion === quizData.questions.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowConfirmDialog(true)}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="outlined"
            endIcon={<NavigateNext />}
            onClick={() => setCurrentQuestion(prev => Math.min(quizData.questions.length - 1, prev + 1))}
          >
            Next
          </Button>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Submit Quiz?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
          </Typography>
          {flaggedQuestions.size > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              You have {flaggedQuestions.size} flagged question(s) that you may want to review.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitQuiz} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizComponent;
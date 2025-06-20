import React from 'react';
import styles from './ContinueCourseButton.module.css';
import { useNavigate } from 'react-router-dom';

function ContinueCourseButton({ courseId }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent triggering parent card click
        navigate(`/courses/${courseId}/learn`);
    };

    return (
        <button className={styles.continueButton} onClick={handleClick}>
            Continue
        </button>
    );
}

export default ContinueCourseButton;


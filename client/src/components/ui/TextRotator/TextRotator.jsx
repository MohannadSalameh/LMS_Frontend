import { useState, useEffect } from 'react';
import styles from './TextRotator.module.css';

const TextRotator = () => {
    const messages = [
        "Explore new courses to expand your knowledge.",
        "Special offer: Enroll in 2 courses get 1 free.",
        "Upcoming deadline: Assignment due Friday.",
        "Check out our new programming courses.",
        "Student meetup this Saturday - Register now."
    ];

    const [text, setText] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentMessage = messages[messageIndex];
        let typeSpeed = isDeleting ? 30 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setText(currentMessage.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else {
                setText(currentMessage.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }

            if (!isDeleting && charIndex === currentMessage.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setMessageIndex((prev) => (prev + 1) % messages.length);
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, messageIndex]);

    return (
        <div className={styles.hero}>
            <div className={styles.overlay}>
                <h1 className={styles.heading}>The All-in-One Educational</h1>
                <div className={styles.subtitle}>
                    {text}
                    <span className={styles.cursor}>|</span>
                </div>
            </div>
        </div>
    );

};

export default TextRotator;

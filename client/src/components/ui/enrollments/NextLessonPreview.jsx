import React from 'react';
import { useDashboardData } from '../../../contexts/useDashboardData';

function NextLessonPreview() {
    const { enrollments } = useDashboardData();

    const getNextLesson = () => {
        const lessons = [];

        enrollments.forEach(enrollment => {
            enrollment.course?.modules?.forEach(module => {
                module.lessons?.forEach(lesson => {
                    if (lesson.date || lesson.createdAt) {
                        lessons.push({
                            ...lesson,
                            courseTitle: enrollment.course.title,
                            moduleTitle: module.title,
                            date: new Date(lesson.date || lesson.createdAt)
                        });
                    }
                });
            });
        });

        // Sort all lessons by date ascending
        const upcoming = lessons
            .filter(lesson => lesson.date > new Date())
            .sort((a, b) => a.date - b.date);

        return upcoming[0] || null;
    };

    const nextLesson = getNextLesson();

    if (!nextLesson) return <p>No upcoming lessons found 📭</p>;

    return (
        <div style={{
            background: "#f1f8ff",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
            boxShadow: "0 0 6px rgba(0,0,0,0.1)"
        }}>
            <h3>📅 Next Lesson Preview</h3>
            <p><strong>Course:</strong> {nextLesson.courseTitle}</p>
            <p><strong>Module:</strong> {nextLesson.moduleTitle}</p>
            <p><strong>Lesson:</strong> {nextLesson.title}</p>
            <p><strong>Date:</strong> {nextLesson.date.toLocaleString()}</p>
        </div>
    );
}

export default NextLessonPreview;

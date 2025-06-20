import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EnrollCourse.module.css';
import UnenrollButton from './UnEnrollButton.jsx';
import ContinueCourseButton from './ContinueCourseButton.jsx';

function EnrolledCourses() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch enrolled courses using useCallback to prevent re-creation
    const fetchEnrolledCourses = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/enrollments/my-courses", {
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();
            const rawData = json.result || json.data || json;

            if (!Array.isArray(rawData)) throw new Error("Invalid API response structure");

            const validatedData = rawData.map(item => ({
                course: {
                    _id: item.course._id || item.course.id,
                    title: item.course.title,
                    thumbnail: item.course.thumbnail || "/default-course.jpg",
                    instructor: item.course.instructor?.name || item.course.instructor_name || "Unknown Instructor"
                },
                enrollmentDate: item.enrollmentDate || item.enrollment_date,
                progress: item.progress || 0,
            }));

            setEnrollments(validatedData);
        } catch (err) {
            console.error("Enrollment fetch failed:", err.message);
            if (err.response?.status === 401) {
                navigate('/login');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Initial fetch
    useEffect(() => {
        fetchEnrolledCourses();
    }, [fetchEnrolledCourses]);

    // UI Rendering
    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h2>My Enrolled Courses</h2>

            {enrollments.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No enrolled courses found</p>
                    <button onClick={() => navigate('/courses')}>Browse Courses</button>
                </div>
            ) : (
                <div className={styles.coursesGrid}>
                    {enrollments.map((enrollment) => (
                        <div key={enrollment.course._id} className={styles.courseCard}>
                            <div className={styles.courseInfo}>
                                <h3>{enrollment.course.title}</h3>
                                <p>{enrollment.course.instructor}</p>
                                <p>Progress: {enrollment.progress}%</p>

                                <div className={styles.buttonGroup}>
                                    <ContinueCourseButton courseId={enrollment.course._id} />
                                    <UnenrollButton
                                        courseId={enrollment.course._id}
                                        onUnenrollSuccess={fetchEnrolledCourses}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EnrolledCourses;

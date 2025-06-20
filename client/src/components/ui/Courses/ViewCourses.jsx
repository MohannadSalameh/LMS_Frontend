import { useCourses } from '../../../hooks/course/useCourses';
import style from "./ViewCourses.module.css";
import card from "../../../assets/images/card1.jpg";
import ErrorBoundary from '../errors/ErrorBoundary';
import { useNavigate } from 'react-router-dom';

function CourseCards() {
    const { courses, loading, error } = useCourses();
    const navigate = useNavigate();

    const handleEnroll = (courseId) => {
        navigate(`/course/${courseId}`);
    };


    if (loading) return <div className={style.loading}>Loading courses...</div>;
    if (error) return <div className={style.error}>Error: {error}</div>;
    if (!courses?.length) return <div className={style.empty}>No courses found</div>;

    return (
        <ErrorBoundary>
            <div className={style.cards_container}>
                {courses.map((course) => (
                    <div className={style.card} key={course.id}>
                        <div
                            className={style.clickable}
                            onClick={() => navigate(`/course/${course.id}`)}
                        >
                            <img
                                src={course.thumbnail_url || card}
                                alt={course.title}
                                className={style.logo}
                                onError={(e) => {
                                    e.target.src = card;
                                }}
                            />
                            <div className={style.card_body}>
                                <h3>{course.title}</h3>
                                <p><strong>Instructor:</strong> {course.instructor_name || 'Unknown'}</p>
                                <p><strong>Category:</strong> {course.category_name || 'Uncategorized'}</p>
                                <p className={style.description}>
                                    {course.description
                                        ? (course.description.length > 100
                                            ? `${course.description.substring(0, 100)}...`
                                            : course.description)
                                        : 'No description available'}
                                </p>
                            </div>
                        </div>
                        <button
                            className={style.enrollButton}
                            onClick={() => handleEnroll(course.id)}
                        >
                            Enroll
                        </button>
                    </div>
                ))}
            </div>
        </ErrorBoundary>
    );
}

export default CourseCards;

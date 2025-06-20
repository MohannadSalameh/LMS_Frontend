import React, { useEffect, useState } from 'react';
import './Recommended.css'; // Create this for styling
import card from "../../../assets/images/card1.jpg";
function Recommended() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/course/recommended', { credentials: 'include' });
                const text = await res.json();
                console.log("Raw response:", text);

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }
                setCourses(text.courses || []);
                
            } catch (err) {
                console.error("Failed to fetch recommended courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);


    if (loading) return <p className="loading">Loading recommended courses...</p>;

    return (
        <div className="recommended-container">
            <h2 className="recommended-title">🎯 Recommended For You</h2>
            <div className="recommended-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <img src={course.thumbnail_url || card} alt={course.title} />
                        <h3>{course.title}</h3>
                        <p>{course.description?.slice(0, 80)}...</p>
                        <a href={`/course/${course.id}`} className="btn-view">View Course</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended;

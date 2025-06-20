import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModuleItem from './ModuleItem.jsx';
import api from '../../../services/api';
import styles from './CourseModules.module.css';

function CourseModules() {
    const { courseId } = useParams();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await api.get(`/courses/${courseId}/modules`, {
                    withCredentials: true,
                });

                // Correct field extraction based on your API response
                if (Array.isArray(response.data.data)) {
                    setModules(response.data.data);
                } else {
                    throw new Error(`Unexpected modules format: ${JSON.stringify(response.data)}`);
                }
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [courseId]);

    return (
        <>
            <div className={styles.container}>
                <h2>Course Modules</h2>
                {loading && <p>Loading modules...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {!loading && !error && modules.length === 0 && (
                    <p>No modules found for this course.</p>
                )}
                <div className={styles.moduleList}>
                    {modules.map((module) => (
                        <ModuleItem key={module.course_id} module={module} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CourseModules;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarModules.module.css';

const SidebarModules = ({ modules }) => {
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    const navigate = useNavigate();

    const toggleModule = (moduleId) => {
        setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
    };

    const handleLessonClick = (lessonId) => {
        navigate(`/lessons/${lessonId}`);
    };

    return (
        <div className={styles.sidebarContainer}>
            <h2 className={styles.sidebarTitle}>Course Modules</h2>
            <div className={styles.modulesList}>
                {modules.map((module) => (
                    <div key={module.id} className={styles.moduleContainer}>
                        <div
                            className={`${styles.moduleHeader} ${expandedModuleId === module.id ? styles.active : ''}`}
                            onClick={() => toggleModule(module.id)}
                        >
                            <span className={styles.moduleName}>{module.title}</span>
                            <span className={styles.moduleToggle}>
                                {expandedModuleId === module.id ? '▼' : '►'}
                            </span>
                        </div>

                        {expandedModuleId === module.id && (
                            <div className={styles.lessonsContainer}>
                                {module.lessons?.length > 0 ? (
                                    module.lessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className={styles.lessonItem}
                                            onClick={() => handleLessonClick(lesson.id)}
                                        >
                                            {lesson.title}
                                            {lesson.duration && (
                                                <span className={styles.lessonDuration}>{lesson.duration}</span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noLessons}>No lessons available</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarModules;
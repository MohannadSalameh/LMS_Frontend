
// components/modules/ModuleItem.jsx
import React from 'react';
import styles from './ModuleItem.module.css';

const ModuleItem = ({ module, onClick }) => {
    return (
        <div className={styles.moduleCard} onClick={onClick}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            {module.progress !== undefined && (
                <div className={styles.progressContainer}>
                    <label>Progress: {module.progress}%</label>
                    <div className={styles.progressBar}>
                        
                        <div
                            className={styles.progress}
                            style={{ width: `${module.progress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModuleItem;

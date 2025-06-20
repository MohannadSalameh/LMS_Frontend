// components/modules/ModuleList.jsx
import React from 'react';
import ModuleItem from './ModuleItem.jsx';
import styles from './ModuleList.module.css';

const ModuleList = ({ modules, onModuleClick }) => {
    if (!modules || modules.length === 0) {
        return <p className={styles.empty}>No modules found.</p>;
    }

    return (
        <div className={styles.moduleList}>
            {modules.map((module) => (
                <ModuleItem
                    key={module.id}
                    module={module}
                    onClick={() => onModuleClick(module.id)}
                />
            ))}
        </div>
    );
};

export default ModuleList;

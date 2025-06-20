import React from "react";
import styles from "./EnrollButton.module.css";

function EnrollButton({ courseId }) {
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);

    async function handleEnroll() {
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`/api/courses/${courseId}/enroll`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message || "Enrolled successfully");
            } else {
                setMessage(data.message || "Enrollment failed");
            }
        } catch (error) {
            setMessage("Network error");
            console.error("Enroll error:", error);
        }
        setLoading(false);
    }

    // Determine message type class based on content
    const messageTypeClass =
        message?.toLowerCase().includes("success")
            ? styles.success
            : message?.toLowerCase().includes("fail") || message?.toLowerCase().includes("error")
                ? styles.error
                : styles.info;

    return (
        <div className={styles.container}>
            <button
                className={styles.enrollBtn}
                onClick={handleEnroll}
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? "Enrolling..." : "Enroll"}
            </button>
            {message && (
                <div role="alert" aria-live="polite" className={`${styles.message} ${messageTypeClass}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default EnrollButton;

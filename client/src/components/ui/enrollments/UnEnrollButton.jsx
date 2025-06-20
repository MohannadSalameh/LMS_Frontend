import React, { useState } from "react";
import style from "./UnenrollButton.module.css";

function UnenrollButton({ courseId, onUnenrollSuccess }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    async function handleUnenroll() {
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`/api/courses/${courseId}/enroll`, {
                method: "DELETE",
                credentials: "include", // send cookies if required
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message || "Successfully unenrolled");
                onUnenrollSuccess?.(); 
            } else {
                setMessage(data.message || "Unenrollment failed");
            }
        } catch (error) {
            setMessage("Network error");
            console.error("Unenroll error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button className={style.unenrollBtn} onClick={handleUnenroll} disabled={loading}>
                {loading ? "Unenrolling..." : "Unenroll"}
            </button>
            {message && (
                <p className={`${style.message} 
          ${message.toLowerCase().includes("success") ? style.success :
                        message.toLowerCase().includes("fail") || message.toLowerCase().includes("error") ? style.error :
                            style.info}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default UnenrollButton;

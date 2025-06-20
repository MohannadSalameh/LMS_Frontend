import { useEffect, useState } from "react";
import style from "./ViewCategories.module.css";
import { useNavigate } from "react-router-dom";

function ViewCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load categories");

                setCategories(data.data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    if (loading) return <div className={style.loading}>Loading categories...</div>;
    if (error) return <div className={style.error}>Error: {error}</div>;

    return (
        <section className={style.categorySection}>
            <h2 className={style.categoryHeader}>Explore by Category</h2>
            <div className={style.grid}>
                {categories.map((cat) => (
                    <div
                        className={style.card}
                        key={cat.id}
                        onClick={() => navigate(`/categories/${cat.id}`)}
                    >
                        <h3>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ViewCategories;

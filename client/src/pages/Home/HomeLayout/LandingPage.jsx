import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import CourseCards from "../../../components/ui/Courses/ViewCourses";
import ViewCategories from "../../../components/ui/Categories/ViewCategories";
export default function LandingPage() {
    return (
        <main className={style.landingPage}>
            {/* Hero Section */}
            <section className={style.hero}>
                <h1>Empower Your Learning Journey with Evolve</h1>
                <p>Explore top-rated courses and learn at your own pace with expert instructors.</p>
                <div className={style.heroButtons}>
                    <Link to="/courses" className={style.primaryBtn}>Discover Courses</Link>
                    <Link to="/register" className={style.secondaryBtn}>Join for Free</Link>
                </div>
            </section>

            {/* Featured Courses */}
            <section className={style.featuredCourses}>
                <h2>Explore Courses</h2>
                <div className={style.courseGrid}>
                    <CourseCards />
                </div>
            </section>

            {/* How It Works */}
            <section className={style.howItWorks}>
                <h2>How Evolve Works</h2>
                <div className={style.steps}>
                    <div className={style.step}><span>📝</span><p>Sign Up</p></div>
                    <div className={style.step}><span>🔍</span><p>Browse Courses</p></div>
                    <div className={style.step}><span>🎓</span><p>Start Learning</p></div>
                    <div className={style.step}><span>📜</span><p>Earn Certificates</p></div>
                </div>
            </section>

            {/* Testimonials */}
            <section className={style.testimonials}>
                <h2>What Our Students Say</h2>
                <div className={style.testimonialGrid}>
                    <div className={style.testimonial}>
                        <img className={style.avatar} src="https://i.pravatar.cc/80?img=15" alt="Amina" />
                        <p>"Evolve gave me the confidence and skills to switch careers. The instructors are amazing!"</p>
                        <h4>Amina</h4>
                        <small>🗓️ Joined: Jan 2024 • 👍 134 likes</small>
                        <p className={style.rating}>⭐⭐⭐⭐⭐</p>
                        <span className={style.badge}>Career Switcher</span>
                    </div>
                    <div className={style.testimonial}>
                        <img className={style.avatar} src="https://i.pravatar.cc/80?img=23" alt="Yousef" />
                        <p>“The courses are practical and the platform is very easy to use. I highly recommend it.”</p>
                        <h4>Yousef</h4>
                        <small>🗓️ Joined: Nov 2023 • 👍 98 likes</small>
                        <p className={style.rating}>⭐⭐⭐⭐⭐</p>
                        <span className={style.badge}>UI/UX Enthusiast</span>
                    </div>
                    <div className={style.testimonial}>
                        <img className={style.avatar} src="https://i.pravatar.cc/80?img=30" alt="Leila" />
                        <p>"Learning with Evolve felt like having a mentor at every step. I now work as a developer!"</p>
                        <h4>Leila</h4>
                        <small>🗓️ Joined: Feb 2024 • 👍 156 likes</small>
                        <p className={style.rating}>⭐⭐⭐⭐⭐</p>
                        <span className={style.badge}>Junior Developer</span>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section>
                <div className={style.categoryGrid}>
                    <ViewCategories />
                </div>
            </section>

            {/* Why Evolve */}
            <section className={style.whyEvolve}>
                <h2>Why Choose Evolve?</h2>
                <ul className={style.reasons}>
                    <li>✅ Learn Anywhere, Anytime</li>
                    <li>✅ Lifetime Access</li>
                    <li>✅ Industry Expert Instructors</li>
                    <li>✅ Certificate of Completion</li>
                </ul>
            </section>

            {/* Newsletter Signup */}
            <section className={style.newsletter}>
                <h2>Stay Updated</h2>
                <p>Subscribe to our newsletter for updates and tips.</p>
                <form className={style.newsletterForm}>
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </form>
            </section>

            {/* Final CTA */}
            <section className={style.finalCTA}>
                <h2>Ready to start learning?</h2>
                <p>Join thousands of learners today.</p>
                <div>
                    <Link to="/register" className={style.primaryBtn}>Register Now</Link>
                    <Link to="/courses" className={style.secondaryBtn}>Browse Courses</Link>
                </div>
            </section>
        </main>
    );
}

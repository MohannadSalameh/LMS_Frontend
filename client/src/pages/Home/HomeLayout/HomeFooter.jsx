import logo from "../../../assets/images/evolve-logo.svg";
import style from "./HomeFooter.module.css"
function Footer() {

    return (<>
    
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.logoSection}>
                    <img src={logo} alt="Evolve" className={style.logo} />
                    <p className={style.motto}>Learn it. Live it. Love it.</p>
                </div>

                <div className={style.menu}>
                    <h3>Explore</h3>
                    <a href="/main">Home</a>
                    <a href="/courses">Courses</a>
                    <a href="/contact">Contact</a>
                    <a href="/about">About Us</a>
                </div>

                <div className={style.menu}>
                    <h3>Support</h3>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                    <a href="/feedback">Feedback</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>

                <div className={style.social}>
                    <h3>Stay Connected</h3>
                    <div className={style.icons}>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">YouTube</a>
                    </div>
                </div>
            </div>

            <div className={style.copy}>
                &copy; {new Date().getFullYear()} Evolve — All rights reserved
            </div>
        </footer>
    
    </>)
}
export default Footer;
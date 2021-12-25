import { Link } from "react-router-dom";
import LogoNoPage from "../assets/svgs/logo_NoPage";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
    return (
        <div className="notFound">
            <Helmet>
                <title>NUZIMAZ - 404 Error Page</title>
            </Helmet>
            <LogoNoPage size="240px" className="notFound__logo" />
            <p className="notFound__text"></p>
            <Link to="/" className="btn notFound__btn">
                Go Back To HomePage
            </Link>
        </div>
    );
}

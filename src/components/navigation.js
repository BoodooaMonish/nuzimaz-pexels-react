import React, { useState } from "react";
import LogoSearch from "../assets/svgs/logo_search";
import LogoCompany from "../assets/svgs/logo_company";
import { useNavigate, createSearchParams, Link, useLocation } from "react-router-dom";

export default function Navigation(props) {
    const location = useLocation();
    const navigate = useNavigate();
    //query state
    const [query, setQuery] = useState("");
    //handling submission and click of search form
    const handleClick = (e) => {
        if (query === "") {
            e.preventDefault();
            return;
        }
        if (location.pathname === "/search") {
            e.preventDefault();
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({
                    query: query,
                })}`,
            });
        } else {
            e.preventDefault();
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({
                    query: query,
                })}`,
            });
        }
    };
    return (
        <header className="navigation">
            <Link to="/" className="navigation__logo">
                <LogoCompany />
            </Link>
            <p className="navigation__text">
                Feel free to browse millions of images provided by{" "}
                <a href="https://www.pexels.com/" className="navigation__text__link">
                    pexels
                    <img src="https://images.pexels.com/lib/api/pexels-white.png" alt="pexels logo" />
                </a>
            </p>
            <form className="navigation__search" onSubmit={handleClick}>
                <label className="navigation__search__label" htmlFor="search-query">
                    Search Images
                </label>
                <input
                    id="search-query"
                    className="navigation__search__input"
                    type="text"
                    placeholder="Search images..."
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toString())}
                />
                <button className="navigation__search__submit" onClick={handleClick} type="submit">
                    Submit search
                    <LogoSearch />
                </button>
            </form>
        </header>
    );
}

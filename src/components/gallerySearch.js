import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../redux/ducks/search";
import LogoClose from "../assets/svgs/logo_close";
import { createSmLayout, createMdLayout, createXlLayout, createLgLayout } from "./gallery";
import { useSearchParams, Navigate } from "react-router-dom";
import LogoLoading from "../assets/svgs/logo_loading";
import LogoError from "../assets/svgs/logo_error";

export default function GallerySearch() {
    const dispatch = useDispatch();
    //redux data for search
    const loading = useSelector((state) => state.search.loading);
    const notFound = useSelector((state) => state.search.error);
    const gallery = useSelector((state) => state.search.data);
    //state
    const [screenSize, setScreenSize] = useState("");
    const [galleryLen, setGalleryLen] = useState(0);
    const [imageView, setImageView] = useState(0);
    const container = useRef(null);
    const [query] = useSearchParams();

    //window resize event to recalculate all column on resize to specific screen points
    const handleResize = (e) => {
        const windowSize = e.target.document.body.clientWidth;
        if (+windowSize < 576) {
            if (screenSize === "sm") return;
            setScreenSize("sm");
        } else if (+windowSize < 768) {
            if (screenSize === "md") return;
            setScreenSize("md");
        } else if (+windowSize < 992) {
            if (screenSize === "lg") return;
            setScreenSize("lg");
        } else {
            if (screenSize === "xl") return;
            setScreenSize("xl");
        }
    };

    //component at start
    useEffect(() => {
        //resize event call
        window.addEventListener("resize", handleResize);

        const windowSize = window.document.body.clientWidth;
        if (screenSize === "") {
            if (+windowSize < 576) {
                setScreenSize("sm");
            } else if (+windowSize < 768) {
                setScreenSize("md");
            } else if (+windowSize < 992) {
                setScreenSize("lg");
            } else {
                setScreenSize("xl");
            }
        }
    }, []);

    useEffect(() => {
        //dispatch query on page load
        if (query.get("query") && query.get("query") !== "") {
            dispatch(fetchSearch({ query: query.get("query") }));
        }
    }, [query]);

    useEffect(() => {
        //create a max-length variable for the gallery data
        if (Object.entries(gallery).length !== 0) {
            setGalleryLen(gallery.photos.length - 1);
        }
    }, [gallery]);

    //handling masonry columns
    const handleMasonryRender = (lists) => {
        let arr = lists;
        if (lists.length !== 0) {
            arr.forEach((item, index) => {
                item.index = index;
            });
        }
        switch (screenSize) {
            case "sm":
                return createSmLayout(arr);
            case "md":
                return createMdLayout(arr);
            case "lg":
                return createLgLayout(arr);
            case "xl":
                return createXlLayout(arr);
            default:
                return null;
        }
    };

    //handling Tab Key Focus
    const handleTabFocus = (event) => {
        if (event.key !== "Tab") return;
        if (container.current.dataset.layout === "sm") return;
        let currentIndex = Number(event.target.dataset.index);
        //tab, no shift, button
        if (event.shiftKey === false && event.target.classList.contains("gallery__list__item__btn")) {
            event.preventDefault();
            container.current.querySelector(`a[data-index="${currentIndex}"]`).focus();
        }
        //tab, shift, button
        if (event.shiftKey === true && event.target.classList.contains("gallery__list__item__btn") && currentIndex > 0) {
            event.preventDefault();
            container.current.querySelector(`a[data-index="${--currentIndex}"]`).focus();
        }
        //tab, shift, button, start check
        if (event.shiftKey === true && event.target.classList.contains("gallery__list__item__btn") && currentIndex === 0) {
            return true;
        }
        //tab, no shift, a
        if (event.shiftKey === false && event.target.classList.contains("gallery__list__item__link")) {
            event.preventDefault();
            if (currentIndex === galleryLen) {
                window.document.querySelector(".page__prev").focus();
            } else {
                container.current.querySelector(`button[data-index="${++currentIndex}"]`).focus();
            }
        }
        //tab, shift, a, end check
        if (event.shiftKey === true && event.target.classList.contains("gallery__list__item__link")) {
            event.preventDefault();
            container.current.querySelector(`button[data-index="${currentIndex}"]`).focus();
        }
    };

    //toggling modal and disabling scroll on <body>
    const handlePhotoClick = (event) => {
        event.preventDefault();
        if (event.target.tagName !== "IMG") return;
        window.document.body.style = "overflow:hidden;";
        setImageView(+event.target.dataset.id);
    };

    //closing modal and re-enabling scroll on <body>
    const handleImageViewerClose = (event) => {
        event.stopPropagation();
        if (
            event.target.classList.contains("imageViewer__btn") ||
            event.target.classList.contains("imageViewer") ||
            event.target.closest(".logo__close")
        ) {
            window.document.body.style = "overflow:unset;";
            setImageView(0);
        } else {
            return false;
        }
    };
    //render method
    if (!query.get("query")) {
        return <Navigate to="/404" />;
    } else if (loading) {
        return (
            <div className="loading">
                <LogoLoading size="48px" className="loading__logo" />
                <h2 className="loading__text">Loading...</h2>
            </div>
        );
    } else if (notFound) {
        return (
            <div className="error">
                <LogoError size="80px" className="error__logo" />
                <p className="error__text">Sorry, an error occurred when retrieving the search results.</p>
            </div>
        );
    } else if (Object.entries(gallery).length !== 0 && gallery.photos.length === 0) {
        return (
            <div className="error">
                <LogoError size="80px" className="error__logo" />
                <p className="error__text">Oops! No Search Results Found.</p>
            </div>
        );
    } else if (Object.entries(gallery).length !== 0 && query.get("query") && query.get("query") !== "") {
        return (
            <>
                <h3 id="heading-search" className="gallery__heading">
                    Search Results
                </h3>
                <article
                    aria-labelledby="heading-search"
                    ref={container}
                    className="gallery"
                    data-layout={screenSize}
                    onKeyDown={handleTabFocus}
                    onClick={handlePhotoClick}
                >
                    {handleMasonryRender(gallery.photos)}
                </article>
                {imageView === 0 ? (
                    <></>
                ) : (
                    <article className="imageViewer" onClick={handleImageViewerClose}>
                        {gallery.photos.map((item) => {
                            if (item.id === imageView) {
                                return <img src={item.src.original} alt={item.alt} className="imageViewer__image" key={item.id} />;
                            } else {
                                return null;
                            }
                        })}
                        <button className="imageViewer__btn">
                            X<LogoClose />
                        </button>
                    </article>
                )}
            </>
        );
    } else {
        return <></>;
    }
}

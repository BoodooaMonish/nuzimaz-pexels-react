import { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurated } from "../redux/ducks/curated";
import LogoClose from "../assets/svgs/logo_close";
import LogoLoading from "../assets/svgs/logo_loading";
import LogoError from "../assets/svgs/logo_error";

export default function Gallery() {
    const dispatch = useDispatch();
    //redux data for curated
    const loading = useSelector((state) => state.curated.loading);
    const notFound = useSelector((state) => state.curated.error);
    const gallery = useSelector((state) => state.curated.data);
    //state
    const [screenSize, setScreenSize] = useState("");
    const [galleryLen, setGalleryLen] = useState(0);
    const [imageView, setImageView] = useState(0);
    const container = useRef(null);

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

        //dispatch an action to fetch data if the gallery is empty
        if (Object.entries(gallery).length === 0) {
            dispatch(fetchCurated());
        }
    }, []);

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
        //tab, no shift, link
        if (event.shiftKey === false && event.target.classList.contains("gallery__list__item__link")) {
            event.preventDefault();
            if (currentIndex === galleryLen) {
                window.document.querySelector(".page__prev").focus();
            } else {
                container.current.querySelector(`button[data-index="${++currentIndex}"]`).focus();
            }
        }
        //tab, shift, link, end check
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
    if (loading) {
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
                <p className="error__text">Sorry, an error occurred when retrieving the gallery information</p>
            </div>
        );
    } else if (Object.entries(gallery).length !== 0) {
        return (
            <>
                <h3 id="heading-gallery" className="gallery__heading">
                    Photos curated by the Pexels Team.
                </h3>
                <article
                    ref={container}
                    aria-labelledby="heading-gallery"
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

// create to photo card
export function ListItem({ item }) {
    let imageLink = item.src.medium.replace("h=350", "w=300");
    return (
        <li className="gallery__list__item">
            <button className="gallery__list__item__btn" data-index={item.index}>
                <LazyLoadImage src={imageLink} alt={item.alt} className="gallery__list__item__image" effect="blur" data-id={item.id} />
            </button>
            <a className="gallery__list__item__link" href={item.photographer_url} data-index={item.index}>
                Photo by {item.photographer}
            </a>
        </li>
    );
}

// create a single column layout for small size screens
export function createSmLayout(images) {
    return (
        <ul className="gallery__list">
            {images.map((item) => {
                return <ListItem item={item} key={item.id} />;
            })}
        </ul>
    );
}

// create a two column layout for medium size screen
export function createMdLayout(images) {
    let column1 = [];
    let column2 = [];
    let count = 1;

    images.forEach((item) => {
        if (count === 1) {
            column1.push(item);
            count = 2;
        } else if (count === 2) {
            column2.push(item);
            count = 1;
        } else {
            return null;
        }
    });

    return (
        <>
            <ul className="gallery__list_column_md">
                {column1.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column2.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
        </>
    );
}

// create a three column layout for large size screen
export function createLgLayout(images) {
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let count = 1;

    images.forEach((item) => {
        if (count === 1) {
            column1.push(item);
            count = 2;
        } else if (count === 2) {
            column2.push(item);
            count = 3;
        } else if (count === 3) {
            column3.push(item);
            count = 1;
        } else {
            return null;
        }
    });

    return (
        <>
            <ul className="gallery__list_column_md">
                {column1.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column2.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column3.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
        </>
    );
}

// create a four column layout for extra large size screen
export function createXlLayout(images) {
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let column4 = [];
    let count = 1;

    images.forEach((item) => {
        if (count === 1) {
            column1.push(item);
            count = 2;
        } else if (count === 2) {
            column2.push(item);
            count = 3;
        } else if (count === 3) {
            column3.push(item);
            count = 4;
        } else if (count === 4) {
            column4.push(item);
            count = 1;
        } else {
            return null;
        }
    });

    return (
        <>
            <ul className="gallery__list_column_md">
                {column1.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column2.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column3.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
            <ul className="gallery__list_column_md">
                {column4.map((item) => {
                    return <ListItem item={item} key={item.id} />;
                })}
            </ul>
        </>
    );
}

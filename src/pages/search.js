import GallerySearch from "../components/gallerySearch";
import PaginationGallery from "../components/paginationSearch";
import { Helmet } from "react-helmet-async";

export default function Search() {
    return (
        <>
            <Helmet>
                <title>NUZIMAZ - Search Results</title>
            </Helmet>
            <GallerySearch />
            <PaginationGallery />
        </>
    );
}

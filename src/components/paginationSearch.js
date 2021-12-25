import { useDispatch, useSelector } from "react-redux";
import { fetchNextSearch, fetchPrevSearch } from "../redux/ducks/search";

export default function PaginationGallery() {
    const dispatch = useDispatch();
    // redux data for search
    const gallery = useSelector((state) => state.search.data);
    // handling click event for previous page data
    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (gallery.page !== 1) {
            dispatch(fetchPrevSearch(gallery.prev_page));
        }
    };
    //handling click event for next page data
    const handleNextPage = (e) => {
        e.preventDefault();
        if (gallery.next_page) {
            dispatch(fetchNextSearch(gallery.next_page));
        }
    };
    if (Object.entries(gallery).length !== 0 && (gallery.next_page || gallery.prev_page)) {
        return (
            <article className="page">
                <button className="btn page__prev" onClick={handlePreviousPage}>
                    Previous Page
                </button>
                <p className="page__current">{gallery.page}</p>
                <button className="btn page__prev" onClick={handleNextPage}>
                    Next Page
                </button>
            </article>
        );
    } else {
        return <></>;
    }
}

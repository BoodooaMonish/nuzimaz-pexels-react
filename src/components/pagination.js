import { useDispatch, useSelector } from "react-redux";
import { fetchNextCurated, fetchPrevCurated } from "../redux/ducks/curated";

export default function Pagination() {
    const dispatch = useDispatch();
    // redux data for curated
    const gallery = useSelector((state) => state.curated.data);
    // handling click event for previous page data
    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (gallery.page !== 1) {
            dispatch(fetchPrevCurated(gallery.prev_page));
        }
    };
    //handling click event for next page data
    const handleNextPage = (e) => {
        e.preventDefault();
        if (gallery.next_page) {
            dispatch(fetchNextCurated(gallery.next_page));
        }
    };
    if (Object.entries(gallery).length !== 0) {
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

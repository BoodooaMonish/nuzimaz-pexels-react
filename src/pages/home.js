import Gallery from "../components/gallery";
import Pagination from "../components/pagination";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>NUZIMAZ - HomePage</title>
            </Helmet>
            <Gallery />
            <Pagination />
        </>
    );
}

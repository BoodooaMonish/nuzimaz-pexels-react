import ImageHero from "../assets/svgs/image_hero";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

export default function Layout(props) {
    return (
        <div className="wrapper">
            <ImageHero cssImageName="background__hero__image" cssContainerName="background__hero" />
            <Navigation />
            <main>{props.children}</main>
            <Footer />
            <ImageHero cssImageName="background__footer__image" cssContainerName="background__footer" />
        </div>
    );
}

// The basic layout consist of the navigation, footer and background images

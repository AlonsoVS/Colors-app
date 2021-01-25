import sizes from './sizes';
import bg from './bg.svg';

export default {
    "@global": {
        ".fade-exit": {
            opacity: 1,
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        },
    },
    root: {
        backgroundColor: "#322caa",
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "overlay",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        marginBottom: "2rem",
        [sizes.down("lg")]: {
            width: "80%",
        },
        [sizes.down("xs")]: {
            width: "75%",
        },
    },
    heading: {
        fontSize: "2rem",
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white",
            textDecoration: "none"
        }
    },
    palettes: {
        boxSizing: "boreder-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "1.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGrap: "1rem",
        },
    },
};

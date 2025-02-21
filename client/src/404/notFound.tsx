// import Nav from "../Nav/nav";
import NotFoundSVG from "../assets/404NotFound.svg";

export default function NotFound() {
    return (
        <>
            {/* <Nav /> */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <img width={600} src={NotFoundSVG} alt="404 Not Found" />
            </div>
        </>
    )
}
import { Link } from "react-router-dom";

function NavLink({ isLogin }) {
    return (
        <nav>
            {/* {isLogin ? <Link className="navlink" to="/setting">Setting</Link> :
            <>
            <Link className="navlink" to="/">login</Link>
            <Link className="navlink" to="/register">register</Link>
            </>} */}
            <>
                <Link className="navlink" to="/setting">Setting</Link>
                <Link className="navlink" to="/">login</Link>
                <Link className="navlink" to="/summary">My Summary</Link>
                <Link className="navlink" to="/self_review">Self Review</Link>
                {/* <Link className="navlink" to="/register">register</Link> */}
            </>
        </nav>

    )
}

export default NavLink;

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
            <Link className="navlink" to="/register">register</Link>
            </>
        </nav>

    )
}

export default NavLink;

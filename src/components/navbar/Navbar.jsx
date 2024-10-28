import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart } from "../../redux/Cartslice";

const Navbar = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear('user');
        dispatch(ClearCart())
        navigate('/login')
    }
    const cartItems = useSelector((state) => state.cart);
    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            {!user ? <li><Link to={'/signup'}>Signup</Link></li> : " "}

            {/* User */}
            {user?.role === "user" && <li>
                <Link to={'/user-dashboard'}>Profile</Link>
            </li>}

            {/* Admin */}
            {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>}

            {/* logout */}
            {user && <li className=" cursor-pointer" onClick={logout}>Logout</li>}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>Cart({cartItems.length})</Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0">
            {/* main  */}
            <div className="lg:flex justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className=" font-bold text-white text-2xl text-center">SHOPEYWAVE</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className=" flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
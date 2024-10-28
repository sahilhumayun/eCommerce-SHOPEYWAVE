import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/Cartslice";
import toast from "react-hot-toast";


const HomePageProductCard = () => {
    const context = useContext(Context)
    const { getAllProduct } = context
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const addCart = (item) => {
        dispatch(addToCart(item))
        toast.success("Added to cart")
    }
    const DeleteFromCart = (item) => {
        dispatch(removeFromCart(item))
        toast.success("Removed From Cart")
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <div className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">BestSelling Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, productImageUrl, title, price } = item
                            return (
                                <div key={index} className="p-4 w-full md:w-2/4 lg:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer" >
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80  h-96 w-full object-contain"
                                            src={productImageUrl}
                                            alt="blog"
                                        />
                                        <div className="p-6" >
                                            <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1" onClick={() => navigate(`/productinfo/${id}`)}>
                                                SHOPEYWAVE
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" onClick={() => navigate(`/productinfo/${id}`)}>
                                                {title.substring(0, 15) + "..."}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" onClick={() => navigate(`/productinfo/${id}`)}>
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                {cartItems.some((p) => p.id === item.id)?
                                                    <button
                                                        onClick={() => DeleteFromCart(item)}
                                                        className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                        Remove From Cart
                                                    </button>:<button
                                                        onClick={() => addCart(item)}
                                                        className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                        Add To Cart
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;

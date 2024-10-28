
import { Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { increaseQnty, decreaseQnty, removeFromCart } from '../../redux/Cartslice';
import { useEffect,useState } from 'react';
import Buynow from '../Buynow/Buynow';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { firedb } from '../../Firebase/Firebase';
import { Timestamp,addDoc,collection } from 'firebase/firestore';
import { ClearCart } from '../../redux/Cartslice';


const Cart = () => {
    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const DeleteFromCart = (item) => {
        dispatch(removeFromCart(item))
        toast.success("Removed From Cart")
    }
    const handleIncrement = (id) => {
        dispatch(increaseQnty(id));
    };
    const handleDecrement = (id) => {
        dispatch(decreaseQnty(id));
    };
    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const navigate=useNavigate()
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });
    const buyNowFunction = () => {
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(firedb, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            dispatch(ClearCart())
            toast.success("Order Placed Successfull")
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    }
    
    const user = JSON.parse(localStorage.getItem('users'))
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <div className="container mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul role="list" className="divide-y divide-gray-300">
                            {cartItems.length > 0 ?

                                <>
                                    {cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category } = item
                                        return (
                                            <div key={index} className="">
                                                <li className="flex py-6 sm:py-6 ">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={productImageUrl}
                                                            alt="img"
                                                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                        />
                                                    </div>
                                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                            <div>
                                                                <div className="flex justify-between">
                                                                    <h3 className="text-sm">
                                                                        <div className="font-semibold text-black">
                                                                            {title}
                                                                        </div>
                                                                    </h3>
                                                                </div>
                                                                <div className="mt-1 flex text-sm">
                                                                    <p className="text-sm text-gray-500">{category}</p>
                                                                </div>
                                                                <div className="mt-1 flex items-end">
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        ₹{price}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <div className="mb-2 flex">
                                                    <div className="min-w-24 flex">
                                                        <button onClick={() => handleDecrement(id)} type="button" className="h-7 w-7" > -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="mx-1 h-7 w-9 rounded-md border text-center"
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                        <button onClick={() => handleIncrement(id)} type="button" className="flex h-7 w-7 items-center justify-center">+
                                                        </button>
                                                    </div>
                                                    <div className="ml-6 flex text-sm">
                                                        <button onClick={() => DeleteFromCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                            <Trash size={12} className="text-red-500" />
                                                            <span className="text-xs font-medium text-red-500">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                                :

                                <h1>Not Found</h1>}
                        </ul>
                    </section>
                    {/* Order summary */}
                    <section
                        className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                    >
                        <h2 className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">Price Details
                        </h2>
                        <div>
                            <dl className=" space-y-1 px-2 py-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                    <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                </div>
                            </dl>
                            <div className="px-2 pb-4 font-medium text-green-700">
                                <div className="flex gap-4 mb-6">
                                {user
                                            ? <Buynow
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            /> : navigate('/login')
                                        }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default Cart;

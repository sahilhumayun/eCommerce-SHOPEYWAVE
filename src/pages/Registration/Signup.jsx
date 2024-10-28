import { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { firedb,auth } from "../../Firebase/Firebase";
import { Timestamp } from "firebase/firestore";
import { collection,addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const context = useContext(Context)
    const { loading, setloading } = context

    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }
        if (userSignup.password.length <= 5){
            toast.error("Password Must have Atleast 6 charaters")
        }
        setloading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
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
            const userRefrence = collection(firedb, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setloading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setloading(false);
        }

    }
    return (
        <div className='flex justify-center items-center py-20 lg:h-screen'>
            {loading && <Loader/>}
            {/* Login Form  */}
            <div className=" bg-pink-50 px-1 w-3/4 md:w-auto lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3 flex items-center justify-center ">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 md:w-96 w-11/12 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3 flex items-center justify-center">
                    <input
                        type="email"
                        value={userSignup.email}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 md:w-96 w-11/12 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5 flex items-center justify-center">
                    <input
                        type="password"
                        value={userSignup.password}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 md:w-96 w-11/12 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    onClick={userSignupFunction}
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;
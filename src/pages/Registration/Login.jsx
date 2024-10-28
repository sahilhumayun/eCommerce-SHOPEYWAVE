import Context from "../../Context/Context";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { firedb,auth } from "../../Firebase/Firebase";
import { collection,onSnapshot,query,where } from "firebase/firestore";

const Login = () => {
    const context = useContext(Context);
    const { loading, setloading } = context;

    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }
        setloading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            try {
                const q = query(
                    collection(firedb, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setloading(false);
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setloading(false);
            }
        } catch (error) {
            console.log(error);
            setloading(false);
            toast.error("Login Failed");
        }
    }
    return (
        <div className='flex justify-center items-center py-20 lg:h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className=" bg-pink-50 px-1 w-3/4 md:w-auto lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3 flex items-center justify-center">
                    <input
                        value={userLogin.email}
                        onChange={(e)=>{
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })
                        }}
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 md:w-96 w-11/12 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5 flex items-center justify-center">
                    <input
                        value={userLogin.password}
                        onChange={(e)=>{
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })
                        }}
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 md:w-96 w-11/12 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    onClick={userLoginFunction}
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;
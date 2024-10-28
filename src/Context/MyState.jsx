/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Context from "./Context"
import { collection, deleteDoc, onSnapshot, orderBy, query, } from "firebase/firestore";
import { firedb } from "../Firebase/Firebase";
import toast from "react-hot-toast";

function MyState({ children }) {
  const [loading, setloading] = useState(false)

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductfunction = async () => {
    setloading(true)
    try {
      const q = query(collection(firedb, "products"), orderBy('time'))
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productarray = []
        QuerySnapshot.forEach((doc) => {
          productarray.push({ ...doc.data(), id: doc.id })
        })
        setGetAllProduct(productarray)
        setloading(false)
      })
      return () => data
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
  useEffect(() => {
    getAllProductfunction();
    getAllOrderfunction()
    getAllUsersfunction()
  }, []);

  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderfunction = async () => {
    setloading(true)
    try {
      const q = query(collection(firedb, "order"), orderBy('time'))
      const data = onSnapshot(q, (Querysnapahot) => {
        let orderArray=[]
        Querysnapahot.forEach((doc)=>{
          orderArray.push({...doc.data(),id: doc.id})
        })
        setGetAllOrder(orderArray)
        setloading(false)
      })
      return ()=> data
    }catch(error){
      console.log(error)
      setloading(false)
    }
  }
  const DeleteOrder = async(id)=>{
    setloading(true)
    try{
      await deleteDoc(firedb, 'order',id)
      toast.success("Order Deleted Successfully")
      getAllOrderfunction()
      setloading(false)
    }catch(error){
      console.log(error)
      setloading(false)
    }
  }
  const [getAllUsers,setgetAllUsers]=useState([])
  const getAllUsersfunction=async()=>{
    setloading(true)
    try{
      const q= query(collection(firedb,"user"),orderBy('time'))
      const data = onSnapshot(q,(Querysnapahot)=>{
        let userArry=[]
        Querysnapahot.forEach((doc)=>{
          userArry.push({...doc.data(), id:doc.id})
        })
        setgetAllUsers(userArry)
        setloading(false)
      })
      return ()=>data
    }catch(error){
      console.log(error)
      setloading(false)
    }
  }
  return (
    <Context.Provider value={{ loading, setloading, getAllProduct, getAllProductfunction, getAllOrder , DeleteOrder, getAllUsers}}>
      {children}
    </Context.Provider>
  )
}

export default MyState
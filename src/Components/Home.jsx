import {Link} from "react-router-dom"
const Home = ()=>{
  return(
    <div className="bg-[#ccc] p-5 m-5 rounded-xl text-center">
    <Link to="/register" className="p-[25px] font-bold">Register</Link>
    <Link to="/login" className="font-bold">Login</Link>
    </div>
    )
}
export default Home
// ایمپورت کردن موارد مورد نیاز
import { useRef ,useState} from "react";
import {login} from "../services/httpRequests"
import {Link,useNavigate} from "react-router-dom"
export default function Login() {
  // استفاده از use refبرای دستیابی به ولیو  ها
let number = useRef()
let password = useRef()
let [numberError,setNumberError] = useState(false)
let [passError,setPassError] = useState(false)
// نوشتن توابع  و شرط ها
const onsubmitForm = async (e)=>{
  e.preventDefault()
  let {value:numberValue} = number.current
  let {value:passwordValue} = password.current
  if (numberValue.length !== 11) setNumberError("شماره تلفن معتبر نیست")
    else setNumberError(false)
  if(passwordValue.length<8)setPassError("پسورد معتبر نیست حداقل کاراکتر ۸ است")
  else setPassError(false)
  if (!(numberValue.length !== 11)&&!(passwordValue.length<8)) {
    try {
      let {data} = await login(numberValue,passwordValue)
      if (parseInt(data.code)===200) {
        alert(data.message)
        alert("for save login : save login in localstorage")
        alert(`token:${data.token}`)
      }
    } catch (e) {
      if (e.message==="Network Error") {
        alert("برسی اتصال اینترنت")
      } else {
        if (e.response.status===401) {
        alert("اطلاعات غلط وارد شده است")
      }else{
        alert("خطایی رخ داد")
      }
      }
    }
  }
}
  return (
    // container for code:
    <div className="text-center font-bold mt-14 m-auto font-Tanha">
      <div className="text-center bg-[#82B1FF] items-center border-[1px] h-[650px] w-[500px]  rounded-3xl m-auto p-[20px] md:font-bold sm:font-bold">
        <br></br>
        {/* main contact page login: */}
        <form onSubmit={onsubmitForm}>
          {/* title pages: */}
          <h1 className="text-slate-500">صفحه ی ورود کاربران</h1>
          <br></br>
          <p className="p-2 font-bold text-black">موبایل:</p>
          <input
            ref={number}
            type="number"
            className="rounded-md border-none bg-[#ccc] p-2 w-[300px] text-center"
          ></input>
          <br></br>
          {numberError?(<p className="text-[#ff000f]">{numberError}</p>):null}
          <br></br>
          <p className="p-3">رمز عبور:</p>
          <input
            ref={password}
            dir="ltr"
            type="password"
            className="rounded-md border-none bg-[#ccc] p-2 w-[400px]"
          ></input>
          <br></br>
          {passError?(<p className="text-[#ff000f]">{passError}</p>):null}
          <br></br>
          <input type="submit" className="p-4 bg-blue-600 mt-4 rounded-lg w-[300px] hover:bg-[#82B1FF] border-[1px] border-black text-blue-500" value="ورود"/>
        </form>
         <br></br>
          <br></br>
          <Link to="/register" className="p-4 bg-[#FF1744] mt-4 rounded-lg w-[300px] border-[1px] border-black hover:bg-[#82B1FF] text-blue-500">
            ثبت نام
          </Link>
          <br></br>
          <br></br>
      </div>
    </div>
  );
}
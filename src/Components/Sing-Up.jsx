// ایمپورت کردن موارد مورد نیاز 
import { useRef ,useState} from "react";
import {register} from "../services/httpRequests"
import {Link,useNavigate} from "react-router-dom"
export default function Sing_Up() {
  // استفاده از userefبرای گرفتن ولیو ها
let number = useRef()
let password = useRef()
let confirmPassword = useRef()
let name = useRef()
let navigate = useNavigate()
let [numberError,setNumberError] = useState(false)
let [passError,setPassError] = useState(false)
let [confirmPassError,setConfirmPassError] = useState(false)
let [nameError,setNameError] = useState(false)
// نوشتن شرط های مورد نیاز برای اجرا فرم و همچنین نوشتن توابع مورد نیاز
const onsubmitForm = async (e)=>{
  e.preventDefault()
  let {value:nameValue} = name.current
  let {value:numberValue} = number.current
  let {value:passwordValue} = password.current
  let {value:confirmPasswordValue} = confirmPassword.current
  if (nameValue.length < 3) setNameError("نام معتبر نیست")
    else setNameError(false)
  if (numberValue.length !== 11) setNumberError("شماره تلفن معتبر نیست")
    else setNumberError(false)
  if(passwordValue.length<8)setPassError("پسورد معتبر نیست حداقل کاراکتر ۸ است")
  else setPassError(false)
  if(passwordValue!==confirmPasswordValue)setConfirmPassError("پسورد ها مطابقت ندارند")
  else setConfirmPassError(false)
  if (!(numberValue.length !== 11)&&!(passwordValue.length<8)&&!(passwordValue!==confirmPasswordValue)&&!(nameValue.length<3)) {
    try {
      let {data} = await register(numberValue,passwordValue,nameValue)
      if(parseInt(data.code)===200){
        alert("ایجاد شد")
        navigate("/login")
      }
    } catch (e) {
      if (e.message==="Network Error") {
        alert("برسی اتصال اینترنت")
      } else {
        if (e.response.status===409) {
        alert("کاربر از  قبل موجود")
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
      <div className="text-center bg-[#82B1FF] items-center border-[1px] h-[750px] w-[500px]  rounded-3xl m-auto p-[20px] md:font-bold sm:font-bold">
        <br></br>
        {/* main contact page login: */}
        <form onSubmit={onsubmitForm}>
          {/* title pages: */}
          <h1 className="text-slate-500">صفحه ثبت نام پیامرسان</h1>
          <br></br>
         <p className="p-2 font-bold text-black">نام و نام خانوادگی:</p>
          <input
            ref={name}
            type="text"
            className="rounded-md border-none bg-[#ccc] p-2 w-[300px] text-center"
          ></input>
          <br></br>
          {nameError?(<p className="text-[#ff000f]">{nameError}</p>):null}
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
          <p className="p-3">تکرار رمز عبور:</p>
          <input
            ref={confirmPassword}
            dir="ltr"
            type="password"
            className="rounded-md border-none p-2 bg-[#ccc] w-[400px]"
          ></input>
          <br></br>
          {confirmPassError?(<p className="text-[#ff000f]">{confirmPassError}</p>):null}
          <br></br>
          <input type="submit" className="p-4 bg-blue-600 mt-4 rounded-lg w-[300px] hover:bg-[#82B1FF] border-[1px] border-black text-blue-500" value="ثبت نام"/>
        </form>
         <br></br>
          <br></br>
          <Link to="/login" className="p-4 bg-[#FF1744] mt-4 rounded-lg w-[300px] border-[1px] border-black hover:bg-[#82B1FF] text-blue-500">
            ورود
          </Link>
          <br></br>
          <br></br>
      </div>
    </div>
  );
}

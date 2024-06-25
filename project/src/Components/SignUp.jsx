import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const LogInRef = useRef(null);
  const SignUpRef = useRef(null);
  const errorMessageRef = useRef(null);

  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    const url = isSignUp ? "http://localhost:6969/register" : "http://localhost:6969/login";
    const body = isSignUp ? { name, email, password } : { email, password };

    try {
      let result = await fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!isSignUp){
      if (result.status === 200) {
        const output = await result.json();
        console.log(output);
        localStorage.setItem("user", JSON.stringify(output));
        errorMessageRef.current.innerHTML = "";
        navigate("/");
      } else {
        const errorData = await result.json();
        console.log(errorData);
        errorMessageRef.current.innerHTML = "* Please enter correct email & password";
      }
      } else{
      if (result.status === 201) {
        const output = await result.json();
        console.log(output);
        localStorage.setItem("user", JSON.stringify(output));
        errorMessageRef.current.innerHTML = "";
        navigate("/");
      } else {
        const errorData = await result.json();
        console.log(errorData);
      }
    }
    } catch (err) {
      console.error("Error during fetch:", err);
      errorMessageRef.current.innerHTML = "* An error occurred. Please try again later.";
    }
  };

  const switchToLogIn = () => {
    setIsSignUp(false);
    SignUpRef.current.style.borderColor = "white";
    LogInRef.current.style.borderColor = "black";
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
    SignUpRef.current.style.borderColor = "black";
    LogInRef.current.style.borderColor = "white";
  };

  return (
    <div className="border border-gray-900 rounded-lg w-[600px] h-[500px] ml-[30%] flex flex-col items-center relative">
      
      <h1 className="text-5xl text-center pt-10 pb-2">{isSignUp ? "Register" : "Log In"}</h1>
      
      <div className="flex w-full h-[40px] justify-center items-center bg-red-200 mt-[28px]">
        <div onClick={switchToLogIn} ref={LogInRef} className="border border-white w-[50%] h-full flex justify-center items-center" style={{ backgroundColor: isSignUp ? "white" : "lightgray" }} >Log In </div>
        <div onClick={switchToSignUp}ref={SignUpRef}className="border border-black pt-[5px] w-[50%] h-full flex justify-center items-center"style={{ backgroundColor: isSignUp ? "lightgray" : "white" }}>Sign Up</div>
      </div>
      
      {isSignUp && (<input className="border solid border-black rounded-lg bg-gray-100 w-[75%] h-[40px] pl-4 mt-10 mb-4" type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />)}
      
      <input className="border solid border-black rounded-lg bg-gray-100 w-[75%] h-[40px] pl-4 mt-4 mb-4" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} style={{ marginTop: isSignUp ? "16px" : "40px" }} />
      
      <input className="border solid border-black rounded-lg bg-gray-100 w-[75%] h-[40px] pl-4 mt-4 mb-4" type={showPass ? "text" : "password"} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
      
      <input type="checkbox" className="absolute right-7  w-7 h-7 mt-1.5" onClick={() => setShowPass(!showPass)} style={{ top: isSignUp ? "70%" : "55.5%" }} />
      
      <div className="text-red-600 self-start ml-20" ref={errorMessageRef}></div>
      
      <button className="border solid border-black rounded-md bg-blue-700 text-white pt-1 pb-2 pr-4 pl-4 absolute" onClick={handleAuth} style={{ top: isSignUp ? "85%" : "75%" }} >
        {isSignUp ? "Sign Up" : "Log In"}
      </button>
    </div>
  );
}

export default SignUp;

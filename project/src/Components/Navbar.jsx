import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem('user');
  const name = auth?JSON.parse(auth).name:'Guest';
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('user');
      navigate('/signup');
    }
  };

  return (
    <>
      {/* <div className="w-full h-10 flex bg-blue-300"> */}
        {
          auth?<div className="w-full h-10 flex bg-blue-300">
            <div className="text-[18px] mt-1 mr-4 ml-4"><Link to='/'>Product</Link></div>
            <div className="text-[18px] mt-1 mr-4 ml-4"><Link to='/add'>Add Product</Link></div>
            <div className="text-[18px] mt-1 mr-4 ml-4"><Link to='/update/666bd72e777f8c289ccfeb2c'>Update Product</Link></div>
            <div className="text-[18px] mt-1 mr-4 ml-4"><Link to='/profile'>Profile</Link></div>
            <div className="text-[18px] mt-1 mr-4 ml-4 absolute right-1"><Link to='/profile' onClick={handleLogout}>Log Out ({name})</Link></div>
          </div>:<div>
          {/* <div className="text-[18px] mt-1 mr-4 ml-4"> */}
              <div className="text-[18px] mt-1 mr-4 ml-4 absolute right-1"><Link to='/signup'>LogIn/SignUp</Link></div>
            {/* </div> */}
          </div>
        }
      {/* </div> */}
      <br /><br />
    </>
  );
}

export default Navbar;

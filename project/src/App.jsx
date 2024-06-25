import {BrowserRouter, Route , Routes } from 'react-router-dom'
// import {Navbar,Product,AddProduct,UpdateProduct,Logout,Profile} from './Components'
import Navbar from './Components/Navbar'
import Product from './Components/Product'
import AddProduct from './Components/AddProduct'
import UpdateProduct from './Components/UpdateProduct'
import Profile from './Components/Profile'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
import './App.css'
import PrivateComponent from './Components/PrivateComponent'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route element={<PrivateComponent/>} >
            <Route path='/' element={<Product />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App

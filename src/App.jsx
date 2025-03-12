import { Route, Routes } from 'react-router-dom'
import './App.css'
import Listprdprovider from './context/ListprdContext'
import Categories from './page/Categories'
import Customers from './page/Customers'
import Dashboar from './page/Dashboar'
import Login from './page/Login'
import Orders from './page/Orders'
import Products from './page/Products'
import Register from './page/register'
import UserRoles from './page/UserRoles'

function App() {
  return (
    <>
    <Listprdprovider>
     <Routes>
      <Route path='/' element={<Dashboar/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/customers' element={<Customers/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/roles' element={<UserRoles/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
     </Listprdprovider>
    </>
  )
}

export default App

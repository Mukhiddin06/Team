import { Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  )
}

export default CustomRoutes

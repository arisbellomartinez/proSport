
/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate } from "react-router-dom"
import logo from '../../assets/logo.svg'
import axios from "axios"
import { useState, useContext } from "react"
import { UserContext } from "../../UserContext"

const FormLogin = () => {

  const { setUser, user } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [contrasenia, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1234/login', {
        email,
        contrasenia,
      }, { withCredentials: true });

      if (response.status === 200) {
        setUser(response.data);
        setRedirect(true);
        alert('Login done!');
      }  else {
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      if (error.response.status === 404) {
          alert('Usuario no encontrado');
      }
    }
  }


  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <section className=" sm:pt[100px] grow">
      <div className="flex flex-col items-center justify-center px-6 py-[100px] mx-auto md:h-screen lg:py-0 ">
        <Link to={'/'} className="flex gap-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-15 h-13 object-contain" src={logo} alt="logo" />
          
        </Link>
        {user && (
          <div>Ya tienes una cuenta iniciada, redirigete a <span><Link to={'/'}>Home</Link> y sigue explorando nuevos lugares</span></div>
        )}
        {!user && (

          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0mt-0  dark:bg-[#222B2A] dark:border-gray-700 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
            <h1 className="text-[#59B9A0] text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                INICIAR SESIÓN
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                <label className="text-[#8AB0A6] block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#8AB0A6] bg-opacity-5 border border-[#8AB0A6] text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tumail@email.com" required="" />
                </div>
                <div>
                <label htmlFor="password" className="text-[#8AB0A6] block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input type="password" value={contrasenia} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-[#8AB0A6] bg-opacity-5 border border-[#8AB0A6] text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button type="submit" onClick={handleLogin} className="text-xl w-40 text-[#59B9A0] bg-[#8AB0A6] bg-opacity-20 border border-[#59B9A0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-500 dark:focus:ring-primary-800">INGRESAR</button>
                </div>
                <p className="flex flex-col items-center justify-center text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link to={'/register'} className="font-medium text-primary-300 hover:underline dark:text-primary-500 px-1" >Registrarse</Link>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FormLogin
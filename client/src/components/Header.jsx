import { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import axios from 'axios'
import { Link, Navigate } from "react-router-dom"
import { UserContext } from '../UserContext'
import { COOKIE_EXPIRED } from '../utils/utils'

export default function Header() {

    const { user, setUser } = useContext(UserContext)
    const [scrolling, setScrolling] = useState(false)
    // const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        // Función para manejar el evento de scroll
        const handleScroll = () => {
            if (window.scrollY > 0) {
                // Usuario ha hecho scroll hacia abajo, se activa el difuminado
                setScrolling(true);
            } else {
                // Usuario ha hecho scroll hacia arriba, se restaura el header
                setScrolling(false);
            }
        }

        // Agregar el evento de scroll al montar el componente
        window.addEventListener('scroll', handleScroll);

        // Limpieza del evento al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const obtenerIniciales = (nombre, apellido) => {
        let iniciales = '';

        nombre ? iniciales += nombre[0].toUpperCase() : ''
        apellido ? iniciales += apellido[0].toUpperCase() : ''

        return iniciales;
    };

    async function logOut() {
        try {
            await axios.post('http://localhost:1234/api/logout')
            document.cookie = COOKIE_EXPIRED
            setUser(null)
            window.location.reload()
            return <Navigate to={'/'} />
        } catch (error) {
            console.error('Error al hacer logout', error)
        }
    }
    function toggleMenu(e) {
        console.log(e)
    }
    

    return (
        <header className={`w-screen bg-[#284545] fixed z-10 pt-5${scrolling ? 'bg-opacity-90 backdrop-blur-md' : ''}`}>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5 ">
                <section className="flex justify-between items-center">
                    <Link to={'/'} className="flex items-center">
                        <img src={logo} className="mr-3 h-12 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden sm:inline-block">Pro-Sport</span>
                    </Link>
                    {user ? (
                        <section className="justify-between items-center mb-2 lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-between items-center">
                                <div className='flex'>

                                    <li >
                                        <button className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"><Link to={'/account/espacios'}>Mis Espacios</Link></button>
                                    </li>
                                    <li >
                                        <button className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={logOut}>Cerrar Sesión</button>
                                    </li>
                                </div>
                                <li className='sm:hidden' >
                                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-[#17B289] dark:hover:bg-gray-700 dark:focus:ring-gray-600 h-12" aria-controls="mobile-menu-2" aria-expanded="false" onClick={toggleMenu}>
                                    
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                </li>
                            {user.nombre && user.apellido &&  (
                                <div className="profile-image w-10 h-10 bg-[#17B289] rounded-full justify-center items-center text-white text-xl font-semibold hidden sm:flex">
                                    {obtenerIniciales(user.nombre, user.apellido)}
                                </div>
                            )}
                            </ul>
                        </section>
                    ) :
                        (
                            <div className="flex items-center lg:order-2">
                                <Link to={'/login'} className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ">Log in
                                </Link>
                                <Link to={'/register'} className="text-[#00FF9D] bg-[#131818] border-[#00FF9D] border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sign In
                                </Link>
                               
                            </div>
                        )}
                </section>
            </nav >
        </header >
    )
}
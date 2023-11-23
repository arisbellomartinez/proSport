import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function EspaciosPage() {

    const [espacios, setEspacios] = useState([])
    const [alerta, setAlerta] = useState(false)
    const [espacioPorEliminar, setEspacioPorEliminar] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const location = useLocation()
    const token = Cookies.get('token')

    useEffect(() => {
        {/*
            axios.get('http://localhost:1234/espacios', { withCredentials: true })
                    .then(({ data }) => {
                        setEspacios(data);
            });
        */}

        if (token) {
            fetch('http://localhost:1234/api/user/espacios', {
                method: 'GET',
                credentials: 'include' // equivale a withCredentials
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    setEspacios(data);
                })
                .catch(error => {
                    console.error('Error: ', error);
                });

        } else{
            setRedirect(true)
        }
    }, [token])

    if(redirect) {
        return <Navigate to={'/'} />
    }

    if (!token && location.pathname === '/account/espacios') {
        return <Navigate to={'/'} />
    }

    function handleDelete(id) {
        // lanzamos la alerta en caso de que se presione el boton eliminar
        // y pasamos el id del espacio que se quiere eliminar
        setEspacioPorEliminar(id);
        setAlerta(true);
    }

    function handleCancel() {
        // si presionamos cancelar, se cierra la alerta y no se elimina el espacio
        setAlerta(false)
    }

    async function handleConfirm(id) {
        axios.delete(`http://localhost:1234/api/espacios/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setEspacios(espacios.filter(espacio => espacio._id !== id));
                } else {
                    console.error('Error eliminando espacio')
                }
            })
        setAlerta(false)
    }

    return (
        <section className='mt-[120px] w-screen h-screen'>
            <div className='flex flex-col items-center justify-center'>

                <h1 className="text-4xl text-[#A8F2DE]">Mis Espacios</h1>
                <button className='mt-4 text-[#83F3C8] border border-[#83F3C8] p-2 rounded-lg mr-4 hover:bg-black'>
                    <Link to={'/account/espacios/new'} className="">
                        CREAR ESPACIO
                    </Link>
                </button>
            </div>
            <hr className="mt-4 mb-4 border-[#83F3C8]" />
            <div className='flex'>
                
            {espacios.length > 0 && espacios.map(espacio => (
                <article key={espacio._id} className="border-[#83F3C8] border-2 m-4">
                    <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                        {espacio.fotos.length > 0 && (
                            <img className="" src={`https://1023c07-prosport.s3.amazonaws.com/${espacio?.fotos[0]}`} alt={espacio.nombre} />
                        )}
                    </div>
                    <div className="grow-0 shrink text-white flex flex-col justify-center items-center">
                        <h2 className="text-2xl text-[#A8F2DE]">{espacio.nombre}</h2>
                        <p className='text-xl'><small>{espacio.deporte}</small></p>
                        <button className='mt-4 text-[#83F3C8] border border-[#83F3C8] p-2 rounded-lg hover:bg-black'>

                        <Link to={'/account/espacios/' + espacio._id} className="hover:text-primary">
                            EDITAR
                        </Link>
                        </button>
                        <button onClick={() => handleDelete(espacio._id)} className='m-4 text-[#83F3C8] border border-[#83F3C8] p-2 rounded-lg hover:bg-black'>
                            ELIMINAR
                        </button>
                    </div>
                    <div className="grow-0 shrink text-white">
                    </div>
                </article>
            ))}
            {alerta && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl">¿Estás seguro de que deseas eliminar este espacio?</h2>
                        <div className="flex justify-end">
                            <button onClick={handleCancel}>CANCELAR</button>
                            <button onClick={() => handleConfirm(espacioPorEliminar)}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </section>
    )


}
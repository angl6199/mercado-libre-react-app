//React
import React, {useState, useEffect} from "react"
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'

//Componentes
import BlueButton from './../../atoms/BlueButton/index'

//Imágenes

//Material UI
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LoginForm({loggedUser, setLoggedUser}){
    const [users, setUsers] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [redirect, setredirect] = useState(false)

    const phone = useMediaQuery('(max-width:767px)');
    const tablet = useMediaQuery('(min-width:768px)');
    const desktop = useMediaQuery('(min-width:1000px)');

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('https://mlwebapi.herokuapp.com/users/all')
            .then(response => setUsers(response.data))
            .catch((error) => console.log(error));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function validateUser(e) {
        e.preventDefault()
        users.forEach(user => {
            if (user.email == email && user.contrasena == password) {
                console.log("Usuario existe")
                setLoggedUser(user);
                setredirect(true);
                localStorage.setItem('loggedUser', user)
                localStorage.setItem('key', user._id)
            }
        });
        console.log("Usuario no existe")
    }

    {/* Componente que retorna la sección izquierda de la página con posibilidad de ocultarse en 
        diseño responsivo mediante hooks */}
    return (
        <>
        <div className={`position-absolute positionform`}>
            <div className={`d-flex flex-column formcontainer box-shadow-gr-nm br-10 align-items-center`}>
                <form onSubmit={validateUser}>
                    <p className={`a-medium-black text-big mt-12 mb-8`}>¡Hola! Ingresa tu teléfono, <br></br> e-mail o usuario</p>
                    <label className={`a-regular-gray text-small d-flex flex-column`}>E-mail
                        <input className={`text-normal a-medium-black forminput`} type={'text'} name='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <label className={`a-regular-gray text-small d-flex flex-column mt-4`}>Contraseña
                        <input className={`text-normal a-medium-black forminput`} type={'password'} name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <BlueButton variant={1}></BlueButton>
                </form>

                <Link className={`mt-5 mb-8 text-decoration-none create`} to={'/sign-up'}>
                <div className={'cursor-pointer'}>
                    <p className={' text-normal a-regular-azul-1'}>Crear Cuenta</p>
                </div>
                </Link>
                
                <hr className={`hr-gray m-0`}></hr>
                

                <Link className={`text-decoration-none needhelp w-100`} to={''}>
                <div className={'cursor-pointer'}>
                <p className={'text-small a-regular-azul-1 text-align-center mt-4 mb-6'}>Ingresar como invitado</p>
                </div>
                </Link>

            </div>
        </div>
        {redirect && <Navigate to={`/${loggedUser.nombre}-${loggedUser.apellido}/home`}></Navigate>}
        </>
    )
}
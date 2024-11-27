import { useState, useEffect } from "react";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Login/RegisterModal";
import Button from "../Button";
import {
  AiOutlineHome,
  AiOutlineEnvironment,
  AiOutlineShop,
  AiOutlineUsergroupAdd,
  AiOutlineLogin,
} from "react-icons/ai";
import NavBar_Button from "./NavBarButton";

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false); // Modal de login
  const [isRegisterOpen, setRegisterOpen] = useState(false); // Modal de registro
  const [userEmail, setUserEmail] = useState(null); // Correo del usuario logueado
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controla la visibilidad del dropdown

  //Este comando es god, puedes guardar items dinamicos en local
  // Cargar el correo del localStorage al iniciar la app
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);
 
  const openLoginModal = () => { //condicional para antes de presionar el boton login
    setLoginOpen(true);
    setRegisterOpen(false); 
  };

  const openRegisterModal = () => {//condicional que establece valores antes de presionar el de registrar
    setLoginOpen(false); 
    setRegisterOpen(true); 
  };
//funcion para que se borre del localstorage y no se lea el correo despues de cerrar sesion
  const handleLogout = () => { // Esta funcion hay que mandarla con un archivo aparte y luego exportarlas luego de terminar pruebas
    setUserEmail(null);
    localStorage.removeItem("userEmail"); 
    localStorage.removeItem("token"); 
    alert("¡Has cerrado sesión!");
  };

  return (
    <>
      <header className="flex justify-between items-center w-full h-[3rem] px-[1.5rem] py-[.3rem] bg-yellow-600/60 backdrop-blur-sm rounded-b-xl drop-shadow-lg text-white fixed top-0 z-50">
        <div className="drop-shadow-lg">
          <h2 className="drop-shadow-md font-bold">SAHAGÚN TOUR</h2>
        </div>
        <div className="flex">
          <nav className="mx-[3rem]">
            <li className="flex items-center space-x-3 drop-shadow-md">
              <ul>
                <NavBar_Button
                  texto={"Inicio"}
                  icono={<AiOutlineHome />}
                  ruta={"/"}
                />
              </ul>
              <ul>
                <NavBar_Button texto={"Lugares"} icono={<AiOutlineShop />} />
              </ul>
              <ul>
                <NavBar_Button
                  texto={"Mapa"}
                  icono={<AiOutlineEnvironment />}
                />
              </ul>
              <ul>
                <NavBar_Button
                  texto={"Eventos"}
                  icono={<AiOutlineUsergroupAdd />}
                />
              </ul>
            </li>
          </nav>
        </div>
        {/* Cambiar entre Iniciar Sesión y dropdown */}
        {userEmail ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition"
            >
              <span className="text-sm font-bold">{userEmail}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-md rounded-md py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            texto={"Iniciar sesión"}
            icono={<AiOutlineLogin />}
            onClick={openLoginModal}
          />
        )}
      </header>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onRegisterClick={openRegisterModal}
        setUserEmail={setUserEmail}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";

const useLogin = () => {
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);
    const [formError, setFormError] = useState({ status: false, msg: "" });
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        let islogin = JSON.parse(sessionStorage.getItem("LOGIN"));
        if (islogin) {
            console.log("usuario logueado");
            navigate("/home");
        } else {
            sessionStorage.setItem("LOGIN", "false");
            navigate("/");
            console.log("usuario no identificado");
        }
    }, []);

    const logout = () => {
        sessionStorage.setItem("LOGIN", "false");
        navigate("/");
    };

    const login = async (email, password) => {
        if (emailValid(email)) {
            try {
                setFormLoading(true);
                setFormSuccess(false);
                let res = await loginService.login(email, password);
                if (res.status === 200) {
                    setFormSuccess(true);
                    setFormLoading(false);
                    setFormError({ status: false, msg: "" });
                    sessionStorage.setItem(
                        "LOGIN",
                        JSON.stringify({
                            apellido: res.data.apellido,
                            email: res.data.email,
                            id: res.data.id,
                            nivelAutoridad: res.data.nivelAutoridad,
                            nombre: res.data.nombre,
                        })
                    );
                    navigate("/home");
                    return res.data;
                } else {
                    throw new Error("Usuario o Contraseña Inválido");
                }
            } catch (err) {
                console.log(err);
                setFormSuccess(true);
                setFormLoading(false);
                setFormError({
                    status: true,
                    msg: "Usuario o Contraseña Inválido",
                });
                return null;
            }
        }
    };

    const emailValid = (email) => {
        let regex = /^([da-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
        if (!regex.test(email)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
            return true;
        }
    };

    return {
        formError,
        formLoading,
        formSuccess,
        emailValid,
        emailError,
        login,
        logout,
    };
};

export default useLogin;

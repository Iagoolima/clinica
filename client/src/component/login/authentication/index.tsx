import { useNavigate } from "react-router-dom"
import logoimg from "../../../assets/logo-flora-evora.webp"
import "./authentication.css"
import { FaLock } from 'react-icons/fa';




export default function Authentication() {
    const navigate = useNavigate();

    function onboard() {
        navigate('dashboard')
    }

    return (
        <div className="box-authentication">

            {/* <div className="box-logo-authentication"> */}
                {/* <img src={} alt="logo" /> */}
            {/* </div> */}

            <div className="box-input-authentication">

                <h2 className="title-clinica-authentication">Bem vindo a clinica !</h2>

                <form className="form-authetication" onSubmit={onboard}>

                    <div className="box-input-label--authetication">
                        <label htmlFor="Senha"><FaLock size={15} color="rgb(212, 92, 112)" /></label>
                        <input type="password" placeholder="Digite a senha" maxLength={9} className="input-authentication" />
                    </div>

                    <button type="submit" className="button-authentication">Entrar</button>

                </form>
            </div>
        </div>
    );
}
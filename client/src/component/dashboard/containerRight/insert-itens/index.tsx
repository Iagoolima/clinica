import { useState } from "react";
import "./insert-itens.css"
import { useNavigate } from "react-router-dom";
import api from "./../../../../api";




export default function Insert() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        pront:"", 
        nome:"",
        idade:"",
        cpf:"",
        tel:"",
        endereco:"",
        email: "",
    });

    const insertUser = async()=>{
        try{
            if (
                userData.pront === "" ||
                userData.nome === "" ||
                userData.idade === "" ||
                userData.cpf === "" ||
                userData.tel === "" ||
                userData.endereco === "" ||
                userData.email === ""
            ) {
               alert('Todos os campos devem ser preenchido')
                return;
            }
            const response = await api.post('/clientes/create', userData);
            console.log("Resposta do servidor:", response.data);
            alert('Cliente cadastrado !')
            navigate('/ficha-pdf', {state: userData})
        } catch(error){
            console.error("erro ao inserir cliente", error);
        }
       
    }


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    return (
        <div className="container-insert">
            <div className="input-insert">
                <label>Prontuario:</label>
                <input type="number" name="pront" onChange={handleChange} placeholder="Digite..."  required/>
            </div>

            <div className="input-insert">
                <label>Nome completo:</label>
                <input type="text" name="nome" onChange={handleChange} placeholder="Digite..." required />
            </div>

            <div className="input-insert">
                <label>Idade:</label>
                <input type="number" name="idade" onChange={handleChange}  placeholder="Digite..." required/>
            </div>

            <div className="input-insert">
                <label>CPF:</label>
                <input type="text" name="cpf" onChange={handleChange}  placeholder="Digite..." required/>
            </div>

            <div className="input-insert">
                <label>Telefone (whatsapp):</label>
                <input type="tel" name="tel" onChange={handleChange}  placeholder="Digite..." required/>
            </div>

            <div className="input-insert">
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange}  placeholder="Digite..." required/>
            </div>

            <div className="input-insert">
                <label>Endereço:</label>
                <input type="text" name="endereco" onChange={handleChange}  placeholder="Digite..." required/>
            </div>

            <div className="box-button-insert">
                <button onClick={insertUser}>Cadastrar e gerar PDF</button>
            </div>

        </div>
    )
}
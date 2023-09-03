import { useLocation, useNavigate } from "react-router-dom";
import './stylePDF.css'
import { useState } from "react";







export default function FichaPDF() {
    const [hideHeader, setHideHeader] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();




    const userData = location.state;


    //voltar tela de inicio
    function returnDashboard() {
        navigate('/dashboard');
    }

    function imprimirPDF() {
        setHideHeader(true);
        setTimeout(() => {
            window.print();
        }, 500)

        // Defina o cabeçalho de volta como visível após a impressão (use setTimeout para garantir)
        setTimeout(() => {
            setHideHeader(false);
        }, 1000);
    }







    return (
        <div className="container-pdf">
            <div className={`header-pdf ${hideHeader ? 'hide-header' : ''}`}>
                <button onClick={imprimirPDF}>IMPRIMIR FICHA</button>
                <button onClick={returnDashboard}>Sair</button>
            </div>
            <div className="box-pdf">
                <div className="box-title">
                    <h2>FICHA CADASTRAL</h2>
                </div>
                <div className="box-content-info">
                    <div className="box-data-ficha">
                        <h3>Nome:<span><p>{userData.nome}</p></span></h3>
                        <h3>Prontuario:<span><p>{userData.pront}</p></span></h3>
                    </div>
                    <div className="box-data-ficha">
                        <h3>Idade:<span><p>{userData.idade} anos</p></span></h3>
                        <h3>CPF:<span><p>{userData.cpf}</p></span></h3>
                        <h3>Telefone:<span><p>{userData.tel}</p></span></h3>
                    </div>
                    <div className="box-data-ficha">
                        <h3>Email:<span><p>{userData.email}</p></span></h3>
                        <h3>Endereço:<span><p>{userData.endereco}</p></span></h3>
                    </div>

                </div>
                <div className="list-anotacoes">
                    <h2>Anotações do procedimento:</h2>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    <div className="box-anotacoes">
                        <p>Data:______/______/______</p>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                        <div className="line-pdf"></div>
                    </div>
                    
                    
                   



                </div>

            </div>
        </div>
    )
}

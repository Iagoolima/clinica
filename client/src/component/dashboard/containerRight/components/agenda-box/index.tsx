import './agendaBox.css';
import { FaTrash } from 'react-icons/fa';

interface agendaBoxProps {
    id: number;
    dia: string;
    horario: string;
    pront: string;
    nome: string;
    tel: string;
    descricao: string;
    onDeleteAgenda: () => void;
}

export default function AgendaBox(props: agendaBoxProps) {

    return (
        <div className="agenda-box">
            <div className="data-agenda">
                <h3>DATA:<span> {props.dia}</span></h3>
                <h3>HORARIO:<span> {props.horario}</span></h3>
            </div>

            <div className="data-agenda">

                <h3>Nome:<span> {props.nome}</span></h3>
                <h3>prontuario:<span> {props.pront}</span></h3>
            </div>

            <div className="data-agenda">
                <h3>Telefone:<span> {props.tel}</span></h3>
            </div>

            <div className="data-agenda">
                <h3>Descrição:<span> {props.descricao}</span></h3>
            </div>

            <div className="icons-agenda">

                <FaTrash color='red' cursor={"pointer"} onClick={props.onDeleteAgenda} />

            </div>
        </div>
    )
}
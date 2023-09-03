import './client-box.css';
import { FaTrash, FaSearch, FaInfoCircle } from 'react-icons/fa';

interface clienteBoxProps {
    id: number;
    pront: string;
    name: string;
    tel: string;
    onInfoClick: () => void;
    onDeleteUser: () => void;
    onEditClick: () => void;
}

export default function ClientBox(props: clienteBoxProps) {
    return (
        <div className="client-box">

            <div className="data-client">
                <h3>prontuario:<span> {props.pront}</span></h3>
            </div>
            <div className="data-client">
                <h3>Nome:<span> {props.name}</span></h3>
            </div>
            <div className="data-client">
                <h3>Telefone:<span> {props.tel}</span></h3>
            </div>

            <div className="icons-client">

                <FaInfoCircle color='silver' cursor={"pointer"} onClick={props.onInfoClick} />

                <FaTrash color='red' cursor={"pointer"} onClick={props.onDeleteUser} />

            </div>

        </div>
    )
}
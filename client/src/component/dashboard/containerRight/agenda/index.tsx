import { useState, useEffect } from 'react';
import api from '../../../../api';
import './agenda.css'
import { format } from 'date-fns';



import { FaPlus } from 'react-icons/fa';
import AgendaBox from '../components/agenda-box';

interface agenda {
  id: number;
  dia: string;
  horario: string;
  nome: string;
  pront: string;
  tel: string;
  descricao: string;
  onDeleteAgenda: () => void;
}



export default function Agenda() {
  const [isModalAgenda, setIsModalAgenda] = useState(false);


  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [agendaToDelete, setAgendaToDelete] = useState<agenda | null>(null);

  const [agendas, setAgendas] = useState<agenda[]>([])









  const [agendaData, setAgendaData] = useState({
    dia: "",
    horario: "",
    nome: "",
    pront: "",
    tel: "",
    descricao: "",
  });

  const insertAgenda = async () => {

    try {
      if (
        agendaData.dia === "" ||
        agendaData.horario === "" ||
        agendaData.nome === "" ||
        agendaData.pront === "" ||
        agendaData.tel === "" ||
        agendaData.descricao === ""
      ) {
        alert('Todos os campos devem ser preenchido !')
        return;
      }
      const response = await api.post('/agenda/create', agendaData);
      console.log('resposta do servidor', response.data);

      setAgendaData({
        dia: "",
        horario: "",
        nome: "",
        pront: "",
        tel: "",
        descricao: "",
      });

      readAgenda();




    } catch (error) {
      console.error("erro ao salvar agenda", error)
    }

  }

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAgendaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };




  async function readAgenda() {
    try {
      const response = await api.get(`/agenda/read`);
      setAgendas(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendas:', error);
    }
  }


  const handleDeleteAgenda = (agendaItem: agenda) => {
    setAgendaToDelete(agendaItem); // Defina o item a ser excluído
    setIsDeleteModalVisible(true)
  };
  const handleDeleteAgendaConfirm = async () => {
    if (agendaToDelete) {
      try {
        const deleteUrl = `/agenda/delete/${agendaToDelete.id}`;
        console.log('Delete URL:', deleteUrl)
        await api.delete(`/agenda/delete/${agendaToDelete.id}`);

        setIsDeleteModalVisible(false);
        readAgenda();
      } catch (error) {
        console.error('Erro ao deletar o agenda:', error);
      }
    }
  };

  useEffect(() => {
    readAgenda();
  }, []);

  const formatDate = (dateString: string) => {
    const formattedDate = format(new Date(dateString), 'dd/MM/yyyy'); // Formato 'dd/MM/yyyy'
    return formattedDate;
  };

  // Função para formatar o horário
  const formatTime = (timeString: string) => {
    const formattedTime = format(new Date(`1970-01-01T${timeString}`), 'HH:mm'); // Formato 'HH:mm'
    return formattedTime;
  };


  return (
    <div className="container-agenda">
      <div className="box-header-agenda">
        <button onClick={() => setIsModalAgenda(!isModalAgenda)}><FaPlus /></button>
      </div>
      <div className="container-top-cadastro-agenda">
        {isModalAgenda && (
          <div className="container-register-agenda">
            <div className="box-register-agenda">
              <div className="box-header-register-agenda">
                <h2>Preencha os campos...</h2>
              </div>

              <div className="box-input-register-agenda">
                <div className="box-input-agenda">

                  <div className="input-agenda">
                    <label>Data:</label>
                    <input type="date" name="dia" value={agendaData.dia} placeholder="Digite..." onChange={handleChange} required />
                  </div>

                  <div className="input-agenda">
                    <label>Hora:</label>
                    <input type="time" name="horario" value={agendaData.horario} placeholder="Digite..." onChange={handleChange} required />
                  </div>

                </div>

                <div className="box-input-agenda">

                  <div className="input-agenda">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={agendaData.nome} placeholder="Digite..." onChange={handleChange} required />
                  </div>

                  <div className="input-agenda">
                    <label>Prontuario:</label>
                    <input type="number" name="pront" value={agendaData.pront} placeholder="Digite..." onChange={handleChange} required />
                  </div>

                </div>

                <div className="box-input-agenda">
                  <div className="input-agenda ">
                    <label>Telefone:</label>
                    <input type="text" name="tel" value={agendaData.tel} placeholder="Digite..." onChange={handleChange} required />
                  </div>
                </div>

                <div className="box-input-agenda">
                  <div className="input-agenda input-descricao">
                    <label>Descrição:</label>
                    <input type="text" name="descricao" value={agendaData.descricao} placeholder="Digite..." onChange={handleChange} required />
                  </div>
                </div>

                <div className="box-button-agenda-modal">
                  <button className="button-red-modal" onClick={() => setIsModalAgenda(false)}>Cancelar</button>
                  <button className="button-green-modal" onClick={insertAgenda} >Salvar</button>
                </div>
              </div>


            </div>
          </div>
        )}
      </div>
      <div className="container-agenda-modal">
        <div className="container-left-content-agenda">
          {agendas.map((agendaItem) => (
            <AgendaBox
              key={agendaItem.id}
              id={agendaItem.id}  // Adicione esta linha para passar o ID
              dia={formatDate(agendaItem.dia)} // Formata a data
              horario={formatTime(agendaItem.horario)}
              nome={agendaItem.nome}
              pront={agendaItem.pront}
              tel={agendaItem.tel}
              descricao={agendaItem.descricao}
              onDeleteAgenda={() => handleDeleteAgenda(agendaItem)}
            />

          ))
          }

        </div>
        <div className="container-right-modal">
          {isDeleteModalVisible && agendaToDelete && (
            <div className="container-modal-client">
              <div className="card-modal-client">
                <h2>Confirmar Deletar</h2>
                <p>Tem certeza de que deseja deeletar esse lembrete? <br /> Nome: {agendaToDelete?.nome} <br /> data:  {formatDate(agendaToDelete?.dia)} <br /> Horario: {formatTime(agendaToDelete?.horario)} </p>
                <div className="buttons-modal">
                  <button className="button-modal button-red-modal" onClick={() => setIsDeleteModalVisible(false)}>Cancelar</button>
                  <button className="button-modal button-green-modal" onClick={() => handleDeleteAgendaConfirm()}>Deletar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



    </div>

  );
}
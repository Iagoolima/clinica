import ClientBox from "../components/client-box";
import './client-itens.css'
import { FaSearch } from 'react-icons/fa';
import api from "../../../../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface cliente {
    id: number;
    pront: string;
    nome: string;
    idade: string;
    cpf: string;
    tel: string;
    email: string;
    endereco: string;
}

export default function Client() {
    const [searchText, setSearchText] = useState('');
    const [clients, setClients] = useState<cliente[]>([]);

    const [selectedClient, setSelectedClient] = useState<cliente | null>(null);
    const [isModalInfo, setIsModalInfo] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<cliente | null>(null);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editedClient, setEditedClient] = useState<cliente | null>(null);







    const handleSearch = async () => {
        try {
            const response = await api.get(`/clientes/read?search=${searchText}`);
            setClients(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };




    const handleInfoClick = (client: cliente) => {

        setSelectedClient(client);
        setIsModalInfo(true);
        setIsDeleteModalVisible(false);
    };






    useEffect(() => {
        handleSearch(); // Chama a função ao montar o componente, ess função é a função de exibir os usuarios do cadastro
    }, []);




    const handleDeleteClient = (client: cliente) => {
        setClientToDelete(client);
        setIsDeleteModalVisible(true);
        setIsModalInfo(false);
        setIsEditModalVisible(false);
    };


    const handleDeleteClientConfirm = async (client: cliente | null) => {
        if (client) {
            try {
                const deleteUrl = `/clientes/delete/${client.id}`;
                console.log('Delete URL:', deleteUrl)
                await api.delete(`/clientes/delete/${client.id}`);
                // Após a deleção, atualize a lista de clientes refazendo a busca de dados
                handleSearch();
                setIsDeleteModalVisible(false);
            } catch (error) {
                console.error('Erro ao deletar o cliente:', error);
            }
        }
    };


    const handleEditClick = (client: cliente) => {
        setIsModalInfo(false);
        setEditedClient(client);
        setIsEditModalVisible(true);
    };

    const handleSaveEdit = async () => {
        try {
            // Faça uma solicitação para atualizar o cliente no servidor
            if (editedClient) {
                await api.put(`/clientes/update/${editedClient.id}`, editedClient);
                setIsEditModalVisible(false);
                handleSearch(); // Atualize a lista de clientes após a edição
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            // Trate erros, se necessário
        }
    }

    const navigate = useNavigate();

    function imprimirPDF() {
        navigate('/ficha-pdf', { state: selectedClient })
    }



    return (
        <div className="container-Client">
            <div className="box-input-search">
                <input
                    type="text"
                    placeholder="Pesquise..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                />


                <button className="button-pesquisar" onClick={handleSearch}><FaSearch size={'15px'} color="silver" cursor={'pointer'} /></button>
            </div>



            <div className="container-client-modal">
                <div className="container-left-clientes">
                    {clients.map(client => (
                        <ClientBox
                            key={client.id}
                            pront={client.pront}
                            name={client.nome}
                            tel={client.tel}
                            id={client.id}
                            onInfoClick={() => handleInfoClick(client)}
                            onDeleteUser={() => handleDeleteClient(client)}
                            onEditClick={() => handleEditClick(client)} // Adicione esta linha

                        />
                    ))}
                </div>








                <div className="container-right-modal">


                    {isDeleteModalVisible && (
                        <div className="container-modal-client">
                            <div className="card-modal-client">
                                <h2>Confirmar Deletar</h2>
                                <p>Tem certeza de que deseja deletar o usuário: {clientToDelete?.nome}</p>
                                <div className="buttons-modal">
                                    <button className="button-modal button-red-modal" onClick={() => setIsDeleteModalVisible(false)}>Cancelar</button>
                                    <button className="button-modal button-green-modal" onClick={() => handleDeleteClientConfirm(clientToDelete)}>Deletar</button>
                                </div>
                            </div>
                        </div>
                    )}


                    {isModalInfo && (
                        <div className="container-modal-client">
                            <div className="card-modal-client">
                                <h2>Detalhes: </h2>

                                <p>Prontuário: {selectedClient?.pront}</p>
                                <p>Nome: {selectedClient?.nome}</p>
                                <p>Idade: {selectedClient?.idade}</p>
                                <p>CPF: {selectedClient?.cpf}</p>
                                <p>Telefone: {selectedClient?.tel}</p>
                                <p>Email: {selectedClient?.email}</p>
                                <p>Endereço: {selectedClient?.endereco}</p>
                                <div className="buttons-modal">
                                    <button className="button-modal button-orange-modal" onClick={() => selectedClient && handleEditClick(selectedClient)}>Editar</button>
                                    <button className="button-modal button-orange-modal" onClick={imprimirPDF}>PDF</button>
                                    <button className="button-modal button-orange-modal" onClick={() => setIsModalInfo(false)}>Fechar</button>


                                </div>
                            </div>
                        </div>
                    )}


                    {isEditModalVisible && (
                        <div className="container-modal-client">
                            <div className="card-modal-client">

                                <h3>Edite</h3>

                                <input className="edit-client"
                                    type="text"

                                    placeholder="Prontuario"
                                    value={editedClient?.pront || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, pront: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="Nome"
                                    value={editedClient?.nome || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, nome: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="idade"
                                    value={editedClient?.idade || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, idade: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="cpf"
                                    value={editedClient?.cpf || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, cpf: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="tel"
                                    value={editedClient?.tel || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, tel: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="endereço"
                                    value={editedClient?.endereco || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, endereco: e.target.value })}
                                />
                                <input
                                    className="edit-client"
                                    type="text"
                                    placeholder="email"
                                    value={editedClient?.email || ''}
                                    onChange={(e) => setEditedClient({ ...editedClient!, email: e.target.value })}
                                />


                                <div className="buttons-modal">
                                    <button className="button-modal button-red-modal" onClick={() => setIsEditModalVisible(false)}>Cancelar</button>
                                    <button className="button-modal button-green-modal" onClick={handleSaveEdit}>Salvar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>



        </div>
    );
}

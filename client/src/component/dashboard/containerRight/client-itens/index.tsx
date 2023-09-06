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


    //função de fazer pesquisa de usuario de acordo com nome e pronturario 
    const handleSearch = async () => {
        try {
            const response = await api.get(`/clientes/read?search=${searchText}`);
            setClients(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };


     // Chama a função ao montar o componente, ess função é a função de exibir os usuarios do cadastro
     useEffect(() => {
        handleSearch();
    }, []);


    //função de exibir o modal de informar os outros dados do usuario que nao exibido na linha 
    const handleInfoClick = (client: cliente) => {
        setSelectedClient(client);
        setIsModalInfo(true);
        setIsDeleteModalVisible(false);
    };

    //função de exibir o modal de confirmção para deletar usuario
    const handleDeleteClient = (client: cliente) => {
        setClientToDelete(client);
        setIsDeleteModalVisible(true);
        setIsModalInfo(false);
        setIsEditModalVisible(false);
    };

    //função de deletar usuario 
    const handleDeleteClientConfirm = async (client: cliente | null) => {
        if (client) {
            try {
                await api.delete(`/clientes/delete/${client.id}`);
                handleSearch(); //função de atualizar a exibição apos deletar usuarios
                setIsDeleteModalVisible(false);
            } catch (error) {
                console.error('Erro ao deletar o cliente:', error);
            }
        }
    };

    //função de exibir o modal de edição de usuario
    const handleEditClick = (client: cliente) => {
        setIsModalInfo(false);
        setEditedClient(client);
        setIsEditModalVisible(true);
    };

    //função de edição de usuario 
    const handleSaveEdit = async () => {
        try {
            if (editedClient) {
                await api.put(`/clientes/update/${editedClient.id}`, editedClient);
                setIsEditModalVisible(false);
                handleSearch(); //função de atualizar a exibição apos deletar usuarios
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            // Trate erros, se necessário
        }
    }



    const navigate = useNavigate();
    //função para navegar para pagina de imprimir pdf e passando o os dados do usuario pelo state onde fica armazenado os nomes.
    function imprimirPDF() {
        navigate('/ficha-pdf', { state: selectedClient })
    }



    return (
        <div className="container-Client">
            <div className="box-input-search">
                
                {/* campo de busca de usuario por nome e Prontuario */}
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
                        //box exibe todos os usuarios do banco de dados 
                        <ClientBox
                            key={client.id}
                            pront={client.pront}
                            name={client.nome}
                            tel={client.tel}
                            id={client.id}
                            onInfoClick={() => handleInfoClick(client)}//função de ver outras informações do cliente
                            onDeleteUser={() => handleDeleteClient(client)}// função de apagar usuario
                            onEditClick={() => handleEditClick(client)} // função para editar usuraio
                        />
                    ))}
                </div>








                <div className="container-right-modal">

                    {/* modal de exibição para deletar usuario  */}
                    {isDeleteModalVisible && (
                        <div className="container-modal-client">
                            <div className="card-modal-client">
                                <h2>Confirmar Deletar</h2>
                                <p>Tem certeza de que deseja deletar o usuário: {clientToDelete?.nome}</p>
                                <div className="buttons-modal">
                                    <button className="button-modal button-red-modal" onClick={() => setIsDeleteModalVisible(false)}>Cancelar</button>

                                    {/* qundo clicado na função de delete, ele chama a função passando o usuario selecionado com parametro */}
                                    <button className="button-modal button-green-modal" onClick={() => handleDeleteClientConfirm(clientToDelete)}>Deletar</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* modal de exibição para exibi outras informações de usuario  */}
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
                                    {/* função de editar os dados do usuario */}
                                    <button className="button-modal button-orange-modal" onClick={() => selectedClient && handleEditClick(selectedClient)}>Editar</button>
                                    {/* função de encaminha o usuario para tela de imprimir ficha  */}
                                    <button className="button-modal button-orange-modal" onClick={imprimirPDF}>PDF</button>
                                    <button className="button-modal button-orange-modal" onClick={() => setIsModalInfo(false)}>Fechar</button>


                                </div>
                            </div>
                        </div>
                    )}

                    {/* modal de exibição para dar opções de editar os dados de usuario  */}
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
                                    {/* quando clicado em salvar, ele manda um update ao banco de dados de dados atualizado o item  */}

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

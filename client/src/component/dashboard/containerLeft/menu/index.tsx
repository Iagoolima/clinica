import React, { useState } from 'react'

import Logo from '../../../../assets/logo-flora-evora.webp'
import "./menu.css"


import Agenda from '../../containerRight/agenda';
import Client from '../../containerRight/client-itens';
import Insert from '../../containerRight/insert-itens';
import Table from '../../containerRight/table';


import { FaBars } from 'react-icons/fa';
import { MdCalendarToday, MdPersonAdd } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { RiTableAltLine } from 'react-icons/ri';



interface MenuProps {
    handleComponentChange: (component: JSX.Element, title: string) => void;
}

export default function Menu({ handleComponentChange }: MenuProps) {
    //variavei para alternar elementos após click do menu 
    const [isMenuOpen, steIsMenuOpen] = useState(false);
    const [showButtonNames, setShowButtonNames] = useState(false);


    const handleMenuToggle = () => {
        steIsMenuOpen(!isMenuOpen);
        setShowButtonNames(!isMenuOpen);

    }

    const handleComponentClick = (component: JSX.Element, title: string) => {

        handleComponentChange(component, title);
    }


    return (
        <div id="container-left-menu" className={isMenuOpen ? 'open' : ''}>



            {/* <div id="box-img-menu" className={isMenuOpen ? 'open' : ''}> */}
                {/* <img src={} alt="logo" /> */}
            {/* </div> */}

            <button className='button-icon-menu' onClick={handleMenuToggle} ><FaBars /></button>

            <div id="box-button-menu" className={isMenuOpen ? 'open' : ''}>

                <button className="button-menu" onClick={() => handleComponentClick(<Agenda />, 'Agenda')}>
                    < MdCalendarToday className='button-icon-menu' />
                    <p>{showButtonNames && 'Agenda'}</p>
                </button>


                <button className="button-menu" onClick={() => handleComponentClick(<Client />, 'Pessoas Cadastradas')}>
                    <AiOutlineUser className='button-icon-menu' />
                    <p>{showButtonNames && 'Clientes'}</p>
                </button>

                <button className="button-menu" onClick={() => handleComponentClick(<Insert />, 'Adicionar')}>
                    <MdPersonAdd className='button-icon-menu' />
                    <p>{showButtonNames && 'Adicionar'}</p>
                </button>

                <button className="button-menu" onClick={() => handleComponentClick(<Table />, 'Tabela')}>
                    <RiTableAltLine className='button-icon-menu' />
                    <p>{showButtonNames && 'Procedimentos'}</p>
                </button>

            </div>
            <p className='footer-menu'>{isMenuOpen && 'Desenvolvido por Iago Silva'}</p>
        </div >
    )
}
import { useNavigate } from 'react-router-dom';
import './content.css'


interface ContentProps {
    selectedComponent: JSX.Element;
    title: string;
}

export default function Content({ selectedComponent, title }: ContentProps) {

    const navigate = useNavigate();

    function returnDashboard(){
            navigate('/')
    }

    return (
        <div className="container-content">
             <div className="box-title-exit-content"> 
                <h1 className='title-content'>{title}</h1>

                <button onClick={returnDashboard} className='button-text-content'> Sair</button>
            </div> 

            <div className="content-page">
                {selectedComponent}
            </div>
        </div>
    )
}
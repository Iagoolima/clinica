import "./styleTableBox.css";

interface propsTableBox{
    nameProcedimento:string,
    valorProcedimento:string,
}

export default function TableBox(props:propsTableBox){
    return(
            <div className="box-table">
                <h3>{props.nameProcedimento}</h3>
                <h3>R${props.valorProcedimento}</h3>
            </div>

    );
    
}
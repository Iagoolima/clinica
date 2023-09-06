import TableBox from "../components/table-box"
import "./table.css"

export default function Table() {
    return (
        <div className="container-table">
            <div className="box-tables">
                <TableBox nameProcedimento={"Limpeza de pele"} valorProcedimento={"100,00"} />
                <TableBox nameProcedimento={"Micropigmentação"} valorProcedimento={"150,00"} />
            </div>

            <div className="box-tables">
                <TableBox nameProcedimento={"Design de sobrancelha"} valorProcedimento={"80,00"} />
                <TableBox nameProcedimento={"Depilação a laser"} valorProcedimento={"70,00"} />
            </div>

            <div className="box-tables">
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
            </div>

            <div className="box-tables">
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
            </div>

            <div className="box-tables">
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
            </div>

            <div className="box-tables">
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
                <TableBox nameProcedimento={"Depilação na cera"} valorProcedimento={"100,00"} />
            </div>



        </div>
    )
}
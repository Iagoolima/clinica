import Authentication from "../../component/login/authentication";
import "./login.css"

export default function Login(){
    return(
        <div className="container-login">

            <div className="container-left-login">
                <Authentication/>
            </div>

            <div className="container-right-login">
                
            </div>
            
        </div>
    )
}
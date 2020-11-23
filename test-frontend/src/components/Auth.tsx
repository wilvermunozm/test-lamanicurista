import React from 'react'

function Auth() : JSX.Element {

    function onLoginClick() : void {
        window.location.href = "http://localhost:8888/login";
    }

    return (
     <div className={"container mt-5"}>
         <h1>Test Lider Full Stack <b>Wilver Muñoz</b></h1>
         <div className="card">
             <div className="card-body">
                 <img src="https://lamanicurista.com/wp-content/uploads/2019/01/Logo-La-manicurista-1.png" alt=""/>
                 <button onClick={onLoginClick} className={"btn btn-primary btn-block"} >Iniciar sesión</button>
             </div>
         </div>

     </div>
    );
  }
  
  export default Auth;
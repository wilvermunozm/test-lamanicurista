import React from 'react'
import loadingGif from "../assets/loading.gif";
import {HeaderProps} from "../types/HeaderProps";

function Header(props : HeaderProps) : JSX.Element {

    function onLoginClick() : void {
        window.location.href = "http://localhost:8888/login";
    }

    return (
        <div className="navbar-expand-lg navbar-primary bg-primary p-2">
            <div className="row container p-2">
                <div className="col-md-2">
                    <img className={"w-50"} src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt=""/>
                    <h2>Spotify  WM</h2>
                </div>
                <div className="col-md-6 offset-md-3 form-inline">
                    <input placeholder={"Nombre de la canción"} className={"form-control"} type="text" value={props.input} onChange={props.onInputChange}/>
                    <button className={"btn btn-success"} onClick={props.onClickSearch}>Buscar</button>
                </div>
                <div className="col-md-1">
                    {
                        (props.loading)?( <img src={loadingGif} alt=""/>) : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
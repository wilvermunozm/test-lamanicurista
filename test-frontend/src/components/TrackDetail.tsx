import {TrackDetailProps} from "../types/TrackDetailProps";
import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {ITrack} from "../interface/ITrack";
import {strict} from "assert";

function TrackDetail(props : TrackDetailProps) : JSX.Element {

    const track : ITrack = props.track;
    const duration : number = (track.duration / 1000) / 60;
    const durationString = duration.toLocaleString(undefined,{maximumFractionDigits:2}) + " Minutos"

    return (
        <Modal
            size={"lg"}
            show={props.show}
            backdrop="static"
            keyboard={false}
            onHide={props.onClickClose}
        >
            <Modal.Header closeButton >
                <Modal.Title>{track.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <img className={"w-100"} src={track.image} alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h2>{track.description}</h2>
                        <p><b>Artista: </b> {track.artist}</p>
                        <p><b>Duration: </b> {durationString}</p>
                        <p><b>Álbum: </b> {track.album}</p>
                        <p><b>Fecha: </b> {track.date}</p>

                    </div>
                </div>
            </Modal.Body>

        </Modal>
    );
}

export default TrackDetail
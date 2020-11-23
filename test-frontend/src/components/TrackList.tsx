import React, {Fragment, useState} from "react";
import {TrackProps} from "../types/TrackProps";
import {ITrack} from "../interface/ITrack";
import TrackDetail from "./TrackDetail";

function TrackList(props : TrackProps) : JSX.Element {

    const tracks : ITrack[] = props.tracks;
    const [showDetail,setShowDetail] = useState<boolean>(false)
    const [trackDetail,setTrackDetail] = useState<ITrack>()

    const handleDetailClick = (track : ITrack) => {
        setTrackDetail(track)
        setShowDetail(true)
    }

    return (
        <div className="row">
            {
                (trackDetail != undefined && showDetail) ?
                    (
                        <TrackDetail track={trackDetail} show={showDetail} onClickClose={() => setShowDetail(false)}/>
                    ) : ''
            }

            {
                tracks.map((track :ITrack) => (
                    <div key={track.id} className={"card col-md-2"}>
                        <div className="card-body">
                            <img className={"card-img-top"} src={track.image} alt=""/>
                            <h5 className="card-title">{track.name}</h5>
                            <button onClick={(e : React.MouseEvent<HTMLButtonElement>) => handleDetailClick(track)} className="btn btn-success">Ver</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TrackList;
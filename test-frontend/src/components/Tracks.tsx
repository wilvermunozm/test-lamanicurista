import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react'
import {ITrack} from "../interface/ITrack";
import TrackList from "./TrackList";
import Paginator from "./Paginator";
import Header from "./Header";
import RecordNotFound from "./RecordNotFound";
import TrackDetail from "./TrackDetail";
import {Modal} from "react-bootstrap";


function Tracks() : JSX.Element{
    const limit :number = 50;

    const [tracks,setTracks] = useState<ITrack[]>([]);
    const [input,setInputValue] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)
    const [offset,setOffset] = useState<number>(0)
    const [totalResults,setTotalResult] = useState<number>(0)
    const [trackDetail,setTrackDetail] = useState<ITrack>()

    const jsonToTrack = (json : any) =>  {
        return {
            id:json["id"],
            name:json["name"],
            image: json['album']['images'][0]['url'],
            album : json['album']['name'],
            artist: json['artists'][0]['name'],
            duration: json["duration_ms"],
            date : json['album']['release_date']
        }
    }

    const getTracks = () => {
        try {
            axios.get('http://localhost:8888/search',{ params: {
                    q:input,
                    access_token: localStorage.getItem("access_token"),
                    offset: offset * limit,
                    limit:limit }
            }).then((res)=>{
                if(res.data.tracks){
                    setLoading(false)
                    setTotalResult(res.data.tracks.total)
                    const tracksTmp : ITrack[] = res.data.tracks.items.map((item : any)=>{
                        return jsonToTrack(item)
                    })
                    setTracks(tracksTmp)
                }
            })
        } catch (err) {
            setLoading(false)
            alert("Lo sentimos, no podemos procesar tu solicitud")
        }
    }

    if (loading)
        getTracks()

    const onClickSearch = () =>{
        if(input != "" && !loading)
            setLoading(true)
        else
            alert("Debe haber un valor en la caja de búsqueda")
    }

    const  handlePageClick = (data : any) =>{
        setOffset(data.selected)
        setLoading(true)
    }


    return (
        <Fragment>
            <Header onInputChange={(e : React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onClickSearch={onClickSearch}
                    loading={loading}
                    input={input}/>

            <div className={"container"}>
                {
                    (tracks.length > 0 ) ? (
                            <Fragment>
                                <Paginator pages={totalResults / limit} onClickPage={handlePageClick}/>
                                <TrackList tracks={tracks} />
                            </Fragment>
                    ) : (
                       <RecordNotFound/>
                    )
                }
            </div>




        </Fragment>
    );
}

export  default Tracks;
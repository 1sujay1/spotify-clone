import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function Body({ headerBg }) {
    const [{ token, selectedPlayListId, selectedPlayList }, dispatch] = useStateProvider()
    useEffect(() => {
        const getInitPlayList = async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlayListId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log("response", data);
            const selectedPlayList = {
                id: data.id,
                name: data.name,
                description: data.description.startsWith("<a") ? '' : data.description,
                image: data.images[0].url,
                tracks: data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    image: track.album.images[2].url,
                    artists: track.artists.map(({ name }) => name),
                    album: track.album.name,
                    duration: track.duration_ms,
                    context_uri: track.album.uri,
                    track_number: track.track_number
                }))
            }
            dispatch({ type: reducerCases.SET_PLAYLIST, payload: selectedPlayList })
            console.log("selectedPlayList", selectedPlayList);
        }
        getInitPlayList()
    }, [token, dispatch, selectedPlayListId])
    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }
    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        const response = await axios.put(`https://api.spotify.com/v1/me/player/play`, {
            context_uri,
            offset: {
                position: track_number - 1
            },
            position_ms: 0
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 204) {
            const currentPlaying = {
                id,
                name,
                artists,
                image,
                // context_uri,
                // track_number
            }
            dispatch({ type: reducerCases.SET_PLAYING, payload: currentPlaying })
            dispatch({ type: reducerCases.SET_PLAYER_STATE, payload: true })
        } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, payload: true })
        }
    }
    return (
        <Container headerBg={headerBg}>
            {
                selectedPlayList && (
                    <>
                        <div className="playlist">
                            <div className="image">
                                <img src={selectedPlayList.image} alt='selectedPlayList' />
                            </div>
                            <div className="details">
                                <span className="type">
                                    PLAYLISTS
                                </span>
                                <h1 className='title'>{selectedPlayList.name}</h1>
                                <p>{selectedPlayList.description}</p>
                            </div>
                        </div>
                        <div className="list">
                            <div className="header_row">
                                <div className="col">
                                    <span>#</span>
                                </div>
                                <div className="col">
                                    <span>TITLE</span>
                                </div>
                                <div className="col">
                                    <span>ALBUM</span>
                                </div>
                                <div className="col">
                                    <span><AiFillClockCircle /></span>
                                </div>
                            </div>
                        </div>
                        <div className="tracks">
                            {selectedPlayList.tracks.map(({ id, name, duration, artists, image, album, context_uri, track_number }, index) => {
                                return (
                                    <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                                        <div className="col">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="col detail">
                                            <div className="image">
                                                <img src={image} alt='track' />
                                            </div>
                                            <div className="info">
                                                <span className="name">{name}</span>
                                                <span>{artists}</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <span>{album}</span>
                                        </div>
                                        <div className="col">
                                            <span>{msToMinutesAndSeconds(duration)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )
            }
        </Container>
    )
}

const Container = styled.div`
    .playlist{
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image{
            img{
                height: 15rem;
                box-shadow: rgba(0,0,0,0.25) 0px 25px 50px 12px;
            }
        }
        .details{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color:#e0dede;
            .title{
                color: white;
                font-size: 4rem;
            }

        }
    }
    .list{
        position: sticky;
            top: 15vh;
        .header_row{
            display: grid;
            grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
            color: #dddcdc;
            margin: 1rem 0 0 0;
           
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color: ${({ headerBg }) => headerBg ? "#000000dc" : "none"};
        }
    }
    .tracks{
        margin: 0 2rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 5rem;
        .row{
            padding: 0.5rem 1rem;
            display: grid;
            grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
            &:hover{
                background-color: rgba(0,0,0,0.7);
            }
            .col{
                display: flex;
                align-items: center;
                color: #dddcdc;
                img{
                    height: 40px;
                }

            }
            .detail{
                display: flex;
                gap: 1rem;
                .info{
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

`

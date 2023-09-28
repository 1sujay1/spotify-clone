import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillClockCircle } from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function Body() {
    const [{ token, user, selectedPlayListId, selectedPlayList }, dispatch] = useStateProvider()
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
    return (
        <Container>
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
                                    <div className="row" key={id}>
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
                                            <span>{duration}</span>
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
    

`

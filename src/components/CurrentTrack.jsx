import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
export default function CurrentTrack() {
    const [{ token, playlists, playerState, currentlyPlaying }, dispatch] = useStateProvider();
    console.log("currentlyPlaying", currentlyPlaying);
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            console.log("response", response);
            if (response.data != "") {
                const { item } = response.data
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    album: item.album.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url
                }
                dispatch({ type: reducerCases.SET_PLAYING, payload: currentlyPlaying })
            }

        }
        getCurrentTrack()
    }, [token, dispatch])

    return (
        <Container>
            {
                currentlyPlaying && (
                    <div className="track">
                        <div className="track_image">
                            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
                        </div>
                        <div className="track_info">
                            <h4>{currentlyPlaying.name}</h4>
                            <h6>{currentlyPlaying?.artists?.join(', ')}</h6>
                        </div>
                    </div>
                )

            }
        </Container>
    )
}

const Container = styled.div`
    
.track{
   display :flex ;
   align-items: center;
   gap: 1rem;
   .track_info{
       display: flex;
       flex-direction: column;
       gap: 0.3rem;
       h4{
        color: white;
        margin: 0;
       }
       h6{
        color: #b3b3b3;
        margin: 0;
       }
   }
}
`

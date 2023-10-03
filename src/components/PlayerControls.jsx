import React from 'react'
import styled from 'styled-components'
import { BsFillPauseCircleFill, BsShuffle, BsPlayCircleFill } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { FiRepeat } from 'react-icons/fi'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'
import { configs } from '../utils/config'

export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();


    const changeTrack = async (type) => {
        var response = "";
        if (configs.isProduction) {
            await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }

        console.log("response in playercontrols", response);


        if (response && response.data !== "") {
            const { item } = response.data
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                album: item.album.name,
                artists: item.artists.map((artist) => artist.name),
                image: item.album.images[2].url
            }
            dispatch({ type: reducerCases.SET_PLAYING, payload: currentlyPlaying })
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, payload: null })
        }
    }

    const changeState = async () => {
        const state = playerState ? "pause" : 'play';
        if (configs.isProduction) {
            const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log("response", response);
        }
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState })
    }

    return (
        <Container>
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={changeTrack("previous")} />
            </div>
            <div className="state">
                {playerState ? <BsFillPauseCircleFill onClick={changeState} /> : <BsPlayCircleFill onClick={changeState} />}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
svg{
    color:#b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover{
color:white
    }
}
.state{
    svg{
        color:white
    }
}
.previous,.state,.next{
    font-size: 2rem;
}
`
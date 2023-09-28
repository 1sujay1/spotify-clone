import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'
import styled from 'styled-components'

export default function PlayLists() {
    const [{ token, playlists }, dispatch] = useStateProvider()
    useEffect(() => {
        const getPlayLists = async () => {
            const resp = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const { items } = resp.data;
            const playlists = items.map(({ name, id }) => { return { name, id } })

            console.log("response", items);
            console.log("playlists", playlists);
            dispatch({ type: reducerCases.SET_PLAYLISTS, payload: playlists })
        }
        getPlayLists()
    }, [token, dispatch])

    return (
        <Container>
            <ul>
                {
                    playlists.map(({ name, id }) => {
                        return <li key={id}>{name}</li>
                    })
                }

            </ul>
        </Container>
    )
}

const Container = styled.div`
height: 100%;
overflow: hidden;
    ul{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 0.7rem;
        &-thumb{
            background-color: rgba(255,255,255,0.6);
        }
    }
    li{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
            color: #fff;
        }
    }
}
`

import React from "react";
import styled from 'styled-components'

const Login = () => {

    // useEffect(() => {
    //     let baseURL = window.location.href;
    //     localStorage.setItem('baseURL', baseURL)
    // }, [])
    const handleClick = () => {
        const clientId = "6277cd9a426b4fb190d515a6db4a0ced"
        const redirectUrl = "https://voluble-blini-7b1515.netlify.app/"
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope = ['user-read-email', 'user-read-private', 'user-read-playback-state',
            'user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played']
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(' ')}&response_type=token&show_dialog=true`
    }
    return (
        <Container>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
        </Container>
    )
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content: center;
height: 100vh;
width: 100vw;
background-color: #1db954;
gap: 5rem;
img{
    height: 20vh;
}
button{
    padding: 1rem 5rem;
    border-radius:5rem;
    border: none ;
    background-color: black;
    color: #49f585;
    font-size: 1.5rem;
    cursor: pointer;
}
`
export default Login
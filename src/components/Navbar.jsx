import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'
export default function Navbar({ navBg }) {
    console.log("navBg", navBg);
    const [{ user }] = useStateProvider()
    return (
        <Container navBg={navBg}>
            <div className="search_bar">
                <FaSearch />
                <input type="text" placeholder='Artists, songs, podcasts' />
            </div>
            <div className="avatar">
                <a href="/#">
                    <CgProfile />
                    <span>{user?.name}</span>
                </a>
            </div>
        </Container>
    )
}
const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 2rem;
height: 15vh;
position: sticky;
top: 0;
transition: 0.3s ease-in-out;
background-color: ${({ navBg }) => navBg ? "rgba(0,0,0,0.7)" : "none"};
.search_bar{
    background-color: white;
    width: 30%;
    padding:0.4rem 1rem;
    border-radius:2rem;
display: flex;
align-items: center;
gap: 0.5rem;
input{
    border: none;
    height: 2rem;
    width: 100%;
    &:focus{
        outline:none
    }
}

}
.avatar{
background-color: black;
padding: 0.3rem 0.4rem;
padding-right: 1rem;
border-radius: 2rem;
display: flex;
    align-items: center;
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: white;
        text-decoration: none;
        font-weight: bold;
        svg{
            font-size: 1.3rem;
            background-color: #282828;
            border-radius: 1rem;
            padding: 0.2rem;
            color: #c5c5c5;
        }
    }
}
`

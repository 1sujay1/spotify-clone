import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
export default function Navbar() {
    return (
        <Container>
            <div className="search_bar">
                <FaSearch />
            </div>
        </Container>
    )
}
const Container = styled.div`

`

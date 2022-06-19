import React from 'react'
import styled from "styled-components";

const Errorpage = () => {
    return (
        <Container>
            <h2 style={{textAlign: "center", margin: "2rem"}}>404 - Page Not Found</h2>
        </Container>
    )
}

const Container = styled.div`
height: 90vh;
  width: 100%;
`;

export default Errorpage

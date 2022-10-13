import React from 'react'
import {Container, Nav, Navbar}from 'react-bootstrap'
import Link from 'next/link'

const MainNav=()=>{
    return(
        <div>
        <Navbar className="fix-top" variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand >WUDI XIA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                         <Link href="/" passHref>
                            <Nav.Link>Movies</Nav.Link>
                         </Link>
                         <Link href="/about" passHref>
                            <Nav.Link>About</Nav.Link>
                         </Link>  
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/>
        <br/>
        </div>

        
    )
}

export default MainNav
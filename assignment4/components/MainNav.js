import React from 'react'
import {Container, Nav, Navbar, Form, Button}from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from 'next/router'

const MainNav=()=>{
    const [newRoute,setNewRoute]=useState('');
    const router=useRouter();
    function handleSubmit(e){
        e.preventDefault();
        console.log(`search submitted- ${newRoute}`);
        router.push(`/artwork?title=true&q=${newRoute}`)
    }
    return (
        <>
        <Navbar className="fix-top" variant="dark" bg="dark" expand="lg">
          <Container>
            <Navbar.Brand>Wudi Xia</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" pressHref>Home</Nav.Link>
                <Nav.Link href="/search" pressHref>Advanced Search</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={newRoute}
                onChange={(e)=>setNewRoute(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/>
        <br/>
        </>
        
      );
}

export default MainNav
import React from 'react'
import {Container, Nav, Navbar, Form, Button, NavDropdown }from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

const MainNav=()=>{
    const [newRoute,setNewRoute]=useState('');

    const [isExpanded,setIsExpanded]=useState(false)
    const [searchHistory, setSearchHistory]=useAtom(searchHistoryAtom)

    const router=useRouter();

    function handleSubmit(e){
        e.preventDefault();
        setIsExpanded(false);
        console.log(`search submitted- ${newRoute}`);
        router.push(`/artwork?title=true&q=${newRoute}`)
        setSearchHistory(current => [...current,`title=true&q=${newRoute}`]);
        e.target.reset()
    }
    return (
        <>
          <Navbar className="fix-top" variant="dark" bg="dark" expand="lg" expanded={isExpanded}>
            <Container>
              <Navbar.Brand>Wudi Xia</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={(e)=>{setIsExpanded(!isExpanded)}}/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/" passHref onClick={(e)=>{setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link>
                    <Nav.Link href="/search" passHref onClick={(e)=>{setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                </Nav>
                &nbsp; 
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={newRoute}
                  onChange={(e)=>setNewRoute(e.target.value)}
                  />
                  <Button type="submit" variant="outline-success">Search</Button>
                </Form>&nbsp; 
                <Nav>
                  <NavDropdown title="User Name" id="basic-nav-dropdown">
                    <Nav.Link href="/favourites" passHref>
                      <NavDropdown.Item  onClick={(e)=>{setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                    </Nav.Link>
                    <Nav.Link href="/history" passHref>
                      <NavDropdown.Item  onClick={(e)=>{setIsExpanded(false)}} active={router.pathname === "/history"}>History</NavDropdown.Item>
                    </Nav.Link>     
                  </NavDropdown>
                </Nav> 
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <br/>
          <br/>
        </>
        
      );
}

export default MainNav
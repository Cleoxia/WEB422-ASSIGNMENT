/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ___WUDI XIA______ Student ID: ___108088154____ Date: ____2022-10-12______
*
*
********************************************************************************/ 

import React from 'react'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { Pagination, Accordion } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import MovieDetails from '../components/MovieDetails'


const Home=()=> {
  const [page, setPage]=useState(1)
  const [pageData, setPageData]=useState([])
  const { data, error } = useSWR(`https://encouraging-gray-chameleon.cyclic.app/api/movies?page=${page}&perPage=10`);
  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);
  const previous=()=>{
    if(page>1){
      setPage(page-1)
    }
  }  
  const next=()=>{
    setPage(page+1)
  }

  return(
  <>
    <PageHeader text='Film Collection : Sorted by Date'/>
    <Accordion defaultActiveKey="0">
      {pageData.map((item,index)=>{
        return(
          <Accordion.Item eventKey={item._id} key={index}>
          <Accordion.Header>
            <strong>{item.title}</strong>&nbsp;({item.year}: {item.directors.join()})
          </Accordion.Header>
          <Accordion.Body>
          <MovieDetails movie={item}/>
          </Accordion.Body>
          </Accordion.Item>
        )}
      )}
    </Accordion>
    <br/><br/>
    <Pagination>
      <Pagination.Prev onClick={previous}/>
      <Pagination.Item>{page}</Pagination.Item>
      <Pagination.Next onClick={next}/>
    </Pagination>
  </>
  )
}
export default Home

import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from 'react-bootstrap/Card';

const PageHeader=({text})=> {
  return(
    <div>
      <Card className="bg-light">
        <Card.Body>
           {text} 
        </Card.Body>
      </Card>
      <br/>
    </div>
    
  )
}
export default PageHeader
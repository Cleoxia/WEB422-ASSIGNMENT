import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import MovieDetails from '../components/MovieDetails'
import PageHeader from '../components/PageHeader'

export function getStaticProps(){
    return new Promise((resolve,reject)=>{
        fetch('https://encouraging-gray-chameleon.cyclic.app/api/movies/573a139bf29313caabcf3d23')
        .then(res=>res.json())
        .then(data=>{
            resolve({props:{movie:data}})
        })
    })
}

const About=(props)=>{
    
    return(
       <div>
        <PageHeader text='About the Developer- WUDI XIA'/>
        <Card className="bg-light">
        <Card.Body>
        <p>Hi this is Cleo. This is the Web422 assignment about using React. 
            This site is all about movies. Among all movies listed here, my favourite
            is &quot;The Matrix&quot;. I was really young when I first watch Matrix and I could not
            understand it. However, as time goes one, I find the concept of Matrix is 
            so attractive. I could not stop myself watching it over and over, and I always
            question myself what is actually &quot;real life&quot;.
        </p>
        Here is the link to my favourite movie <Link href="/movies/The Matrix" passHref>&quot;The Matrix&quot;</Link>. Hope you
        enjoy and find the &quot;real world&quot;.
        <br/><br/>
        </Card.Body>
        <MovieDetails movie={props.movie} />	
       </Card>
       </div>
    )
}

export default About
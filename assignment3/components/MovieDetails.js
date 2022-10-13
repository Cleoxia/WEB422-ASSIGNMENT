import React from 'react'
import styles from '../styles/Home.module.css'
import {Container,Row,Col} from 'react-bootstrap'
const MovieDetails=(props)=> {
  return(
    <div>
      <Container>
      <Row>
       {props.movie.poster?
          <Col md>
            <img src={props.movie?.poster} alt="poster" className="w-100" />
            <br /><br />
          </Col>
          : <></>
       }
       <Col md>
        <strong>Directed By:</strong> {props.movie.directors?props.movie.directors.join(): 'N/A'}
        <br/><br/>
        <p>{props.movie?.fullplot}</p>
        <strong>Cast:</strong> {props.movie.cast? props.movie.cast.join(): 'N/A'}
        <br/><br/>
        <strong>Awards:</strong> {props.movie?.awards.text}<br/>
        <strong>IMDB Rating:</strong> {props.movie?.imdb.rating} ({props.movie?.imdb.votes} votes)
        </Col>
      </Row>
    </Container>
    </div>
  )
}
export default MovieDetails
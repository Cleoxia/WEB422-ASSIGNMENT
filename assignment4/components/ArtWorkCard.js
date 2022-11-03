import React from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
const ArtWorkCard=(objectID)=>{
    
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    if(error){
        return (<Error statusCode={404}/>)

    }
    
    else if(data.length>0){
        return (
            <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.primaryImageSmall?data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}/>
                <Card.Body>
                    <Card.Title>{data.title?data.title:'N/A'}</Card.Title>
                    <br/>
                    <Card.Text>
                        Date:{data.objectDate?data.objectDate:'N/A'}<br/>
                        Classification:{data.classification?data.classification:'N/A'}<br/>
                        Medium:{data.medium?data.medium:'N/A'}<br/>
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} pressHref>
                        <Button variant="primary">{objectID}</Button>
                    </Link>
                </Card.Body>
            </Card>
            </>
        )
    }
    else{
        return null
    }
    

}
export default ArtWorkCard
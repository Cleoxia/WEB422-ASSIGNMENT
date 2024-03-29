import React from 'react'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import Error from 'next/error';
import {Row,Col,Card,Pagination} from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard';


const PER_PAGE =12;
const Index=()=>{
  const [page, setPage]=useState(1);
  const [artworkList, setArtworkList]=useState([]);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
  useEffect(() => {
    if (data) {
        const results=[];
        for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
            results.push(chunk);
        }
          
        setArtworkList(results);
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
  
  if(error){
    return (<Error statusCode={404}/>)
  }

  if(artworkList!= null && artworkList!=undefined){
    console.log(artworkList);
    
    
    return(
        <>
        <Row className="gy-4">
           {artworkList.length>0?
           artworkList[page-1].map((item)=>{
            return(
                <Col lg={3} key={item}>
                    <ArtworkCard objectID={item} />
                </Col>
            )})
           :<Card>
            <h4>Nothing Here</h4>
            Try searching for something else.
            </Card>
           }
        </Row> 
        <br/>
        {artworkList.length>0?
        <Row>
            <Col>
                <Pagination>
                    <Pagination.Prev onClick={previous}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    {artworkList[page]?<><Pagination.Next onClick={next}/></>:<></>}
                    
                </Pagination>
            </Col>
        </Row>
        :<></>}
        </>
      )
      
  }
  else{
    return null
  }


}
export default Index
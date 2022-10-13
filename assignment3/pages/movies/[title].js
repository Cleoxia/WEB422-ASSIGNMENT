import React from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import MovieDetails from '../../components/MovieDetails'
import Error from 'next/error'
import PageHeader from '../../components/PageHeader'

const  Movie=()=>{
    const router=useRouter()
    const {title}=router.query
    const { data, error } = useSWR(`https://encouraging-gray-chameleon.cyclic.app/api/movies?page=1&perPage=10&title=${title}`);
    if(data==null || data==undefined){
        return null
    }
    else{
        if(data.length==0){
            return (<><Error statusCode={404}/></>)
        }
        else{
            console.log(data)
            return(
                <>
                    {data.map(movie=>(
                        <div key={movie._id}>
                            <PageHeader text={movie.title}/>
                            <MovieDetails movie={movie}/>
                        </div>
                    ))}
                </>   
            )
        }  
    }
}

export default Movie
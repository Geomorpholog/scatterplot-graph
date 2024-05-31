import useSWR from 'swr';
import Graph from './Graph.js'
import Loading from "./Loading.js"
import Error from "./Error.js"

export default function GetData(props){
    const fetcher = (url) => fetch(url)
          .then((response) => {
             return response.json();
           })  
    const { data, error, isLoading } = useSWR(
        props.url,
         fetcher)

    if (isLoading) return <Loading/>
    if (error) return <Error/>
    return (
        <Graph 
        data = {data}
        width = {props.width} 
        height = {props.height} 
        padding = {props.padding}
        />    
    )           
}
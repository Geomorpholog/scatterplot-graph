import {useRef, useEffect} from "react";
import * as d3 from "d3";

export default function Graph(props){
    const width = props.width;
    const height = props.height;
    const padding = props.padding;
    const dataSet = props.data;
    const year = dataSet.map(d => (d["Year"]))
    const time = ( dataSet.map(d => new Date('January 01, 1970 01:'+d["Time"])))
    //console.log(dataSet);
  //  console.log(year);
  //  console.log(time);
    const root = useRef();
    const leg = useRef();
    const x = d3.scaleTime([d3.min(year)-1,d3.max(year)+1],[padding,width-padding])
    const y = d3.scaleTime([d3.max(time),d3.min(time)],[height - padding,padding])
    
   useEffect(() => void d3.select(root.current)
                          .selectAll("circle")
                          .data(dataSet)
                          .enter()
                          .append("circle")
                          .attr("class","dot")
                          .attr("data-yvalue",d => new Date('January 01, 1970 01:'+d["Time"]))
                          .attr("data-xvalue",d => d["Year"])
                          .attr("cx",d => x(d["Year"]))
                          .attr("cy",d => y(new Date('January 01, 1970 01:'+d["Time"])))
                          .attr("opacity","0.7")
                          .attr("stroke","var(--color1)")
                          .attr("fill",d => d.Doping !==''? "var(--background3)":"var(--color3)")
                          .attr("r",padding/10),
                           console.log( (dataSet.map(d => y(new Date('January 01, 1970 01:'+d["Time"])))))
    )
    

    useEffect(() => void d3.select(root.current)
                           .append("g")
                           .attr("transform", "translate(0," + (props.height - props.padding) + ")")
                           .call(d3.axisBottom(x).tickFormat(d3.format('d')))
                           .attr("id","x-axis")
    )
    useEffect(() => void d3.select(root.current)
                           .append("g")
                           .attr("transform", "translate("+ props.padding + "," + 0 + ")")
                           .call(d3.axisLeft(y).tickFormat(d3.timeFormat('%M:%S')))
                           .attr("id","y-axis")
)
    useEffect(() => void d3.select(root.current) 
                       .append("rect")
                       .attr("width",width +"px")
                       .attr("height",height+"px")
                       .attr("stroke","var(--color3)")
                       .attr("fill","none")
)
   
useEffect(() => void d3.select(leg.current) 
                           .append("rect")
                           
                           

)    

    return (    
        <div>
            <svg width = {props.width+"px"} height = {props.height+"px"} ref = {root}> 
        
            </svg>
            <div ref = {leg} ></div>
        </div>
    
    
    )
  }
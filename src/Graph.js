import {useRef, useEffect} from "react";
import * as d3 from "d3";

export default function Graph(props){
    const width = props.width;
    const height = props.height;
    const padding = props.padding;
    const dataSet = props.data;
    const year = dataSet.map(d => (d["Year"]))
    const time = ( dataSet.map(d => new Date('January 01, 1970 01:'+d["Time"])))
    const root = useRef();
    const windows = useRef();
    const t = useRef("#tooltip")
    const x = d3.scaleTime([d3.min(year)-1,d3.max(year)+1],[padding,width-padding])
    const y = d3.scaleTime([d3.max(time),d3.min(time)],[height - padding,padding])

    const tooltip = function(event){d3.select(windows.current)
                               .append("div")
                               .attr("id","tooltip")
                               .attr("data-year",this.getAttribute("data-xvalue"))
                               .style("position","absolute")
                               .style("top", event.clientY - height/7 + "px")
                               .style("left", event.clientX + "px")
                               .style("width",width/7+"px")
                               .style("height",height/7+"px")
                               .style("background","var(--background2")
                               .html("Year:"+this.getAttribute("data-xvalue") +"<br>"+ "Time:" + (this.getAttribute("time")) + "<br>" + "Name:" + (this.getAttribute("name")) + "<br>" +  (this.getAttribute("doping")))
                    } 
    
   useEffect(() => void d3.select(root.current)
                          .selectAll("circle")
                          .data(dataSet)
                          .enter()
                          .append("circle")
                          .attr("className","dot")
                          .attr("name", d => d["Name"])
                          .attr("time", d => d["Time"])
                          .attr("doping",d => d["Doping"])
                          .attr("data-yvalue",d => new Date('January 01, 1970 01:'+d["Time"]))
                          .attr("data-xvalue",d => d["Year"])
                          .attr("cx",d => x(d["Year"]))
                          .attr("cy",d => y(new Date('January 01, 1970 01:'+d["Time"])))
                          .attr("opacity","0.7")
                          .attr("stroke","var(--color1)")
                          .attr("fill",d => d.Doping !==''? "var(--background3)":"var(--color3)")
                          .attr("r",padding/10)
                          .on("mouseover",tooltip)
                          .on("mouseout",function(){
                            d3.select(t.current)
                            .remove()
                          })
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
                           .attr("stroke","var(--color1)")
                           .attr("fill","none")
)
    

    return (    
        <div ref = {windows}>
            <svg width = {props.width+"px"} height = {props.height+"px"} ref = {root}> 
        
            </svg>
            <div  id = "legend" style = {{
                width:padding*4,
                height:padding*2,
                position:"absolute",
                top:padding,
                left:width-padding*4,
                display:"grid",
                gridTemplateColumns:padding*3+"px"+ " " + padding +"px",
                alignItems:"center",
                justifyItems:"left"
                }}>
                <p>Riders with doping allegations</p>
            <div className ="infoSquare" id ="doping" style = {{border:"solid 1px black",width:padding/2,height:padding/2, backgroundColor:"var(--background3)"}}></div>
                <p>No doping allegations</p>
                <div className ="infoSquare" id ="noDoping" style = {{border:"solid 1px black",width:padding/2,height:padding/2, backgroundColor:"var(--color3)"}}></div>
            </div>
        </div>
    
    
    )
  }
import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'


//imports baseline strokes data
import data from './baseline.json'

if (document.querySelectorAll("#display").length) {
  showPage()
  }

//creates different terrains
function showPage(){

  //create display canvas
  var display = SVG().addTo("#display").size(500,500)
  display.attr({name:"display"})


  //draw shot points and lines
  var shotlinec = display.line().stroke({color:"#000", width: 1 })
  var shotpointc = display.circle(10).attr({cx: -10,cy: -10})
  var holec = display.circle(10).attr({cx: -10,cy: -10})

  let distance = 0
  loadSvg(SVG(document.getElementById("SVGout").innerText),display)
  
  //shotpoint/line calculations
  function setupCalculations(parent){
    shotlinec = parent.line().stroke({color:"#000", width: 1 })
    shotpointc = parent.circle(10).attr({cx: -10,cy: -10})
    shotpointc.draggable()
    shotpointc.on("dragmove",function(event){
      shotpointc.hide()
      shotlinec.hide()
      let name = document.elementFromPoint(event.detail.event.clientX,event.detail.event.clientY).getAttribute("name")
      let distance = Math.round(Math.sqrt(Math.pow((event.detail.event.clientX-offsetxc-holec.attr("cx")),2)+Math.pow((event.detail.event.clientY-offsetyc-holec.attr("cy")),2)))
      plotshotpoint(distance, name)
      shotpointc.show()
      shotlinec.show()
    })
    shotlinec.front()
    holec.front()
    shotpointc.front()
  }
  function addListn(item,parent){
    // if(parent.attr("name") == "display"){
      item.click(function(event){
        
        shotpointc.attr(mousePos(event))
        distance = Math.round(Math.sqrt(Math.pow((event.clientX-offsetxc-holec.attr("cx")),2)+Math.pow((event.clientY-offsetyc-holec.attr("cy")),2)))
        plotshotpoint(distance, item.attr("name"))
    
      })}

  function plotshotpoint(distance,name){
    shotlinec.plot(shotpointc.attr("cx"),shotpointc.attr("cy"),holec.attr("cx"),holec.attr("cy"))
    let terrainOut = name
    let distanceOut = distance
    let baseline = "No Data"
    if (name!=null){
      let baselinename = name[0]
      if (name == "Bunker"){
        baselinename = 'S'
      } else if (name == 'Water'){
        baselinename = 'RC'
      }
      baseline = baselinename+distance
      
    }
    if (data[baseline]){
      baseline = data[baseline]["Baseline"]
    }else{
      baseline = "No Data"
    }

    document.getElementById("terrainShow").innerText = terrainOut; 
    document.getElementById("distanceShow").innerText = distanceOut; 
    document.getElementById("baselineShow").innerText = baseline; 

  }

  function loadSvg(loadsvg,parent){
    let Fairways = []
    let Greens = []
    let Bunkers = []
    let Tees = []
    let Waters = []
    let Roughs = []
    loadsvg.each(function(){
      let name = this.attr("name")
      if (name == "Fairway"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr({name:"Fairway"})
          n.fill('#46ad02')
          addListn(n,parent)
          Fairways.push(n)
      }}
      if (name == "Green"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr("name","Green")
          n.fill('#49fc03')
          addListn(n,parent)
          Greens.push(n)
        }
      }
      if (name == "Bunker"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr("name","Bunker")
          n.fill('#fbff1f')
          addListn(n,parent)
          Bunkers.push(n)
        }
      }
      if (name == "Tee"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr("name","Tee")
          n.fill('#074d11')
          addListn(n,parent)
          Tees.push(n)
        }
      }
      if (name == "Water"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr("name","Water")
          n.fill('#0799fa')
          addListn(n,parent)
          Waters.push(n)
        }
      }
      if (name == "Rough"){
        if((this.array()).length !=0){
          let n = parent.polygon(this.array())
          n.attr("name","Rough")
          n.fill('#02700f')
          addListn(n,parent)
          Roughs.push(n)
        }
      }
      if (name == "hole"){
        holec = parent.circle(10).attr({cx: -10,cy: -10})
        let n = this.attr(["cx","cy"])
        holec.attr(n).fill("#ff1100")
      }
    } 
    )
    //positions svg elements
    Fairways.each = function(){
      this.front()
    }
    Greens.each = function(){
      this.front()
    }
    if(parent.attr("name") == "display"){
      setupCalculations(parent)
    }
    return [Fairways,Greens,Bunkers,Tees,Waters,Roughs,holec]
  }

  //gets offsetted mouseposition
  function mousePos(event){
    return {cx: event.clientX-offsetxc,cy: event.clientY-offsetyc}
  }
  //offset variables to make sure clicks register where mouse clicks
  document.addEventListener("scroll",updateOffset)
  let offsetxc = document.getElementById("display").getBoundingClientRect().left 
  let offsetyc = document.getElementById("display").getBoundingClientRect().top
  function updateOffset(){
    offsetxc = document.getElementById("display").getBoundingClientRect().left 
    offsetyc = document.getElementById("display").getBoundingClientRect().top
  }
  updateOffset()
}
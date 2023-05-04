import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
import {loadSvg} from './loadSvg.js'

//imports baseline strokes data
import data from './baseline.json'

if (document.querySelectorAll("#display").length) {
  showPage()
  }

//creates different terrains
function showPage(){

  //create display canvas
  var display = SVG().addTo("#display").size(1000,800)
  display.attr({name:"display"})


  //draw shot points and lines
  var shotlinec = display.line().stroke({color:"#000", width: 1 })
  var shotpoint = display.circle(10).attr({cx: -10,cy: -10})
  var hole = display.circle(10).attr({cx: -10,cy: -10})

  let distance = 0
  let name = ""
  let x = 0
  let y = 0
  let elements = loadSvg(SVG(document.getElementById("SVGout").innerText),display)
  hole = elements[6]
  setupCalculations()
  
  document.addEventListener('mousedown',function() {plotshot(event,"click")}) 
  
  function plotshot(event,updatetype){
    if (document.querySelector("#display").contains(event.target)){
    shotpoint.hide()
    shotlinec.hide()
    if (updatetype == "drag"){
      x = event.detail.event.clientX
      y = event.detail.event.clientY
    } else {
      x = event.clientX
      y = event.clientY
      shotpoint.attr({cx: x-offsetx,cy: y-offsety})
    }
    shotlinec.plot(shotpoint.attr("cx"),shotpoint.attr("cy"),hole.attr("cx"),hole.attr("cy"))
    distance = Math.round(0.5*Math.sqrt(Math.pow((x-offsetx-hole.attr("cx")),2)+Math.pow((y-offsety-hole.attr("cy")),2)))
    name = document.elementFromPoint(x,y).getAttribute("name")
    shotpoint.show()
    shotlinec.show()
    UpdateSelectedLocation(distance,name)
  }
  }

  //shotpoint/line calculations
  function setupCalculations(parent){
    shotlinec = display.line().stroke({color:"#000", width: 1 })
    shotpoint = display.circle(10).attr({cx: -10,cy: -10})
    shotpoint.draggable()
    shotpoint.on("dragmove",function(){ 
      plotshot(event,"drag")
    })
    shotlinec.front()
    hole.front()
    shotpoint.front()
  }

  function UpdateSelectedLocation(distance,name){
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

  //offset variables to make sure clicks register where mouse clicks
  document.addEventListener("scroll",updateOffset)
  let offsetx = document.getElementById("display").getBoundingClientRect().left 
  let offsety = document.getElementById("display").getBoundingClientRect().top
  function updateOffset(){
    offsetx = document.getElementById("display").getBoundingClientRect().left 
    offsety = document.getElementById("display").getBoundingClientRect().top
  }
  updateOffset()
}
import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
// import { forEach } from 'shakapacker/package/rules'
// import '@svgdotjs/svg.draggable.js'

//create the drawing canvas
var draw = SVG().addTo("#create").size(500,500)

import data from './baseline.json'

//creates different terrains
var green = draw.polygon([]).fill('none').stroke({color:"#000", width: 1 })
var fair = draw.polygon([]).fill('none').stroke({color:"#000", width: 1 })
var hole = draw.circle(10).draggable()

//draws points to calculate shots
var shotline = draw.line().stroke({color:"#000", width: 1 })
var shotpoint = draw.circle(10)

//reshapes and orders svg elements
hole.attr({cx: 250,cy: 250})
shotpoint.attr({cx: -10,cy: -10})
green.front()
hole.front()
shotline.front()
shotpoint.front()
green.fill('#49fc03')
fair.fill("#46ad02")

//adds attributes to each shape
fair.attr("name","fairway")
green.attr("name","green")
hole.attr("name","hole")

//lists of points that comprise a terrain object

//state variables to be changed by buttons
let terrain = 2
let col = 0

//offset variables to make sure clicks register where mouse clicks
document.addEventListener("scroll",updateOffset)
let offsetx = document.getElementById("create").getBoundingClientRect().left + 11
let offsety = document.getElementById("create").getBoundingClientRect().top
let offsetxc = document.getElementById("display").getBoundingClientRect().left +11
let offsetyc = document.getElementById("display").getBoundingClientRect().top
function updateOffset(){
  offsetx = document.getElementById("create").getBoundingClientRect().left + 11
  offsety = document.getElementById("create").getBoundingClientRect().top
  offsetxc = document.getElementById("display").getBoundingClientRect().left +11
  offsetyc = document.getElementById("display").getBoundingClientRect().top
}
updateOffset()

//mouse eventlisners
function printMousePos(event) {
  console.log(col)
  if (col == 0){
    if (document.querySelector("#create").contains(event.target)){
    let point = [event.clientX-offsetx,event.clientY-offsety]
    if (terrain == 0){
      points = green.array()
      points.push(point)
      green.plot(points)
    } else if (terrain == 1){
      points = fair.array()
      points.push(point)
      fair.plot(points)
    } 
    else if (terrain == 2){
      hole.attr({cx:point[0],cy:point[1]})
    }
    }
  }
}


//updates terrain state variable according to button selection
document.addEventListener("click", printMousePos);
window.box = function() {
  // Get the checkbox
  var checkBox = document.getElementById("Fairway");
  if (checkBox.checked == true){
    terrain = 1;
  }
  var checkBox = document.getElementById("Green");
  if (checkBox.checked == true){
    terrain = 0;
  }
  var checkBox = document.getElementById("Hole");
  if (checkBox.checked == true){
    terrain = 2;
  }
}
//toggle between select and draw -depreciated
window.selectbox = function() {
  // Get the checkbox
  console.log("select")
  var checkBox = document.getElementById("colCheck");
  if (checkBox.checked == true){
    col = 1
    console.log("check")
  } else{
    removeselection()
    col = 0
  }
}
var selectpoints = []
var points = []
fair.click(addSelection)
green.click(addSelection)
function addSelection(event){
  if (col == 1){
  removeselection()
  parent = this
  points = this.array()
  points.forEach(alert)
  }
}

function removeselection(){
  selectpoints.forEach(function remove(point){
    point.remove()
  })
}

function alert(point,i){
  selectpoints[i] = draw.circle(10).draggable().attr({cx:point[0],cy:point[1]}).on("dragmove",function(event){
    // console.log(event.detail.event.clientX,event.detail.event.clientY)
    // console.log(fairways)
    points[i] = [selectpoints[i].attr("cx"),selectpoints[i].attr("cy")]
    parent.plot(points)
  }).click(function(event){
    if (event.shiftKey){
      points.splice(selectpoints.indexOf(this),1)
      removeselection()
      this.clear()
      parent.plot(points)
    }
  })

}

// window.getCol = function(){
//   var checkBox = document.getElementById("Green");
//   if (checkBox.checked == true){
//     col = 1;
//   } 
//   var checkBox = document.getElementById("Fairway");
//   if (checkBox.checked == true){
//     col = 0;
//   } 
// }

//distance variable
let distance = 0

//create display canvas
var display = SVG().addTo("#display").size(500,500)

//draw shot points and lines
var shotlinec = display.line().stroke({color:"#000", width: 1 })
var shotpointc = display.circle(10).attr({cx: -10,cy: -10})
var holec = display.circle(10).attr({cx: -10,cy: -10})

//create lists of course elements
var fairways = []
var greens = []

loadSvg(SVG(document.getElementById("SVGout").innerText))
//save and load hole function
window.updateCan = function(){
  console.log(display.children())
  var fairways = []
  var greens = []
  //saves the svg to a string
  var save = draw.svg()
  document.getElementById("SVGout").innerText = save
  // save to database here and load after
  //
  // loads the svg from string
  let loadsvg = SVG(document.getElementById("SVGout").innerText)


  // console.log(savesvg)
  // console.log(savesvg.get(0).attr("points"))
  // console.log(display)


  //loads svg elements into correct variables
  display.clear()
  loadSvg(loadsvg)
}

function loadSvg(loadsvg){
  fairways = []
  loadsvg.each(function(){
    let name = this.attr("name")
    if (name == "fairway"){
      let n = display.polygon(this.array())
      n.attr({name:"Fairway"})
      n.fill('#46ad02').stroke({color:"#000", width: 1 })
      addListn(n)
      fairways.push(n)
      console.log(fairways)
    }
    if (name == "green"){
      let n = display.polygon(this.array())
      n.attr("name","Green")
      n.fill('#49fc03').stroke({color:"#000", width: 1 })
      addListn(n)
      greens.push(n)
    }
    if (name == "hole"){
      holec = display.circle(10).attr({cx: -10,cy: -10})
      let n = this.attr(["cx","cy"])
      holec.attr(n)
    }
  } 
  )
  //positions svg elements
  fairways.each = function(){
    this.front()
  }
  greens.each = function(){
    this.front()
  }
  setupCalculations()
}


//shotpoint/line calculations
function setupCalculations(){
  shotlinec = display.line().stroke({color:"#000", width: 1 })
  shotpointc = display.circle(10).attr({cx: -10,cy: -10})
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
  holec.front()
  shotlinec.front()
  shotpointc.front()
}
function addListn(item){
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
    baseline = name[0]+distance
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
//gets offsetted mouseposition
function mousePos(event){
  return {cx: event.clientX-offsetxc,cy: event.clientY-offsetyc}
}
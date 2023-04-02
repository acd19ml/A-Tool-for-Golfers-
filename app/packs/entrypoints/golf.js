import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
// import { forEach } from 'shakapacker/package/rules'
// import '@svgdotjs/svg.draggable.js'

//create the drawing canvas
var draw = SVG().addTo("#create").size(500,500)

draw.attr({name:"draw"})
import data from './baseline.json'

//creates different terrains
var Green = draw.polygon([]).fill('#49fc03')
var fair = draw.polygon([]).fill("#46ad02")


var Fairways = []
var Greens = []

let elements = loadSvg(SVG(document.getElementById("SVGout").innerText),draw)

Fairways = elements[0]
Greens = elements[1]
let hole = elements[2]
console.log(Fairways)
//reshapes and orders   svg elements
Green.front()
hole.front().draggable()
hole.on("dragstart.namespace", removeselection)

//adds attributes to each shape
fair.attr("name","Fairway")
Green.attr("name","Green")
hole.attr("name","hole")

function setupCanvas(){
  fair = draw.polygon([]).fill("#46ad02").attr("name","Fairway").click(addSelection)
  Green = draw.polygon([]).fill('#49fc03').attr("name","Green").click(addSelection)
  hole = draw.circle(10).attr("name","hole").attr({cx:250,cy:250})
}

window.cleardraw = function(){
  let children = draw.children()
  children.forEach(function(child){
    console.log(child)
    child.remove()
  }
  )
  setupCanvas()
}
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
  if (col == 0){
    if (document.querySelector("#create").contains(event.target)){
    let point = [event.clientX-offsetx,event.clientY-offsety]
    console.log(point)
    if (terrain == 0){
      points = Green.array()
      points.push(point)
      Green.plot(points)
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
  var checkBox = document.getElementById("colCheck");
  if (checkBox.checked == true){
    col = 1
  } else{
    removeselection()
    col = 0
  }
}
var selectpoints = []
var points = []
Fairways.forEach(function(Fairway){
  Fairway.click(addSelection)
})
Greens.forEach(function(Green){
  Green.click(addSelection)
})
fair.click(addSelection)
Green.click(addSelection)
function addSelection(event){
  if (col == 1){
  removeselection()
  this.stroke({color:"#000", width: 1 })
  parent = this
  points = this.array()
  points.forEach(alert)
  }
}

function removeselection(){
  Fairways.forEach(function(Fairway){
    Fairway.stroke({width: 0})
  })
  Greens.forEach(function(Green){
    Green.stroke({width: 0})
  })
  selectpoints.forEach(function remove(point){
    point.remove()
  })
  Green.stroke({width: 0})
  fair.stroke({width: 0})
}

function alert(point,i){
  selectpoints[i] = draw.circle(10).draggable().attr({cx:point[0],cy:point[1]}).on("dragmove",function(event){
    points[i] = [selectpoints[i].attr("cx"),selectpoints[i].attr("cy")]
    parent.plot(points)
  }).click(function(event){
    if (event.shiftKey){
      points.splice(selectpoints.indexOf(this),1)
      this.hide()
      // parent.click()
      removeselection()
      // this.clear()
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
display.attr({name:"display"})
//draw shot points and lines
var shotlinec = display.line().stroke({color:"#000", width: 1 })
var shotpointc = display.circle(10).attr({cx: -10,cy: -10})
var holec = display.circle(10).attr({cx: -10,cy: -10})

//create lists of course elements

loadSvg(SVG(document.getElementById("SVGout").innerText),display)
//save and load hole function
window.updateCan = function(){
  //saves the svg to a string
  removeselection()
  var save = draw.svg()
  document.getElementById("SVGout").innerText = save
  // save to database here and load after
  //
  // loads the svg from string
  let loadsvg = SVG(document.getElementById("SVGout").innerText)


  // console.log(savesvg)
  // console.log(savesvg.get(0).attr("points"))


  //loads svg elements into correct variables
  display.clear()
  loadSvg(loadsvg,display)
}

function loadSvg(loadsvg,parent){
  let Fairways = []
  let Greens = []
  console.log(loadsvg)
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
    if (name == "hole"){
      holec = parent.circle(10).attr({cx: -10,cy: -10})
      let n = this.attr(["cx","cy"])
      holec.attr(n)
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
  return [Fairways,Greens,holec]
}


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
  holec.front()
  shotlinec.front()
  shotpointc.front()
}
function addListn(item,parent){
  if(parent.attr("name") == "display"){
    item.click(function(event){
      
      shotpointc.attr(mousePos(event))
      distance = Math.round(Math.sqrt(Math.pow((event.clientX-offsetxc-holec.attr("cx")),2)+Math.pow((event.clientY-offsetyc-holec.attr("cy")),2)))
      plotshotpoint(distance, item.attr("name"))
  
  })}}

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
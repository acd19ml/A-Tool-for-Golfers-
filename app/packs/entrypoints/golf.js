import { SVG, extend as SVGextend, Element as SVGElement, A } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
// import { forEach } from 'shakapacker/package/rules'
// import '@svgdotjs/svg.draggable.js'
var draw = SVG().addTo("#create").size(500,500)

var green = draw.polygon("").fill('none').stroke({color:"#000", width: 1 })
var fair = draw.polygon("").fill('none').stroke({color:"#000", width: 1 })
var hole = draw.circle(10).draggable()

var shotline = draw.line().stroke({color:"#000", width: 1 })
var shotpoint = draw.circle(10)
hole.attr({cx: 250,cy: 250})
shotpoint.attr({cx: -10,cy: -10})
green.front()
hole.front()
shotline.front()
shotpoint.front()
green.fill('#49fc03')
fair.fill("#46ad02")
fair.attr("name","fairway")
green.attr("name","green")
hole.attr("name","hole")
const greenpoints = []
const fairpoints = []

let terrain = 2
let col = 0

document.addEventListener("scroll",updateOffset)
let offsetx = document.getElementById("create").getBoundingClientRect().left + 11
let offsety = document.getElementById("create").getBoundingClientRect().top
let offsetxc = document.getElementById("display").getBoundingClientRect().left
let offsetyc = document.getElementById("display").getBoundingClientRect().top
function updateOffset(){
  offsetx = document.getElementById("create").getBoundingClientRect().left + 11
  offsety = document.getElementById("create").getBoundingClientRect().top
  offsetxc = document.getElementById("display").getBoundingClientRect().left
  offsetyc = document.getElementById("display").getBoundingClientRect().top
}
updateOffset()
function printMousePos(event) {
  console.log(col)
  if (col == 0){
    if (document.querySelector("#create").contains(event.target)){
    let point = [event.clientX-offsetx,event.clientY-offsety]
    if (terrain == 0){
      greenpoints.push(point)
      green.plot(greenpoints)
    } else if (terrain == 1){
      fairpoints.push(point)
      fair.plot(fairpoints)
    } 
    else if (terrain == 2){
      hole.attr({cx:point[0],cy:point[1]})
    }
    }
  }
}
var selectionpoint = draw.circle(10).draggable()
var selection = 0
window.nextpoint = function(){
  selectionpoint.show()
  console.log(greenpoints)
  selection += 1
  if (selection > greenpoints.length-1){
    selection = 0 
  }
  console.log(greenpoints[selection])
  selectionpoint.attr({cx:greenpoints[selection][0],cy:greenpoints[selection][1]})
}
window.deletepoint = function() {
    greenpoints.splice(selection,1)
    green.plot(greenpoints)
    selectionpoint.hide()
}

selectionpoint.on("dragmove",function(event){
  // console.log(event.detail.event.clientX,event.detail.event.clientY)
  // console.log(fairways)
  greenpoints[selection] = [event.detail.event.clientX-offsetx,event.detail.event.clientY-offsety]
  green.plot(greenpoints)
})


// window.deletepoint = function() {
//   if (terrain == 0){
//     console.log(greenpoints[greenpoints.length % selection])
//     greenpoints.pop()
//     green.plot(greenpoints)
//   } else if (terrain == 1){
//     fairpoints.pop()
//     fair.plot(fairpoints)
//   }

// }
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
window.selectbox = function() {
  // Get the checkbox
  console.log("select")
  var checkBox = document.getElementById("colCheck");
  if (checkBox.checked == true){
    col = 1
    console.log("check")
  } else{
    col = 0
  }
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
let distance = 0
// green.click(function(){
//   if (col == 1){
//     shotpoint.attr({cx: event.clientX-offsetx,cy: event.clientY-offsety})
//     shotline.plot(event.clientX-offsetx,event.clientY-offsety,hole.attr("cx"),hole.attr("cy"))
//     distance = Math.round(Math.sqrt(Math.pow((event.clientX-offsetx-hole.attr("cx")),2)+Math.pow((event.clientY-offsety-hole.attr("cy")),2)))
//     let out = "Green Clicked"+" Distance " + distance
//     document.getElementById("toshow").innerHTML = out;
//   }
// })
// fair.click(function(){
//   if (col == 1){
//     shotpoint.attr({cx: event.clientX-offsetx,cy: event.clientY-offsety})
//     shotline.plot(event.clientX-offsetx,event.clientY-offsety,hole.attr("cx"),hole.attr("cy"))
//     distance = Math.round(Math.sqrt(Math.pow((event.clientX-offsetx-hole.attr("cx")),2)+Math.pow((event.clientY-offsety-hole.attr("cy")),2)))
//     let out = "Fairway Clicked"+" Distance " + distance
//     document.getElementById("toshow").innerHTML = out;  
//   }
// })

var display = SVG().addTo("#display").size(500,500)
var shotlinec = display.line().stroke({color:"#000", width: 1 })
var shotpointc = display.circle(10).attr({cx: -10,cy: -10})
var holec = display.circle(10).attr({cx: -10,cy: -10})
var fairways = []
var greens = []
window.updateCan = function(){
  console.log(display.children())
  var fairways = []
  var greens = []
  var save = draw.svg()
  // console.log(save)
  let savesvg = SVG(save)


  // console.log(savesvg)
  // console.log(savesvg.get(0).attr("points"))
  // console.log(display)

  savesvg.each(function(){
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
      let n = this.attr(["cx","cy"])
      holec.attr(n)
    }
  } 
  )
  fairways.each = function(){
    this.front()
  }
  greens.each = function(){
    this.front()
  }
  holec.front()
  shotlinec.front()
  shotpointc.front()
}

shotpointc.draggable()
shotpointc.on("dragmove",function(event){
  // console.log(event.detail.event.clientX,event.detail.event.clientY)
  // console.log(fairways)
  shotpointc.hide()
  shotlinec.hide()
  let name = document.elementFromPoint(event.detail.event.clientX,event.detail.event.clientY).getAttribute("name")
  let distance = Math.round(Math.sqrt(Math.pow((event.detail.event.clientX-offsetxc-holec.attr("cx")),2)+Math.pow((event.detail.event.clientY-offsetyc-holec.attr("cy")),2)))
  plotshotpoint(distance, name)
  shotpointc.show()
  shotlinec.show()
})
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
  document.getElementById("terrainShow").innerHTML = terrainOut; 
  document.getElementById("distanceShow").innerHTML = distanceOut; 

}
function mousePos(event){
  return {cx: event.clientX-offsetxc,cy: event.clientY-offsetyc}
}
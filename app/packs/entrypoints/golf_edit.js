import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'

if (document.querySelectorAll("#create").length) {
  editPage()
  }

function editPage(){

//create the drawing canvas
var draw = SVG().addTo("#create").size(500,500)
draw.attr({name:"draw"})

//creates different terrains
var Green = draw.polygon([]).fill('#49fc03')
var fair = draw.polygon([]).fill("#46ad02")
var Fairways = []
var Greens = []
var hole = null
var elements = 0

//loads svg from string
elements = loadSvg(SVG(document.getElementById("SVGout").innerText),draw)

//gets elements from svg
Fairways = elements[0]
Greens = elements[1]
hole = elements[2]


//reshapes and orders svg elements
Green.front()
hole.front().draggable()
hole.on("dragstart.namespace", removeselection)

//adds attributes to each shape
fair.attr("name","Fairway")
Green.attr("name","Green")
hole.attr("name","hole")


//setup deafult canvas
function setupCanvas(){
  fair = draw.polygon([]).fill("#46ad02").attr("name","Fairway").click(addSelection)
  Green = draw.polygon([]).fill('#49fc03').attr("name","Green").click(addSelection)
  hole = draw.circle(10).attr("name","hole").attr({cx:250,cy:250}).fill("#ff1100").draggable()
}

//resets canvas to deafult
window.cleardraw = function(){
  let children = draw.children()
  children.forEach(function(child){
    child.remove()
  }
  )
  setupCanvas()
}

//state variables to be changed by buttons
let terrain = 2
let select = 0

//offset variables to make sure clicks register where mouse clicks
document.addEventListener("scroll",updateOffset)
let offsetx = document.getElementById("create").getBoundingClientRect().left 
let offsety = document.getElementById("create").getBoundingClientRect().top
function updateOffset(){
  offsetx = document.getElementById("create").getBoundingClientRect().left 
  offsety = document.getElementById("create").getBoundingClientRect().top
}
updateOffset()

//mouse eventlisners
function printMousePos(event) {
  if (select == 0){
    if (document.querySelector("#create").contains(event.target)){
    let point = [event.clientX-offsetx,event.clientY-offsety]
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

//BUTTONS

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
//toggle between select and draw
window.selectbox = function() {
  // Get the checkbox
  var checkBox = document.getElementById("selectCheck");
  if (checkBox.checked == true){
    select = 1
  } else{
    removeselection()
    select = 0
  }
}


//EDITING

//selectionpoints to edit terrain objects
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
  if (select == 1){
  removeselection()
  this.stroke({color:"#000", width: 1 })
  parent = this
  points = this.array()
  points.forEach(makeSelection)
  }
}

//remove selection points
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

//makes selection points and allows editing of elements
function makeSelection(point,i){
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

//distance variable
let distance = 0

//create display canvas

//create lists of course elements

//save and load hole function
window.updateCan = function(){
  //saves the svg to a string
  removeselection()
  var save = draw.svg()
  document.getElementById("SVGout").innerText = save
  // save to database here and load after
  //
  // loads the svg from string

  //loads svg elements into correct variables

  //send data to controller(url) as variable 'map_data'
  $.ajax({
    url: "/holes/update_map",   //controller url
    type: "POST",
    data: { map_data: save },
  });
}

function loadSvg(loadsvg,parent){
  let Fairways = []
  let Greens = []
  loadsvg.each(function(){
    let name = this.attr("name")
    if (name == "Fairway"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr({name:"Fairway"})
        n.fill('#46ad02')
        Fairways.push(n)
    }}
    if (name == "Green"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr("name","Green")
        n.fill('#49fc03')
        Greens.push(n)
      }
    }
    if (name == "hole"){
      hole = parent.circle(10).attr({cx: -10,cy: -10})
      let n = this.attr(["cx","cy"])
      hole.attr(n).fill("#ff1100")
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
  return [Fairways,Greens,hole]
}
}
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
var Green = null
var fair = null
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
hole.front().draggable()
hole.on("dragstart.namespace", removeselection)

//adds attributes to each shape
hole.attr("name","hole")

//resets canvas to deafult
window.cleardraw = function(){
  let children = draw.children()
  children.forEach(function(child){
    child.remove()
  }
  )
  Fairways = []
  Greens = []
  hole = draw.circle(10).attr("name","hole").attr({cx:250,cy:250}).fill("#ff1100").draggable()
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

var newIndex = Greens.length
//mouse eventlisners
function printMousePos(event) {
  if (select == 0){
    if (document.querySelector("#create").contains(event.target)){
    let point = [event.clientX-offsetx,event.clientY-offsety]
    if (terrain == 0){
      newObject(Greens,point,"Green",'#49fc03') 
    } else if (terrain == 1){
      newObject(Fairways,point,"Fairway",'#46ad02') 
    } 
    else if (terrain == 2){
      hole.attr({cx:point[0],cy:point[1]})
    }
    }
  }

}
function orderElements(){
  hole.back()
  if (Greens.length != null){Greens.forEach(function(E){
    E.back()
  })}
  if (Fairways.length != null){Fairways.forEach(function(E){
    E.back()
  })}
}
function newObject(terrain,point,name,fill){
  let n = 0
  // points = Green.array()
  // points.push(point)
  // Green.plot(points)
  if (terrain[newIndex] == undefined){
    points = [point]
    n = draw.polygon(points).click(addSelection)
    n.attr({name:name})
    n.fill(fill)
  } else {
    n = terrain[newIndex]
    points = terrain[newIndex].array()
    points.push(point)
    terrain[newIndex].plot(points)
  }
  terrain[newIndex] = n
  orderElements()
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
window.addButton = function() {
  newIndex = 0
  if (terrain == 0){
    newIndex = Greens.length
  }
  if (terrain == 1){
    newIndex = Fairways.length
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
function addSelection(event){
  if (select == 1){
  removeselection()
  while(this.attr('name') == this.next().attr('name')){
    this.forward()
  }
  // orderElements()
  this.stroke({color:"#000", width: 1 })
  parent = this
  points = this.array()
  points.forEach(makeSelection)
  }
}

//remove selection points
function removeselection(){
  Fairways.forEach(function(f){
    f.stroke({width: 0})
  })
  Greens.forEach(function(g){
    g.stroke({width: 0})
  })
  selectpoints.forEach(function remove(point){
    point.remove()
  })
  Greens = Greens.filter(removeEmpty)
  Fairways = Fairways.filter(removeEmpty)
  console.log(draw)
  orderElements()
}

function removeEmpty(v){
  if(v.array().length < 3){
    v.remove()
    return false
  } else {
    return true
  }
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
      removeselection()
      parent.plot(points)
    }
  })

}

//save and load hole function
window.saveMap = function(){
  //saves the svg to a string
  removeselection()
  var save = draw.svg()
  document.getElementById("SVGout").innerText = save

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
import { SVG, extend as SVGextend, Element as SVGElement, A, Polygon } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'
import {loadSvg} from './loadSvg.js'
//check to see if Create canvas exists in view
if (document.querySelectorAll("#create").length) {
  editPage()
  }

function editPage(){
  setupButtons()
  //create the drawing canvas
  var draw = SVG().addTo("#create").size(1000,800)
  draw.attr({name:"draw"})

  //creates different terrains
  var Fairways = []
  var Greens = []
  var Bunkers = []
  var Tees = []
  var Waters = []
  var Roughs = []
  var hole = null
  var elements = 0

  //loads svg from string
  elements = loadSvg(SVG(document.getElementById("SVGout").innerText),draw)
  //gets elements from svg
  Fairways = elements[0]
  Greens = elements[1]
  Bunkers = elements[2]
  Tees = elements[3]
  Waters = elements[4]
  Roughs = elements[5]
  hole = elements[6]
  orderElements()

  //hole properties
  hole.front().draggable()
  hole.on("dragstart.namespace", removeselection)
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
    Bunkers = []
    Tees = []
    Waters = []
    Roughs = []
    hole = draw.circle(10).attr("name","hole").attr({cx:250,cy:250}).fill("#ff1100").draggable()
  }

  //state variables to be changed by buttons
  var terrain = 2
  var select = 1
  var oDelete = 0

  //offset variables to make sure clicks register where mouse clicks
  document.addEventListener("scroll",updateOffset)
  let offsetx = document.getElementById("create").getBoundingClientRect().left 
  let offsety = document.getElementById("create").getBoundingClientRect().top

  //updates the offset to current page
  function updateOffset(){
    offsetx = document.getElementById("create").getBoundingClientRect().left 
    offsety = document.getElementById("create").getBoundingClientRect().top
  }
  updateOffset()


  //
  //Drawing
  //
  document.addEventListener("click", printMousePos);
  var newIndex = Greens.length
  //mouse eventlisner for drawing
  function printMousePos(event) {
    if (select == 0){
      if (document.querySelector("#create").contains(event.target)){
      let point = [event.clientX-offsetx,event.clientY-offsety]
      if (terrain == 0){
        newObject(Greens,point,"Green",'#49fc03')
      } else if (terrain == 1){
        newObject(Fairways,point,"Fairway",'#46ad02') 
      } else if (terrain == 3){
        newObject(Bunkers,point,"Bunker",'#fbff1f') 
      } else if (terrain == 4){
        newObject(Tees,point,"Tee",'#074d11') 
      } else if (terrain == 5){
        newObject(Waters,point,"Water",'#0799fa') 
      } else if (terrain == 6){
        newObject(Roughs,point,"Rough",'#02700f') 
      }
      else if (terrain == 2 & select == 0 & oDelete == 0){
        hole.attr({cx:point[0],cy:point[1]})
      }
      }
    }

  }


  //orders elements in z plane
  function orderElements(){
    hole.back()
    if (Tees.length != null){Tees.forEach(function(E){
      E.back()
    })}
    if (Waters.length != null){Waters.forEach(function(E){
      E.back()
    })}
    if (Bunkers.length != null){Bunkers.forEach(function(E){
      E.back()
    })}
    if (Greens.length != null){Greens.forEach(function(E){
      E.back()
    })}
    if (Fairways.length != null){Fairways.forEach(function(E){
      E.back()
    })}
    if (Roughs.length != null){Roughs.forEach(function(E){
      E.back()
    })}
  }

  //creates new object of chosen terrain type
  function newObject(terrain,point,name,fill){
    let n = 0
    // points = Green.array()
    // points.push(point)
    // Green.plot(points)
    let opacity = 1
      if (trace == 1){
        opacity = 0.4
      }
      if (trace == 0){
        opacity = 1
      }
    if (terrain[newIndex] == undefined){
      points = [point]
      n = draw.polygon(points).click(addSelection)
      n.attr({name:name})
      n.fill(fill).opacity(opacity)
    } else {
      n = terrain[newIndex]
      points = terrain[newIndex].array()
      points.push(point)
      terrain[newIndex].plot(points)
    }
    terrain[newIndex] = n
    orderElements()
  }

  //
  //Editing
  //
  //variables for selection
  var selectpoints = []
  var points = []

  //add selection on click
  Fairways.forEach(function(Fairway){
    Fairway.click(addSelection)
  })
  Greens.forEach(function(Green){
    Green.click(addSelection)
  })
  Bunkers.forEach(function(Bunker){
    Bunker.click(addSelection)
  })
  Tees.forEach(function(Tee){
    Tee.click(addSelection)
  })
  Waters.forEach(function(Water){
    Water.click(addSelection)
  })
  Roughs.forEach(function(Rough){
    Rough.click(addSelection)
  })

  //adds selection to elements
  function addSelection(){
    if (oDelete == 1){
      this.plot([])
      removeselection()
    }
    if (select == 1){
      removeselection()
      
      while (this.attr('name') == this.next().attr('name')){
        this.forward()
      }
      // orderElements()
      this.stroke({color:"#000", width: 1 })
      parent = this
      points = this.array()
      points.forEach(makeSelection)
    }
  }

  //remove selection from elements
  function removeselection(){
    Fairways.forEach(function(f){
      f.stroke({width: 0})
    })
    Greens.forEach(function(g){
      g.stroke({width: 0})
    })
    Bunkers.forEach(function(g){
      g.stroke({width: 0})
    })
    Tees.forEach(function(g){
      g.stroke({width: 0})
    })
    Waters.forEach(function(g){
      g.stroke({width: 0})
    })
    Roughs.forEach(function(g){
      g.stroke({width: 0})
    })
    selectpoints.forEach(function remove(point){
      point.remove()
    })
    Greens = Greens.filter(removeEmpty)
    Fairways = Fairways.filter(removeEmpty)
    Bunkers = Bunkers.filter(removeEmpty)
    Tees = Tees.filter(removeEmpty)
    Waters = Waters.filter(removeEmpty)
    Roughs = Roughs.filter(removeEmpty)
    orderElements()
  }

  //removes elements with coordinate arrays too small
  function removeEmpty(v){
    if(v.array().length < 3){
      v.remove()
      return false
    } else {
      return true
    }
  }

  //makes selection points and enables editing of elements
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

  window.downloadMap = function downloadMap(hole,course) {
    let blob = new Blob([draw.svg()]);
    const element = document.createElement('a');
    element.download = "GolfMap_hole"+hole+"_course"+course+".svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  }


  //
  //Saving SVG
  //
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

  //
  //Buttons
  //
  function setupButtons(){

  //updates terrain state variable according to button selection
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
    var checkBox = document.getElementById("Bunker");
    if (checkBox.checked == true){
      terrain = 3;
    }
    var checkBox = document.getElementById("Tee");
    if (checkBox.checked == true){
      terrain = 4;
    }
    var checkBox = document.getElementById("Water");
    if (checkBox.checked == true){
      terrain = 5;
    }
    var checkBox = document.getElementById("Rough");
    if (checkBox.checked == true){
      terrain = 6;
    }
  }


  window.toolBox = function(){
    var drawCheckBox = document.getElementById("drawCheck");
    var selectCheckBox = document.getElementById("selectCheck");
    var deleteCheckBox = document.getElementById("deleteCheck");
    if (drawCheckBox.checked == true){
      removeselection()
      hole.draggable(false)
      select = 0
      oDelete = 0
    }
    if (selectCheckBox.checked == true){
      hole.draggable()
      select = 1
      oDelete = 0
    }
    if (deleteCheckBox.checked == true){
      hole.draggable(false)
      removeselection()
      oDelete = 1
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
    if (terrain == 3){
      newIndex = Bunkers.length
    }
    if (terrain == 4){
      newIndex = Tees.length
    }
    if (terrain == 5){
      newIndex = Waters.length
    }
    if (terrain == 6){
      newIndex = Roughs.length
    }
  }
  }
  let backgroundx = parseInt(window.getComputedStyle(document.getElementById('create')).getPropertyValue("background-Position-X").replace(/px/,""))
  let backgroundy= parseInt(window.getComputedStyle(document.getElementById('create')).getPropertyValue("background-Position-Y").replace(/px/,""))
  let backgroundsize = 500
  let movevalue = 10
  // var backgroundx = parseInt(document.getElementById('create').style.backgroundPositionY)
  window.BackgroundLeft = function(){
    backgroundx -= movevalue
    document.getElementById('create').style.backgroundPositionX = backgroundx +"px"
  }
  window.BackgroundRight = function(){
    backgroundx += movevalue
    document.getElementById('create').style.backgroundPositionX = backgroundx +"px"
  }
  window.BackgroundUp = function(){
    backgroundy -= movevalue
    document.getElementById('create').style.backgroundPositionY = backgroundy +"px"
  }
  window.BackgroundDown = function(){
    backgroundy += movevalue
    document.getElementById('create').style.backgroundPositionY = backgroundy +"px"
  }
  window.BackgroundLarger = function(){
    console.log(backgroundsize)
    backgroundsize += 20
    document.getElementById('create').style.backgroundSize = backgroundsize +"px"
  }
  window.BackgroundSmaller = function(){
    console.log(backgroundsize)
    backgroundsize -= 20
    document.getElementById('create').style.backgroundSize = backgroundsize +"px"
  }
  let trace = 0
  window.Trace = function(){
    let tracebutton = document.getElementById('traceButton')
    if (tracebutton.checked){
      document.getElementById('create').style.backgroundSize = backgroundsize +"px"
      trace = 1
      Fairways.forEach(function(f){
        f.opacity(0.4)
      })
      Greens.forEach(function(g){
        g.opacity(0.4)
      })
      Bunkers.forEach(function(g){
        g.opacity(0.4)
      })
      Tees.forEach(function(g){
        g.opacity(0.4)
      })
      Waters.forEach(function(g){
        g.opacity(0.4)
      })
      Roughs.forEach(function(g){
        g.opacity(0.4)
      })
    } else {
      trace = 0
      document.getElementById('create').style.backgroundSize = 0
      Fairways.forEach(function(f){
        f.opacity(1)
      })
      Greens.forEach(function(g){
        g.opacity(1)
      })
      Bunkers.forEach(function(g){
        g.opacity(1)
      })
      Tees.forEach(function(g){
        g.opacity(1)
      })
      Waters.forEach(function(g){
        g.opacity(1)
      })
      Roughs.forEach(function(g){
        g.opacity(1)
      })
    }

  }

}


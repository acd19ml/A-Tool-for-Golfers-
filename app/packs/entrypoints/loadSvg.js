export function loadSvg(loadsvg,parent){
  let hole = []
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
    if (name == "Bunker"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr("name","Bunker")
        n.fill('#fbff1f')
        Bunkers.push(n)
      }
    }
    if (name == "Tee"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr("name","Tee")
        n.fill('#074d11')
        Tees.push(n)
      }
    }
    if (name == "Water"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr("name","Water")
        n.fill('#0799fa')
        Waters.push(n)
      }
    }
    if (name == "Rough"){
      if((this.array()).length !=0){
        let n = parent.polygon(this.array())
        n.attr("name","Rough")
        n.fill('#02700f')
        Roughs.push(n)
      }
    }
    if (name == "hole"){
      hole = parent.circle(10).attr({cx: -10,cy: -10})
      let n = this.attr(["cx","cy"])
      hole.attr(n).fill("#ff1100")
    }
  } 
  )
  return [Fairways,Greens,Bunkers,Tees,Waters,Roughs,hole,]
}
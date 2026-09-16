class Playground{

  // constructor
  constructor(){
    this.simulation = new Simulation(); }

  // update method
  update(dt){
    this.simulation.update(dt);
  }

  // draw method
  draw(){
    this.simulation.draw();

  }

  // mouse method
  onMouseMove(x,y){
    console.log("Mouse moved to: " +x+" "+y);
  }

  onMouseDown(button){
    console.log("Mouse button pressed: "+button);
  }

  onMouseUp(button){
    console.log("Mouse button released: "+button); 
  }
}

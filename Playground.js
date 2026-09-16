class Playground{

  // constructor
  constructor(){
    this.simulation = new Simulation();
    this.mousePos = Vector2.Zero();
  }

  // update method
  update(dt){
    this.simulation.update(dt, this.mousePos);
  }

  // draw method
  draw(){
    this.simulation.draw();

  }

  // mouse method
  onMouseMove(position){
    this.mousePos = position;
  }

  onMouseDown(button){
    console.log("Mouse button pressed: "+button);
  }

  onMouseUp(button){
    console.log("Mouse button released: "+button); 
  }
}

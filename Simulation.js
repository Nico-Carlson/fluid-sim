class Simulation{
 
  constructor () {
    this.particles = [];
    this.fluidHashGrid = new FluidHashGrid(25);

    this.AMOUNT_PARTICLES = 1000;
    this.VELOCITY_DAMPING = 1;
    
    this.instantiateParticles();
    this.fluidHashGrid.initialize(this.particles);
  }

  instantiateParticles(){
    let offsetBetweenParticles = 20;
    let offsetAllParticles = new Vector2(250, 40);


    let xParticles = Math.sqrt(this.AMOUNT_PARTICLES);
    let yParticles = xParticles;

    for(let x=0; x< xParticles; x++){
      for(let y=0; y< yParticles; y++){

        let position = new Vector2(x * offsetBetweenParticles + offsetAllParticles.x ,
                                   y * offsetBetweenParticles + offsetAllParticles.y);
        
        let particle = new Particle(position);
        //particle.velocity = Scale(new Vector2(-0.5 + Math.random(), -0.5 + Math.random()), 200);
        this.particles.push(particle);

      }
    }
  }


  update(dt, mousePos){
    this.neighborSearch(mousePos);

    this.predictPositions(dt);
    this.computeNextVelocity(dt);

    this.worldBoundary();
  }

  predictPositions(dt){
    for(let i=0; i< this.particles.length; i++){
      this.particles[i].prevPosition = this.particles[i].position.Cpy();
      let positionDelta = Scale(this.particles[i].velocity, dt * this.VELOCITY_DAMPING);
      this.particles[i].position = Add(this.particles[i].position, positionDelta)

    }
  }

  computeNextVelocity(dt){
    for(let i=0; i< this.particles.length; i++){
      let velocity = Scale(Sub(this.particles[i].position, this.particles[i].prevPosition), 1.0/dt);
      this.particles[i].velocity = velocity;
    }
  }

  neighborSearch(mousePos){
    this.fluidHashGrid.clearGrid();
    this.fluidHashGrid.mapParticlesToCell();

    let gridHashId = this.fluidHashGrid.getGridHashFromPosition(mousePos);
    let contentOfCell = this.fluidHashGrid.getContentOfCell(gridHashId);
    for(let i=0; i<this.particles.length; i++){
      this.particles[i].color = "#28b0ff";
    }
    for(let i=0; i<contentOfCell.length; i++){
      let particle = contentOfCell[i];
      particle.color = "red";
    }
  }


  worldBoundary(){
    for(let i=0; i< this.particles.length; i++){
      let pos = this.particles[i].position;

      if(pos.x < 0 + 5  || pos.x > canvas.width - 5){
        this.particles[i].velocity.x *= -1;
      }
      if(pos.y < 0 + 5|| pos.y > canvas.height - 5){
        this.particles[i].velocity.y *= -1;
      }
 
    }
  }


  draw(){
    for(let i=0; i< this.particles.length; i++){
      let position = this.particles[i].position;
      let color = this.particles[i].color;
      DrawUtils.drawPoint(position, 5, color);

    }
  }

}

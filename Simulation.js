class Simulation{
 
  constructor () {
    this.particles = [];
    this.AMOUNT_PARTICLES = 500;
    this.VELOCITY_DAMPING = 1;
    this.instantiateParticles();
  }

  instantiateParticles(){
    let offsetBetweenParticles = 20;
    let offsetAllParticles = new Vector2(750, 100);


    let xParticles = Math.sqrt(this.AMOUNT_PARTICLES);
    let yParticles = xParticles;

    for(let x=0; x< xParticles; x++){
      for(let y=0; y< yParticles; y++){

        let position = new Vector2(x * offsetBetweenParticles + offsetAllParticles.x ,
                                   y * offsetBetweenParticles + offsetAllParticles.y);
        this.particles.push(new Particle(position));

      }
    }
  }

  update(dt){

  }

  predictPositions(dt){
    for(let i=0; i< this.particles.length; i++){
      this.particles[i].prevPosition = this.particles[i].position.Cpy();
      let positionDelta = Scale(this.particles[i].velocity, dt * this.VELOCITY_DAMPING);
      this.particles[i].position = Add(this.particles[i].position, )

    }
  }

  computeNextVelocity(dt){
    for(let i=0; i< this.particles.length; i++){
      let velocity = Scale(Sub(this.particles[i].position, this.particles[i].prevPosition), 1.0/dt);
      this.particles[i].velocity = velocity;
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

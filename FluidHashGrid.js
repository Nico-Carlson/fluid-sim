class FluidHashGrid{

  constructor(cellSize){
    this.cellSize = cellSize;
    this.hashMap = new Map();
    this.hasMapSize = 10000000;
    this.prime1 = 6614058611;
    this.prime2 = 7528850467;
    this.particles = [];
  }


  initialize(particles){
    this.particles = particles;
  }
  
  clearGrid(){
    this.hashMap.clear();
  }



  getGridHashFromPosition(pos){
    let x = parseInt(pos.x / this.cellSize);
    let y = parseInt(pos.y / this.cellSize);
  
    return this.cellIndexToHash(x,y);
  }

  cellIndexToHash(x,y){
    let hash = (x * this.prime1 ^ y * this.prime2) % this.hasMapSize;
    return hash;
  }

  getNeighborOfParticleIdx(i){
    let neighbors = [];
    let pos = this.particles[i].position;
    
    let particleGridX = parseInt(pos.x / this.cellSize);
    let particleGridY = parseInt(pos.y / this.cellSize);

    for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        let gridX = particleGridX + x;
        let gridY = particleGridY + y;
    
        let hashId = this.cellIndexToHash(gridX, gridY);
        let content = this.getContentOfCell(hashId);

        neighbors.push(...content);
      }
    }

    return neighbors;
  }

  mapParticlesToCell(){
    for(let i=0; i<this.particles.length; i++){
      let pos = this.particles[i].position;
      let hash = this.getGridHashFromPosition(pos); 

      let entries = this.hashMap.get(hash);
      if(entries == null){
        let newArray = [this.particles[i]];
        this.hashMap.set(hash, newArray)
      } else {
        entries.push(this.particles[i]);
      }
    }
  }


  getContentOfCell(id){
    let content = this.hashMap.get(id);

    if(content == null){
      return [];
    } else{
      return content;
    }
  }
}

class Grafo{
    constructor(){
        this.vertices = {}
    }
    agregarvertice(nombre){
        if(!this.vertices[nombre]){
            this.vertices[nombre] = [];
        }
    }
    agregararista(v1,v2){
        if(!this.vertices[v1] || !this.vertices[v2]){
            this.vertices[v1].push(v2);
            this.vertices[v2].push(v1);
        }
    }
    mostrar(){
        let vertice = this.vertices
        console.log(vertice + " -> " + this.vertices[vertice])
    }
}
const grafo = new Grafo();
  
grafo.agregarvertice("mounstro");
grafo.agregarvertice("tienda");
grafo.agregarvertice("fogata");
grafo.agregarvertice("mounstro2")

grafo.agregararista("mounstro", "tienda");
grafo.agregararista("mounstro", "fogata");
grafo.agregararista("tienda", "mounstro2");
grafo.agregararista("fogata","mounstro2");

grafo.mostrar();

/*class Grafo {
    constructor() {
      this.vertices = {};
    }
  
    agregarVertice(nombre) {
      if (!this.vertices[nombre]) {
        this.vertices[nombre] = [];
      }
    }
  
    agregarArista(v1, v2) {
      if (!this.vertices[v1] || !this.vertices[v2]) return;
  
      this.vertices[v1].push(v2);
      this.vertices[v2].push(v1); 
    }
  
    mostrar() {
      for (let vertice in this.vertices) {
        console.log(`${vertice} -> ${this.vertices[vertice].join(', ')}`);
      }
    }
  }
  
  const grafo = new Grafo();
  
  grafo.agregarVertice("mounstro");
  grafo.agregarVertice("tienda");
  grafo.agregarVertice("fogata");
  grafo.agregarVertice("mounstro2")
  
  grafo.agregarArista("mounstro", "tienda");
  grafo.agregarArista("mounstro", "fogata");
  grafo.agregarArista("tienda", "mounstro2");
  grafo.agregarArista("fogata","mounstro2");
  
  grafo.mostrar();

  */
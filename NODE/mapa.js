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
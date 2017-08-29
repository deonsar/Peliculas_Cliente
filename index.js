
const bus = new Vue();

Vue.component("list-peliculas",{
    template: "#lista",
    data: function () {
        return {
          Peliculas:[],         
        }
    },

    mounted: function(){
       var _this = this;

        $.ajax({
            url: "http://10.60.23.22:52355/api/Peliculas/" ,
            type: "GET"      
        }).done(function(response){
            for(var i=0; i<response.length; i++){
               console.log(response[i]);
            }
            _this.Peliculas = response;
            console.log(_this.Peliculas);                

        }).fail(function(err){
          
            console.log(err);         
        });        
    },
    methods:{
        mostrarDetalles: function(obj){
            alert("Pelicula "+ obj.titulo);           
            bus.$emit("Pelicula",obj);
            bus.$emit("Mostrar", true);  
        }
    },
    created(){
        bus.$on("Peliculas", (data) =>{
            this.Peliculas = data;
            console.log("Peliculas: "+ data)
        });
    }
    
}); 

Vue.component("detalle-pelicula",{
    template: "#detalle",    
    data: function () {
        return {
          mostrar: false,
          objPeli:{}
        }
    },
    methods: {
        agregar: function(){        
            var _this = this;
            $.ajax({                    
                url: "http://10.60.23.22:52355/api/Peliculas/" ,
                type: "POST",
                data: this.objPeli                
            }).done(function(response){                
                alert("Pelicula Creada:"+ response.titulo )
                _this.refrescarLista();              
            }).fail(function(err){
                console.log(err);         
            });        
        },  
        actualizar: function(){    
            var _this = this;            
            $.ajax({
                url: "http://10.60.23.22:52355/api/Peliculas/" + this.objPeli.id,
                type: "PUT",                
                data: this.objPeli,
            })
            .done(function(data) {                  
                alert( "Se ha actualizado la pelicula");                 
                //_this.refrescarLista();
            })
            .fail(function(err){
                console.log(err);
            });
        },
        eliminar: function(){    
            var _this = this;        
             $.ajax({
                url: "http://10.60.23.22:52355/api/Peliculas/" + this.objPeli.id,
                type: "DELETE",                
                data: this.objPeli,
            })
            .done(function(data) {                                
                alert( "Se ha eliminado la pelicula");   
                _this.refrescarLista();            
            })
            .fail(function(err){
                console.log(err);
            });
        },
        refrescarLista: function(){
            $.ajax({
                url: "http://10.60.23.22:52355/api/Peliculas/" ,
                type: "GET"      
            }).done(function(response){
                bus.$emit("Peliculas",response);
                console.log(response);                
            }).fail(function(err){          
                console.log(err);         
            });   
        }
    },
    created(){
        bus.$on("Pelicula", (data) =>{
            this.objPeli = data;
        });

        bus.$on("Mostrar", (data) =>{
            this.mostrar = data;
        });
    }
    
});     

var app = new Vue({
    el: '#app',
   

});
   
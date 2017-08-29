
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
    
}); 

Vue.component("detalle-pelicula",{
    template: "#detalle",    
    data: function () {
        return {
          mostrar:false,
          objPeli:{}
        }
    },
    methods: {
        agregar: function(){        
            $.ajax({                    
                url: "http://10.60.23.22:52355/api/Peliculas/" ,
                type: "POST",
                data: this.objPeli                
            }).done(function(response){
                alert("Pelicula Creada:"+ response.titulo )
                console.log(response);                
            }).fail(function(err){
                console.log(err);         
            });        
        },  
        actualizar: function(event){            
            $.ajax({
                url: "http://10.60.23.22:52355/api/Peliculas/" + this.objPeli.id,
                type: "PUT",                
                data: this.objPeli,
            })
            .done(function(data) {
                alert( "Se ha actualizado la pelicula");
            })
            .fail(function(err){
                console.log(err);
            });
        },
        eliminar: function(event){
             $.ajax({
                url: "http://10.60.23.22:52355/api/Peliculas/" + this.objPeli.id,
                type: "DELETE",                
                data: this.objPeli,
            })
            .done(function(data) {
                alert( "Se eliminado la pelicula");               
            })
            .fail(function(err){
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
   
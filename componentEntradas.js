
Vue.component("list-entradas",{
    template: "#list-entradas",
    data: function () {
        return {
          Entradas:[],         
        }
    },

    mounted: function(){
       var _this = this;

        $.ajax({
            url: "http://10.60.23.22:52355/api/Entradas/" ,
            type: "GET"      
        }).done(function(response){
            for(var i=0; i<response.length; i++){
               console.log(response[i]);
            }
            _this.Entradas = response;
            console.log(_this.Entradas
                );                

        }).fail(function(err){
          
            console.log(err);         
        });        
    },
    methods:{
        mostrarDetalles: function(obj){
            alert("Entradas "+ obj.sala);           
            bus.$emit("Entradas",obj);
            bus.$emit("Mostrar", true);  
        }
    },
    created(){
        bus.$on("Entradas", (data) =>{
            this.Entradas = data;
            console.log("Entradas: "+ data)
        });
    }
    
}); 

Vue.component("detalle-entrada",{
    template: "#detalle-entrada",    
    data: function () {
        return {
          mostrar: false,
          objDet:{}
        }
    },
    methods: {
        agregar: function(){        
            var _this = this;
            $.ajax({                    
                url: "http://10.60.23.22:52355/api/Entradas/" ,
                type: "POST",
                data: this.objDet               
            }).done(function(response){                
                alert("Entrada creada :"+ response.sala )
                _this.refrescarLista();              
            }).fail(function(err){
                console.log(err);         
            });        
        },  
        actualizar: function(){    
            var _this = this;            
            $.ajax({
                url: "http://10.60.23.22:52355/api/Entradas/" + this.objDet.id,
                type: "PUT",                
                data: this.objDet,
            })
            .done(function(data) {                  
                alert( "Entrada actualizada");                 
                //_this.refrescarLista();
            })
            .fail(function(err){
                console.log(err);
            });
        },
        eliminar: function(){    
            var _this = this;        
             $.ajax({
                url: "http://10.60.23.22:52355/api/Entradas/" + this.objDet.id,
                type: "DELETE",                
                data: this.objDet,
            })
            .done(function(data) {                                
                alert( "Entrada eliminada");   
                _this.refrescarLista();            
            })
            .fail(function(err){
                console.log(err);
            });
        },
        refrescarLista: function(){
            $.ajax({
                url: "http://10.60.23.22:52355/api/Entradas/" ,
                type: "GET"      
            }).done(function(response){
                bus.$emit("Entradas",response);
                console.log(response);                
            }).fail(function(err){          
                console.log(err);         
            });   
        }
    },
    created(){
        bus.$on("Entradas", (data) =>{
            this.objPeli = data;
        });

        bus.$on("Mostrar", (data) =>{
            this.mostrar = data;
        });
    }
    
}); 
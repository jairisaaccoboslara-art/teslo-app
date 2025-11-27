const{createApp, ref} = Vue;

const app = createApp({
       template: `
    <h1>{{mensaje}}</h1>
    <p>{{autor}}</p>
    `,
     setup(){
        const mensaje = ref ("batman");
         const autor = ref("jair");


         const changeQuote = () => {
            mensaje.value = "hola, soy goku";
            autor.value = "cobos";
         }

        /*setTimeout(()=>{
            mensaje.value = " soy goku";
            autor.value = "cobos";
        }, 1500);*/







        return {
            mensaje, 
            autor,
            changeQuote,
        }
        
        
            

        }
     }
     
);

app.mount('#app');
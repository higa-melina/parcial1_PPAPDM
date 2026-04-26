const app = Vue.createApp({
    data() {
        return {
            titulo: "Biblioteca de películas",
        }
    }
});

app.component('mi-componente', {
    data: function () {
        return {
            form_data: {
                titulo: "",
                genero: "",
                productora: "",
                estado: "",
                comentario: "",

            },
            generos: [
                { texto: 'Acción', dato: 'accion', disabled: false },
                { texto: 'Aventura', dato: 'aventura', disabled: false },
                { texto: 'Comedia', dato: 'comedia', disabled: false },
                { texto: 'Drama', dato: 'drama', disabled: false },
                { texto: 'Terror', dato: 'terror', disabled: false },
                { texto: 'Suspenso', dato: 'suspenso', disabled: false },
                { texto: 'Romance', dato: 'romance', disabled: false },
                { texto: 'Documental', dato: 'documental', disabled: false },
                { texto: 'Musical', dato: 'musical', disabled: false }
            ],
            productoras: [
                { texto: 'Warner Bros', dato: 'warner', disabled: false },
                { texto: 'Universal Pictures', dato: 'universal_pictures', disabled: false },
                { texto: '20th Century', dato: '20th_century', disabled: false },
                { texto: 'Columbia Pictures', dato: 'columbia_pictures', disabled: false },
                { texto: 'Disney', dato: 'disney', disabled: false },
                { texto: 'Pixar Animation', dato: 'pixar', disabled: false },
                { texto: 'Marvel', dato: 'marvel', disabled: false },
                { texto: 'Netflix', dato: 'netflix', disabled: false },
                { texto: 'A24', dato: 'a24', disabled: false },
                { texto: 'Otro', dato: 'otro', disabled: false }
            ],
            estados: [
                { texto: 'Visto', dato: 'visto', disabled: false },
                { texto: 'Viendo ahora', dato: 'viendo', disabled: false },
                { texto: 'Quiero ver', dato: 'quiero', disabled: false },
            ]
        }


    },
    template: `<div class="form">
		<form v-on:submit.prevent>
		<label>Titulo</label>
			<input type="text" v-model.lazy.number="form_data.titulo"/>

		<label>Genero</label>
 			<select v-model="form_data.genero">
			<option v-for="genero in generos" v-bind:value="genero.dato">
   				 {{genero.texto}}
  		</option>
		</select>

        <label>Productora</label>
 			<select v-model="form_data.productora">
			<option v-for="productora in productoras" v-bind:value="productora.dato">
   				 {{productora.texto}}
  		</option>
		</select>

                <label>Estado</label>
 			<select v-model="form_data.estado">
			<option v-for="estado in estados" v-bind:value="estado.dato">
   				 {{estado.texto}}
  		</option>
		</select>

        <label>Comentario</label>
				<textarea v-model.trim.lazy="form_data.comentario"></textarea>
		</form>

	</div>`,


});



app.mount('.contenedor');
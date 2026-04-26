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
                generos: [],
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
                { texto: 'Musical', dato: 'musical', disabled: false },
                { texto: 'Otro', dato: 'otro', disabled: false }
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
            ],
            arr: [],
        }


    },
    template: `<div class="form">

        <form v-on:submit.prevent="enviar">
        <label>Titulo</label>
        <input type="text" v-model="form_data.titulo" />

        <label>Géneros</label>

        <div class="chips">
        <label class="chip" v-for="genero in generos">
            <input
            type="checkbox"
            v-model="form_data.generos"
            v-bind:value="genero.dato"
            >
            <span>{{genero.texto}}</span>
        </label>
        </div>

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
        <textarea v-model.trim="form_data.comentario"></textarea>

        <input type="submit" value="Enviar" />
        </form>

        <div v-if="arr.length > 0">
        <h2>Datos</h2>
        <ul>
            <li v-for="item in arr">
            {{ item.titulo }}, {{form_data.generos}}, {{ item.productora }}, {{
            item.estado }}, {{ item.comentario }}
            </li>
        </ul>
        </div>

	</div>`,
    methods: {
        enviar: function () {
            let nuevoObj = {
                titulo: this.form_data.titulo,
                genero: this.form_data.genero,
                productora: this.form_data.productora,
                estado: this.form_data.estado,
                comentario: this.form_data.comentario,
            }

            this.arr.push(nuevoObj);
            console.log(nuevoObj);
        }
    },

});

app.mount('.contenedor');
const app = Vue.createApp({
    data() {
        return {
            titulo: "Biblioteca de películas",
            peliculas: []
        }
    }
});

app.component('mi-formulario', {
    data() {
        return {
            form_data: {
                titulo: "",
                generos: [],
                productora: "",
                estado: "",
                comentario: "",
            },
            generos: [
                { texto: 'Acción', dato: 'accion' },
                { texto: 'Aventura', dato: 'aventura' },
                { texto: 'Comedia', dato: 'comedia' },
                { texto: 'Drama', dato: 'drama' },
                { texto: 'Terror', dato: 'terror' },
                { texto: 'Suspenso', dato: 'suspenso' },
                { texto: 'Romance', dato: 'romance' },
                { texto: 'Documental', dato: 'documental' },
                { texto: 'Musical', dato: 'musical' },
                { texto: 'Otro', dato: 'otro' }
            ],
            productoras: [
                { texto: 'Warner Bros', dato: 'warner' },
                { texto: 'Universal Pictures', dato: 'universal_pictures' },
                { texto: '20th Century', dato: '20th_century' },
                { texto: 'Columbia Pictures', dato: 'columbia_pictures' },
                { texto: 'Disney', dato: 'disney' },
                { texto: 'Pixar Animation', dato: 'pixar' },
                { texto: 'Marvel', dato: 'marvel' },
                { texto: 'Netflix', dato: 'netflix' },
                { texto: 'A24', dato: 'a24' },
                { texto: 'Otro', dato: 'otro' }
            ],
            estados: [
                { texto: 'Visto', dato: 'visto' },
                { texto: 'Viendo ahora', dato: 'viendo' },
                { texto: 'Quiero ver', dato: 'quiero' }
            ]
        }
    },

    template: `
    <div class="form">
        <form @submit.prevent="enviar">

            <label>Titulo</label>
            <input type="text" v-model="form_data.titulo" />

            <label>Géneros</label>
            <div class="chips">
                <label class="chip" v-for="genero in generos">
                    <input
                        type="checkbox"
                        v-model="form_data.generos"
                        :value="genero.dato"
                    >
                    <span>{{genero.texto}}</span>
                </label>
            </div>

            <label>Productora</label>
            <select v-model="form_data.productora">
                <option disabled value="">Seleccionar</option>
                <option v-for="productora in productoras" :value="productora.dato">
                    {{productora.texto}}
                </option>
            </select>

            <label>Estado</label>
            <select v-model="form_data.estado">
                <option disabled value="">Seleccionar</option>
                <option v-for="estado in estados" :value="estado.dato">
                    {{estado.texto}}
                </option>
            </select>

            <label>Comentario</label>
            <textarea v-model.trim="form_data.comentario"></textarea>

            <input type="submit" value="Enviar" />
        </form>
    </div>
    `,

    methods: {
        enviar() {
            const nuevoObj = {
                titulo: this.form_data.titulo,
                generos: [...this.form_data.generos],
                productora: this.form_data.productora,
                estado: this.form_data.estado,
                comentario: this.form_data.comentario,
            };

            this.$emit("agregar-pelicula", nuevoObj);

            this.form_data = {
                titulo: "",
                generos: [],
                productora: "",
                estado: "",
                comentario: "",
            };
        }
    }
});


app.component('lista-peliculas', {
    props: ['peliculas'],
    template: `
    <section class="datos">
        <h2>Datos</h2>

        <ul>
            <li v-for="item in peliculas">
                {{ item.titulo }} |
                {{ item.generos.join(', ') }} |
                {{ item.productora }} |
                {{ item.estado }} |
                {{ item.comentario }}
            </li>
        </ul>
    </section>
    `
});

app.mount('#app');
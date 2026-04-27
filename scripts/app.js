const app = Vue.createApp({
    data() {
        return {
            titulo: "Llevá un registro de tu películas",
            peliculas: []
        }
    }
});

// FORMULARIO DE INICIO
app.component('mi-formulario', {
    data() {
        return {
            form_data: {
                titulo: "",
                director: "",
                generos: [],
                productora: "",
                estado: "",
                fecha: "",
                puntuacion: null,
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

    template: /*html*/`
    <div class="form">
        <form @submit.prevent="enviar">

            <label>Titulo</label>
            <input type="text" v-model="form_data.titulo" placeholder="Título de la película" />

            <label>Director</label>
            <input type="text" v-model="form_data.director" placeholder="Nombre del director" />

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

            <label>Fecha en que la viste</label> <input type="date" v-model="form_data.fecha" />

            <label>Puntuación</label>
            <select v-model.number="form_data.puntuacion">
            <option disabled value="null">Seleccionar puntaje</option>
            <option v-for="n in 5" :value="n">{{ n }} {{ n === 1 ? 'Estrella' : 'Estrellas' }}</option>
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
                director: this.form_data.director,
                generos: [...this.form_data.generos],
                productora: this.form_data.productora,
                estado: this.form_data.estado,
                fecha: this.form_data.fecha,
                puntuacion: this.form_data.puntuacion,
                comentario: this.form_data.comentario,
            };

            this.$emit("agregar-pelicula", nuevoObj);

            this.form_data = {
                titulo: "",
                director: "",
                generos: [],
                productora: "",
                estado: "",
                fecha: "",
                puntuacion: null,
                comentario: "",
            };
        }
    }
});

// LISTA DE PELÍCULAS
app.component('lista-peliculas', {
    props: ['peliculas'],
    
    template: /*html*/`
    <section class="datos">
        <h2 class="titulo-seccion">Mis películas</h2>

        <div v-if="peliculas.length === 0" class="mensaje-vacio">
            <p>Todavía no agregaste ninguna película a tu biblioteca.</p>
        </div>

        <div v-else class="grilla-peliculas">
            <div class="tarjeta-pelicula" v-for="(item, index) in peliculas" :key="index">
                <h3>{{ item.titulo }}</h3>
                
                <div class="estrellas" v-if="item.puntuacion">
                    <span v-for="n in item.puntuacion">⭐</span>
                </div>
                
                <div class="datos-columna">
                    <p v-if="item.director"><strong>Director:</strong> <span>{{ item.director }}</span></p>

                    <p><strong>Género/s:</strong> <span>{{ item.generos.join(', ') || '-' }}</span></p>

                    <p><strong>Productora:</strong> <span>{{ item.productora || '-' }}</span></p>

                    <p v-if="item.fecha"><strong>Vista el:</strong> <span>{{ formatearFecha(item.fecha) }}</span></p>

                    <p><strong>Estado:</strong> <span class="estado">{{ item.estado || '-' }}</span></p>
                    <p class="comentario" v-if="item.comentario">

                    <strong>Comentario:</strong> <span>{{ item.comentario }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
    `,
    methods: {
        formatearFecha(fecha) {
            if (!fecha) return '';
            return fecha.split('-').reverse().join('/');
        }
    }
});

app.mount('#app');
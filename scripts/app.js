const app = Vue.createApp({
    data() {
        return {
            titulo: "Llevá un registro de tus películas",
            peliculaArrastrada: null,

            peliculas: [
                {
                    titulo: "Inception",
                    director: "Christopher Nolan",
                    generos: ["Acción", "Ciencia ficción"],
                    productora: "Warner Bros",
                    estado: "viendo",
                    fecha: "",
                    puntuacion: null,
                    comentario: "Muy interesante."
                },
                {
                    titulo: "Titanic",
                    director: "James Cameron",
                    generos: ["Drama", "Romance"],
                    productora: "20th Century",
                    estado: "visto",
                    fecha: "2024-03-15",
                    puntuacion: 4,
                    comentario: "Un clásico."
                },
                {
                    titulo: "Coco",
                    director: "Lee Unkrich",
                    generos: ["Animación", "Musical"],
                    productora: "Pixar Animation",
                    estado: "quiero",
                    fecha: "",
                    puntuacion: null,
                    comentario: "Quiero verla después."
                }
            ]
        }
    },

    methods: {
        empezarDrag(pelicula) {
            this.peliculaArrastrada = pelicula;
        },

        cambiarEstado(nuevoEstado) {
            if (this.peliculaArrastrada) {
                this.peliculaArrastrada.estado = nuevoEstado;

                if (nuevoEstado === "visto") {
                    const hoy = new Date().toISOString().split("T")[0];
                    this.peliculaArrastrada.fecha = hoy;
                } else {
                    this.peliculaArrastrada.fecha = "";
                    this.peliculaArrastrada.puntuacion = null;
                }

                this.peliculaArrastrada = null;
            }
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
        <input
          type="text"
          v-model="form_data.titulo"
          placeholder="Título de la película"
        />

        <label>Director</label>
        <input
          type="text"
          v-model="form_data.director"
          placeholder="Nombre del director"
        />

        <label>Géneros</label>
        <div class="chips">
          <label class="chip" v-for="genero in generos">
            <input
              type="checkbox"
              v-model="form_data.generos"
              :value="genero.texto"
            />
            <span>{{genero.texto}}</span>
          </label>
        </div>

        <label>Productora</label>
        <select v-model="form_data.productora">
          <option disabled value="">Seleccionar</option>
          <option v-for="productora in productoras" :value="productora.texto">
            {{ productora.texto }}
          </option>
        </select>

        <label>Estado</label>
        <select v-model="form_data.estado">
          <option disabled value="">Seleccionar</option>
          <option v-for="estado in estados" :value="estado.dato">
            {{estado.texto}}
          </option>
        </select>

        <div v-if="form_data.estado === 'visto'">
          <label>Fecha en que la viste</label>
          <input type="date" v-model="form_data.fecha" />

          <label>Puntuación</label>
          <select v-model.number="form_data.puntuacion">
            <option disabled value="">Seleccionar puntaje</option>
            <option v-for="n in 5" :value="n">
              {{ n }} {{ n === 1 ? 'Estrella' : 'Estrellas' }}
            </option>
          </select>
        </div>

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
                fecha: this.form_data.estado === "visto" ? this.form_data.fecha : "",
                puntuacion: this.form_data.estado === "visto" ? this.form_data.puntuacion : null,
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

    data() {
        return {
            columnas: [
                { titulo: 'Viendo ahora', estado: 'viendo' },
                { titulo: 'Visto', estado: 'visto' },
                { titulo: 'Quiero ver', estado: 'quiero' }
            ]
        }
    },

    template: /*html*/`
        <section class="datos">
      <h2 class="titulo-seccion">Mis películas</h2>

      <div v-if="peliculas.length === 0" class="mensaje-vacio">
        <p>Todavía no agregaste ninguna película a tu biblioteca.</p>
      </div>

      <div v-else class="columnas-peliculas">
        <div
          class="columna-estado"
          v-for="columna in columnas"
          @dragover.prevent
          @drop="$emit('cambiar-estado', columna.estado)"
        >
          <h3>{{ columna.titulo }}</h3>

          <div
            class="tarjeta-pelicula"
            v-for="(item, index) in peliculasPorEstado(columna.estado)"
            :key="item.titulo + index"
            draggable="true"
            @dragstart="$emit('empezar-drag', item)"
          >
            <h4>{{ item.titulo }}</h4>

            <p v-if="item.director">
              <strong>Director:</strong> {{ item.director }}
            </p>

            <p>
              <strong>Géneros:</strong> {{ item.generos.join(', ') || '-' }}
            </p>

            <p><strong>Productora:</strong> {{ item.productora || '-' }}</p>

            <p v-if="item.fecha">
              <strong>Vista el:</strong> {{ formatearFecha(item.fecha) }}
            </p>

            <div v-if="item.estado === 'visto'" class="rating">
              <span
                v-for="n in 5"
                class="estrella"
                :class="{ activa: n <= item.puntuacion }"
                @click="item.puntuacion = n"
              >
                ★
              </span>
            </div>

            <p v-if="item.comentario">
              <strong>Comentario:</strong> {{ item.comentario }}
            </p>
          </div>
        </div>
      </div>
    </section>
    `,

    methods: {
        peliculasPorEstado(estado) {
            return this.peliculas.filter(pelicula => pelicula.estado === estado);
        },

        formatearFecha(fecha) {
            if (!fecha) return '';
            return fecha.split('-').reverse().join('/');
        }
    }
});

app.mount('#app');
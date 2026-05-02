const app = Vue.createApp({
  data() {
    const peliculasGuardadas = localStorage.getItem('mis_peliculas');

    const peliculasIniciales = peliculasGuardadas
      ? JSON.parse(peliculasGuardadas)
      : [
        {
          titulo: "Inception",
          director: "Christopher Nolan",
          generos: ["Acción", "Ciencia ficción"],
          productora: "Warner Bros",
          estado: "viendo",
          fecha: "",
          puntuacion: null,
          comentario: "Muy interesante.",
          imagen: ""
        },
        {
          titulo: "Titanic",
          director: "James Cameron",
          generos: ["Drama", "Romance"],
          productora: "20th Century",
          estado: "visto",
          fecha: "2024-03-15",
          puntuacion: 4,
          comentario: "Un clásico.",
          imagen: ""
        },
        {
          titulo: "Coco",
          director: "Lee Unkrich",
          generos: ["Animación", "Musical"],
          productora: "Pixar Animation",
          estado: "quiero",
          fecha: "",
          puntuacion: null,
          comentario: "Quiero verla después.",
          imagen: ""
        }
      ];

    const baseDatosPeliculas = [
      {
        titulo: "Interstellar", director: "Christopher Nolan", generos: ["Ciencia ficción", "Drama", "Aventura"], productora: "Warner Bros", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Midsommar", director: "Ari Aster", generos: ["Terror", "Suspenso"], productora: "A24", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "La La Land", director: "Damien Chazelle", generos: ["Musical", "Romance", "Drama"], productora: "Otro", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Spider-Man: Into the Spider-Verse", director: "Bob Persichetti", generos: ["Animación", "Acción", "Aventura"], productora: "Columbia Pictures", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Se7en", director: "David Fincher", generos: ["Suspenso", "Drama"], productora: "Otro", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Avengers: Infinity War", director: "Anthony y Joe Russo", generos: ["Acción", "Aventura", "Ciencia ficción"], productora: "Marvel", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Superbad", director: "Greg Mottola", generos: ["Comedia"], productora: "Columbia Pictures", estado: "quiero", fecha: "", puntuacion: null, comentario: "",
        imagen: ""
      },
      {
        titulo: "Aftersun",
        director: "Charlotte Wells",
        generos: ["Familiar", "Drama", "Otro"],
        productora: "A24",
        estado: "quiero",
        fecha: "",
        puntuacion: null,
        comentario: "",
        imagen: ""
      },
      {
        titulo: "Hamilton",
        director: "Thomas Kail",
        generos: ["Musical", "Drama", "Familiar"],
        productora: "Disney",
        estado: "quiero",
        fecha: "",
        puntuacion: null,
        comentario: "",
        imagen: ""
      }
    ];
    return {
      titulo: "Llevá un registro de tus películas",
      peliculaArrastrada: null,
      peliculas: peliculasIniciales,
      baseDatosPeliculas
    }
  },
  computed: {
    peliculasRecomendadas() {
      const misGeneros = this.peliculas.flatMap(peli => peli.generos);

      return this.baseDatosPeliculas.filter(peliBD => {
        const yaLaTengo = this.peliculas.some(miPeli => miPeli.titulo.toLowerCase() === peliBD.titulo.toLowerCase());
        if (yaLaTengo) return false;
        if (misGeneros.length === 0) return true;
        return peliBD.generos.some(genero => misGeneros.includes(genero));
      }).slice(0, 3);
    }
  },

  watch: { //esta es una función que se ejecuta cada vez que se detecta un cambio en la variable "peliculas"
    peliculas: {
      handler(peliculasActualizadas) {
        localStorage.setItem('mis_peliculas', JSON.stringify(peliculasActualizadas));
      },
      deep: true //esto es para que Vue detecte cambios dentro de objetos anidados, como las propiedades de cada película
    }
  },

  methods: {
    aplicarEstado(pelicula, nuevoEstado) {
      pelicula.estado = nuevoEstado;

      if (nuevoEstado === "visto") {
        const hoy = new Date().toISOString().split("T")[0];
        pelicula.fecha = hoy;
      } else {
        pelicula.fecha = "";
        pelicula.puntuacion = null;
      }
    },

    empezarDrag(pelicula) {
      this.peliculaArrastrada = pelicula;
    },

    cambiarEstado(nuevoEstado) {
      if (this.peliculaArrastrada) {
        this.aplicarEstado(this.peliculaArrastrada, nuevoEstado);
        this.peliculaArrastrada = null;
      }
    },

    eliminarPelicula(pelicula) {
      const indice = this.peliculas.indexOf(pelicula);

      if (indice !== -1) {
        this.peliculas.splice(indice, 1);
      }
    },

    actualizarPelicula(datos) {
      const index = this.peliculas.indexOf(datos.original);
      if (index !== -1) {
        this.peliculas[index] = datos.nuevo;
      }
    },
    agregarRecomendacionDirecta(peli, estado) {
      const nuevaPeli = JSON.parse(JSON.stringify(peli));

      this.aplicarEstado(nuevaPeli, estado);

      this.peliculas.push(nuevaPeli);
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
        { texto: 'Familiar', dato: 'familiar' },
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

          <div class="rating">
            <span
              v-for="n in 5"
              class="estrella"
              :class="{ activa: n <= form_data.puntuacion }"
              @click="form_data.puntuacion === n ? form_data.puntuacion = null : form_data.puntuacion = n"
            >
              ★
            </span>
          </div>
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
        imagen: this.form_data.imagen
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
        imagen: ""
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
      ],

      editandoItem: null,
      datosEdicion: {},
      productoras: [
        { texto: 'Warner Bros' }, { texto: 'Universal Pictures' },
        { texto: '20th Century' }, { texto: 'Columbia Pictures' },
        { texto: 'Disney' }, { texto: 'Pixar Animation' },
        { texto: 'Marvel' }, { texto: 'Netflix' },
        { texto: 'A24' }, { texto: 'Otro' }
      ],
      generos: [
        { texto: 'Acción' }, { texto: 'Aventura' }, { texto: 'Comedia' },
        { texto: 'Drama' }, { texto: 'Terror' }, { texto: 'Suspenso' },
        { texto: 'Romance' }, { texto: 'Documental' }, { texto: 'Musical' },
        { texto: 'Otro' }
      ]
    }
  },

  template: /*html*/`
        <section class="datos">
      <h2 class="titulo-seccion">MIS PELÍCULAS</h2>

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

        <!-- Edición del usuario -->
        <div v-if="editandoItem === item" class="modo-edicion">

        <div class="poster-edit">
          <img
            :src="datosEdicion.imagen || 'img/card-poster.png'"
            alt="Póster de la película"
          />

          <label class="btn-cambiar-poster">
            <input type="file" accept="image/*" @change="cargarPosterEdicion" />
          </label>
        </div>

            <input type="text" v-model="datosEdicion.titulo" class="input-inline" placeholder="Título" />

            <input type="text" v-model="datosEdicion.director" class="input-inline" placeholder="Director" />

            <div class="chips" style="margin-bottom: 8px;">
                <label class="chip" v-for="genero in generos">
                    <input
                        type="checkbox"
                        v-model="datosEdicion.generos"
                        :value="genero.texto"
                    />
                    <span>{{ genero.texto }}</span>
                </label>
            </div>

            <select v-model="datosEdicion.productora" class="input-inline">
                <option disabled value="">Productora</option>
                <option v-for="p in productoras" :value="p.texto">{{ p.texto }}</option>
            </select>

            <textarea v-model="datosEdicion.comentario" class="input-inline" placeholder="Comentario"></textarea>

            <div class="botones-edicion">
                <button class="btn-guardar-inline" @click="guardarEdicion">Guardar</button>
                <button class="btn-cancelar-inline" @click="cancelarEdicion">Cancelar</button>
            </div>
        </div>
        <!-- Termina la edición del usuario -->

        <div v-else>
        <button
        class="btn-eliminar"
        @click="$emit('eliminar-pelicula', item)"
        >
            ×
        </button>

        <button class="btn-editar" @click="iniciarEdicion(item)">✎</button>

        <img
            :src="item.imagen || 'img/card-poster.png'"
            :alt="'Póster de ' + item.titulo"
            class="poster"
        />

      <h4>{{ item.titulo }}</h4>
        <p v-if="item.director">
          <strong>Director:</strong> {{ item.director }}
        </p>

        <p>
          <strong>Géneros:</strong> {{ item.generos.join(', ') || '-' }}
        </p>

        <p><strong>Productora:</strong> {{ item.productora || '-' }}</p>

        <div v-if="item.estado === 'visto'" class="fecha-card-wrap">
            <label>Vista el</label>
            <input type="date" v-model="item.fecha" class="fecha-card" />
        </div>

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
    },

    iniciarEdicion(item) {
      this.editandoItem = item;
      this.datosEdicion = { ...item, generos: [...item.generos] };
    },
    guardarEdicion() {
      this.$emit('guardar-edicion', { original: this.editandoItem, nuevo: this.datosEdicion });
      this.editandoItem = null;
      this.datosEdicion = {};
    },
    cancelarEdicion() {
      this.editandoItem = null;
      this.datosEdicion = {};
    },
    cargarPosterEdicion(event) {
      const archivo = event.target.files[0];

      if (!archivo) return;

      const lector = new FileReader();

      lector.onload = () => {
        this.datosEdicion.imagen = lector.result;
      };

      lector.readAsDataURL(archivo);
    }
  }
});

app.component('recomendaciones-peliculas', {
  props: ['recomendaciones'],

  template: /*html*/`
    <section class="datos seccion-recomendaciones" v-if="recomendaciones.length > 0">
        <h2 class="titulo-seccion">Recomendadas para vos</h2>

        <div class="grid-recomendaciones">
            <div class="tarjeta-pelicula" v-for="item in recomendaciones" :key="item.titulo">
                
                <img
                  :src="item.imagen || 'img/card-poster.png'"
                  :alt="'Póster de ' + item.titulo"
                  class="poster-recomendacion"
                />

                <h4>{{ item.titulo }}</h4>
                <p v-if="item.director"><strong>Director:</strong> {{ item.director }}</p>
                <p><strong>Géneros:</strong> {{ item.generos.join(', ') }}</p>
                <p><strong>Productora:</strong> {{ item.productora }}</p>

                <div class="botones-recomendacion">
    <button class="btn-agregar-rec" @click="$emit('agregar-recomendacion', item, 'quiero')">
        + Quiero ver
    </button>

    <button class="btn-agregar-rec" @click="$emit('agregar-recomendacion', item, 'visto')">
        ✓ Ya la vi
    </button>
</div>
            </div>
        </div>
    </section>
    `
});

app.mount('#app');
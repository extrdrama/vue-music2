<template charset="utf-8">
  <div>
    <header>
      <div class="header-inner">
        <img src="./assets/imgs/images.png" style="height: 95px; width: 147px;" />
      </div>
    </header>
    <main>
      <ul class="tabs">
        <li v-for="area in areas" :class="area.id === currentArea ? 'tab-item tab-active' : 'tab-item'" :key="area.id"
          @click="changeTab(area.id)">
          {{ area.name }}
        </li>
      </ul>
      <section class="list" v-if="currentArea === 1">
        <AlbumItem v-for="album in currentAlbums" :key="album.id" :album="album" @add="addAlbum(album)" :flag="flag" />
      </section>
      <section v-if="currentArea === 2">
        <MyCart :cart1="cart" @delete="deleteCart"/>
      </section>
      <section v-if="currentArea === 3">
        <MyOrder />
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import AlbumItem from "./components/AlbumItem.vue";
import "./assets/styles/style.css";
import MyCart from "./components/Cart.vue";
import MyOrder from "./components/Cart copy.vue";




export default {
  name: "App",
  components: {
    AlbumItem,
    MyCart,
    MyOrder,
  },
  data() {
    return {
      flag: [],
      areas: [],
      albums: [],
      cart: [],
      currentArea: 0,
    };
  },
  methods: {
    deleteCart(i){
      console.log(this.cart);

      this.flag[i-1].checked = true;
      console.log(i);
    },

    changeTab(id) {
      this.currentArea = id;
      console.log(this.currentArea)
    },
    addAlbum(album) {
      this.cart.push(album);
      this.flag[album.id - 1].checked = false;
      
      console.log(this.cart);
      console.log(this.flag);

    },
  },
  computed: {
    currentAlbums() {
      console.log(this.albums, this.currentArea);
      // console.log(this.albums.filter((album) => album.area === this.currentArea);
      return this.albums.filter((album) => album.area === this.currentArea);
    },
  },
  created() {
    axios
      .get("data/areas.json")
      .then((res) => {
        this.areas = res.data;
        console.log(this.areas);
        this.currentArea = this.areas[0].id;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("data/albums.json")
      .then((res) => {
        this.albums = res.data;
        this.albums.forEach(element => {

          this.flag.push({ "id": element.id, "checked": true });
          console.log(this.flag)
        });
        console.log(this.albums);
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

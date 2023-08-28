<template>
  <div class="album">
    <div class="cover">
      <img :src="album.cover" />
      <div class="mask">
        <!-- <img src="../assets/imgs/delete.png" @click="$emit('delete')" /> -->
      </div>
    </div>
    <a class="title nowrap" href="#"> {{album.name}} </a>
    <a href="#">作者：{{album.author[0]}}</a>
    <div style="color: red; font-weight: 700;">￥{{album.price}}</div>
    <el-button  color="red" size="small"  @click="$emit('add');change()" v-if="change(flag)">加入购物车</el-button>
    <el-button  color="red" size="small"  @click="$emit('add');change()" v-if="change(flag)===false" disabled="true" 
    style="cursor:default;">已加入购物车</el-button>
  </div>
</template>

<script>

export default {
  name: "AlbumItem",
 
  
  props: {
    album: {},
    flag:{},
  },

  methods:{
    change(flag){
      console.log(flag[this.album.id-1].checked);
      return flag[this.album.id-1].checked;
    }
  },
 
  // 通过emit向父组件抛出事件
  emits: ['add'],
};
</script>

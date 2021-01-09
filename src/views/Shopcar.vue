<template>
  <div class="shopcar">
    <p class="shopcar_title">
      <span>购物车</span>
      <span @click="eliminate">清空购物车</span>
    </p>

    <div v-for="item in xlist" :key="item.id" class="shopcar_goods">
      <div>
        {{ item.name }}
      </div>

      <div>
        数量：<van-icon name="minus" @click="clickDec(item.id)" /> {{ item.num }}
        <van-icon name="add" @click="clickAdd(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.xlist;
  },
  methods: {
    clickAdd(id) {
      this.$store.commit("changeNum", { id: id, num: 1 });
    },
    clickDec(id) {
      this.$store.commit("changeNum", { id: id, num: -1 });
    },
    //清空
    eliminate() {
      this.$store.commit("eliminateList");
    },
  },
  computed: {
    xlist() {
      let arr = [];
      //只拿到商品数量>0的商品数组

      for (let obj of this.$store.state.list) {
        for (let food of obj.foods) {
          if (food.num > 0) arr.push(food);
        }
      }

      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.shopcar_title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    margin-left: 10px;
    &:last-child {
      margin-right: 10px;
    }
  }
}
.shopcar_goods {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  div {
    margin-left: 10px;
    &:nth-child(2) {
      width: 120px;
      display: flex;
      justify-content: space-between;
      margin-right: 10px;
    }
  }
}
</style>

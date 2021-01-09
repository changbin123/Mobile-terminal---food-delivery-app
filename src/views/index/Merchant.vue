<template>
  <div>
    <div class="merchant_title">
      <div>
        <div style="color: rgb(51, 51, 51); margin-bottom: 5px">
          {{ seller.name }}
        </div>
        <div>
          <van-rate
            :value="5"
            size="16px"
            color="#f07f23"
            void-color="#eee"
            void-icon="star"
            bind:change="onChange"
          />({{ seller.sellCount }})&nbsp;月售1000单
        </div>
      </div>
      <div>收藏</div>
    </div>

    <div class="merchant_middle">
      <div>
        <div style="margin-bottom: 5px">起送价</div>
        <div style="color: rgb(51, 51, 51); text-align: center">
          {{ seller.minPrice }}元
        </div>
      </div>
      <div>
        <div style="margin-bottom: 5px">商家配送</div>
        <div style="color: rgb(51, 51, 51); text-align: center">8元</div>
      </div>
      <div>
        <div style="margin-bottom: 5px">平均配送事件</div>
        <div style="color: rgb(51, 51, 51); text-align: center">20分钟</div>
      </div>
    </div>

    <div class="merchant_info">
      <p style="color: rgb(51, 51, 51)">活动与公告</p>
      <div>{{ seller.bulletin }}</div>
      <div>
        <p v-for="item in seller.supports" :key="item" style="color: rgb(51, 51, 51)">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.seller = this.$route.query;
    console.log(this.seller);
  },
  data() {
    return {
      seller: {},
    };
  },
};
</script>

<style lang="less" scoped>
.merchant_title {
  color: rgb(138, 138, 138);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
}
.merchant_middle {
  color: rgb(138, 138, 138);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 20px;
  padding: 20px 0;
  border-top: 1px solid rgb(221, 221, 221);
  border-bottom: 15px solid rgb(236, 236, 236);
}
.merchant_info {
  margin: 0 20px;
  div {
    &:first-of-type {
      color: rgb(243, 59, 59);
      padding-bottom: 20px;
      border-bottom: 1px solid rgb(221, 221, 221);
    }
  }
}
</style>

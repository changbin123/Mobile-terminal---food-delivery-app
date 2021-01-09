<template>
  <div class="goodInfo">
    <img :src="goodInfo.imgUrl" alt="" />
    <div>{{ goodInfo.name }}</div>
    <div>
      <span>月售{{ goodInfo.sellCount }}</span>
      <span>好评率{{ goodInfo.rating }}%</span>
    </div>
    <div>
      <div>
        <span>&#165;{{ goodInfo.price }}</span>
        <span>&#165;99.40</span>
      </div>
      <div>加入购物车</div>
    </div>
    <div>
      <p>商品介绍</p>
      <div>
        {{ goodInfo.goodsDesc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.goodInfo = this.$route.query;
    console.log(this.goodInfo);
  },
  data() {
    return {
      goodInfo: [],
    };
  },
};
</script>

<style lang="less" scoped>
.goodInfo {
  img {
    width: 100%;
    height: 250px;
  }
  > div {
    padding: 0 15px;
    &:first-of-type {
      padding: 20px 15px 10px 15px;
      font-size: 18px;
      font-weight: bold;
    }
    &:nth-of-type(2) {
      color: rgb(184, 184, 184);
      margin-bottom: 5px;
    }
    &:nth-of-type(3) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 15px solid rgb(240, 240, 240);
      > div {
        &:first-of-type {
          span {
            &:first-of-type {
              color: red;
              font-size: 20px;
              font-weight: bold;
              margin-right: 5px;
            }
            &:last-child {
              font-size: 14px;
              color: rgb(184, 184, 184);
              text-decoration: line-through;
            }
          }
        }
        &:last-child {
          width: 150px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          background: rgb(226, 195, 20);
          border-radius: 50px;
        }
      }
    }
    &:nth-of-type(4) {
      padding-bottom: 15px;
      border-bottom: 15px solid rgb(240, 240, 240);
    }
  }
}
</style>

<template>
  <div class="index_container">
    <div class="index_header">
      <div
        :style="{
          backgroundImage: `url(${datas.avatar})`,
          filter: 'blur(4px)',
          height: '100%',
        }"
      >
        背景图
      </div>
      <div class="index_header_txt">
        <div class="index_header_title">
          <div class="photoBox">
            <img :src="datas.avatar" alt="" />
            <div class="index_header_title_txt">
              <div>
                <span>品牌</span>
                <span>{{ datas.name }}</span>
              </div>
              <div>{{ datas.description }}/{{ datas.deliveryTime }}分钟送达</div>
              <div>
                <span>减</span>

                <span>{{ datas.supports ? datas.supports.join(",") : "" }}</span>
              </div>
            </div>
          </div>
          <!-- v-if="datas.supports"为了避免一开始 datas.supports为空报错，还可以用 data.supports ? data.supports.join(",") : ''-->
          <div v-if="datas.supports" @click="(backShow = true), getSore()">
            {{ datas.supports.length }}个
          </div>
        </div>
        <div @click="(backShow = true), getSore()">
          <span>公告</span>
          <span>急急急急急急急急急急急急</span>
          <span>></span>
        </div>
      </div>
    </div>
    <div class="index_navbar">
      <label
        :class="curent === '/goodschild' ? 'selected' : ''"
        @click="clickTitle('/goodschild')"
        >商品</label
      >
      <label
        :class="curent === '/ratings' ? 'selected' : ''"
        @click="clickTitle('/ratings')"
        >评价</label
      >
      <label
        :class="curent === '/merchant' ? 'selected' : ''"
        @click="clickTitle('/merchant')"
        >商家</label
      >
    </div>

    <router-view></router-view>
    <div v-show="backShow" class="back" @click="backShow = !backShow">
      <div>
        {{ datas.name }}
        <div>
          <van-rate
            :value="this.value"
            size="16px"
            color="#f07f23"
            void-color="#eee"
            void-icon="star"
          />
        </div>
      </div>
      <div>
        <span></span>
        <div>优惠信息</div>

        <span></span>
      </div>
      <div>
        <div v-for="support in datas.supports" :key="support">{{ support }}</div>
      </div>

      <div>
        <span></span>
        <div>商家公告</div>

        <span></span>
      </div>
      <div>
        {{ datas.bulletin }}
      </div>
    </div>
  </div>
</template>

<script>
import { seller, goodList, goodrates } from "@/apis/app.js";
export default {
  async created() {
    this.getSeller();
    const { data } = await goodrates();

    this.ratesInfo = data;
  },
  data() {
    return {
      ratesInfo: [],
      value: 4.0,
      backShow: false,
      curent: "/goodschild",
      datas: {},
      goodsInfo: [],
    };
  },
  methods: {
    clickTitle(url) {
      this.curent = url;
      // this.$router.push("/index" + url);
      this.$router.push({ path: "/index" + url, query: this.datas });
    },
    async getSeller() {
      const { data } = await seller();
      this.datas = data;
    },
    getSore() {
      let num = 0;
      this.ratesInfo.forEach((item) => {
        num += item.score;
      });
      this.value = parseInt((num / this.ratesInfo.length).toFixed(1));
      // return (num / this.ratesInfo.length).toFixed(1);
    },
  },
};
</script>

<style lang="less" scoped>
@baseColor: rgb(245, 129, 51);

.selected {
  color: @baseColor;
  border-bottom: 2px solid @baseColor;
}
.index_container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .index_header {
    height: 200px;

    .index_header_txt {
      position: absolute;
      top: 0;
      display: flex;
      color: #fff;
      flex-direction: column;
      width: 100%;
      height: 170px;
      justify-content: space-between;
      padding-top: 30px;
      > div:last-child {
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
      }
      .index_header_title {
        margin: 0 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div:last-child {
          flex: 0 0 35px;
          align-self: flex-end;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
        }
        .photoBox {
          display: flex;
          flex-direction: row;
          img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }
  // .index_header_title {
  //   .photoBox {
  //     img {
  //       width: 50px;
  //       height: 50px;
  //     }
  //   }
  // }

  .index_navbar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    // height: 35px;
  }
}
.back {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 50px 0 0 0;

  text-align: center;
  > div {
    margin: 0 25px 0 20px;
    &:first-child {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:nth-child(2) {
      font-weight: bold;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      div {
        margin: 0 10px;
      }
      span {
        flex: 1;
        border-bottom: 1px solid white;
      }
    }
    &:nth-child(3) {
      display: flex;
      flex-direction: column;
      div {
        align-self: flex-start;
        margin-block: 10px;
      }
    }
    &:nth-child(4) {
      font-weight: bold;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      div {
        margin: 0 10px;
      }
      span {
        flex: 1;
        border-bottom: 1px solid white;
      }
    }
    &:nth-child(5) {
      text-align: left;
    }
  }
}
</style>

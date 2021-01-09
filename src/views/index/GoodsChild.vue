<template>
  <div class="goods">
    <div class="leftMenu">
      <ul>
        <li
          v-for="item in xlist"
          :key="item.name"
          :class="menuName === item.name ? 'selected' : ''"
          @click="clickMenu(item.name)"
        >
          <div>{{ item.name }}</div>
        </li>
      </ul>
    </div>

    <div class="foods">
      <div>
        <div class="foodsBox" :id="item.name" v-for="item in xlist" :key="item.name">
          <div class="foodsTitle">{{ item.name }}</div>
          <div class="foodsInfo" v-for="(items, index) in item.foods" :key="index">
            <img :src="items.imgUrl" alt="" @click="togoods(items)" />
            <div class="foodsInfo_txt">
              <div>{{ items.name }}</div>
              <div>特惠</div>
              <div>
                <span>月售{{ items.sellCount }}份</span>
                <span>&nbsp;好评度{{ items.rating }}%</span>
              </div>
              <div>
                <div>
                  <span>&#165;{{ items.price }}</span>
                  <span>&#165;99.40</span>
                </div>
                <div style="padding-right: 10px">
                  <van-icon
                    v-if="items.num > 0"
                    name="minus"
                    @click="clickDec(items.id)"
                  />
                  <span v-if="items.num > 0">{{ items.num }}</span>
                  <van-icon name="add" @click="clickAdd(items.id)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="goodsBottom" @click="showboard = !showboard">
      <img :src="xshopcarLength" alt="" />
      <span v-if="xtotal != 0" style="background: red">{{ xnum }}</span>
      <div>
        <div>
          <div>
            &#165;<span v-if="xtotal <= 0">{{ xtotal }}</span
            ><span v-if="xtotal > 0" style="color: red; font-size: 22px">{{
              xtotal
            }}</span>
          </div>
          <div style="font-size: 13px; color: #cfcfcf">另需配送费4元|支持自取</div>
        </div>
        <div v-if="xtotal == 0">&#165;20元起送</div>
        <div
          v-else
          style="
            width: 100px;
            height: 100%;
            background: peru;
            text-align: center;
            line-height: 60px;
          "
        >
          去结算
        </div>
      </div>
    </div>
    <!-- 购物车条 -->
    <transition name="slide-fade">
      <div class="index-shopcar-board" v-show="showboard"><Shopcar /></div>
    </transition>
  </div>
</template>

<script>
import { goodList } from "@/apis/app.js";
import BScroll from "better-scroll";
import Shopcar from "../Shopcar";
export default {
  components: {
    Shopcar,
  },
  created() {
    this.getGoodsList();
  },

  data() {
    return {
      showboard: false,
      menuName: "爽口凉菜",
    };
  },
  computed: {
    xlist() {
      return this.$store.state.list;
    },
    //获取购物车内商品的数量
    xshopcarLength() {
      let count = 0;
      for (let obj of this.xlist) {
        for (let food of obj.foods) {
          if (food.num > 0) count++;
        }
      }
      if (count == 0) return require("@/assets/imgs/icon_shopcar_default.png");
      return require("@/assets/imgs/icon_shopcar.png");
    },
    //商品总价格
    xtotal() {
      let total = 0;
      for (let obj of this.xlist) {
        for (let food of obj.foods) {
          total += food.price * food.num;
        }
      }
      return total;
    },
    //商品总数量
    xnum() {
      let total = 0;
      for (let obj of this.xlist) {
        for (let food of obj.foods) {
          total += food.num;
        }
      }
      return total;
    },
  },
  methods: {
    async getGoodsList() {
      const { goodsList } = await goodList();
      //添加num字段，给每个商品添加一个数量0
      for (let obj of goodsList) {
        for (let child of obj.foods) {
          child.num = 0;
        }
      }
      //把数组传到仓库
      this.$store.commit("initlist", goodsList);
      //等上一步异步更新完成，再执行下列回调函数
      this.$nextTick(() => {
        //初始化时，必须有子节点
        let leftscroll = new BScroll(".leftMenu", { click: true });
        leftscroll;
        this.foods = new BScroll(".foods", { click: true });
      });
    },
    clickMenu(name) {
      this.menuName = name;

      this.foods.scrollToElement("#" + name, 600);
    },
    clickAdd(id) {
      console.log(id);
      this.$store.commit("changeNum", { id: id, num: 1 });
    },
    clickDec(id) {
      this.$store.commit("changeNum", { id: id, num: -1 });
    },
    //点击图片进入商品详情
    togoods(items) {
      console.log(items);
      this.$router.push({ path: "/goods", query: items });
    },
  },
};
</script>

<style lang="less" scoped>
.selected {
  background: #fff !important;
  div {
    border-left: 2px solid #f60;
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(300px);
  opacity: 0;
}

.goods {
  margin-bottom: 60px;
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}
.leftMenu {
  width: 80px;
  // overflow: scroll;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      background: rgb(241, 241, 241);
      padding-top: 15px;
      padding-bottom: 15px;
      div {
        text-align: center;
      }
    }
  }
}
.foods {
  flex: 1;
  // overflow: scroll;
  // width: 100%;
  // overflow: auto;
  // overflow-y: scroll;
  .foodsBox {
    // width: 100%;
    .foodsTitle {
      background: rgb(238, 238, 238);
      color: rgb(145, 145, 145);
      width: 100%;
      padding: 8px 0;
      margin-bottom: 15px;
    }
    .foodsInfo {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        margin-left: 10px;
      }
      .foodsInfo_txt {
        width: 100%;
        > div {
          margin-bottom: 5px;
          &:first-child {
            font-weight: bold;
          }
          &:nth-child(2) {
            width: 30px;
            text-align: center;
            font-size: 12px;
            background: rgb(240, 240, 240);
          }
          &:nth-child(3) {
            font-size: 14px;
            color: rgb(207, 207, 207);
            margin-bottom: 15px;
          }
          &:nth-child(4) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            // div:last-child {
            //   width: 25px;
            //   height: 25px;
            //   border-radius: 50%;
            //   background: rgb(255, 215, 36);
            //   text-align: center;
            //   font-size: 18px;
            //   margin-right: 15px;
            // }
            span:first-child {
              color: red;
              font-weight: bold;
              font-size: 18px;
              margin-right: 5px;
            }
            span:last-child {
              color: rgb(221, 221, 221);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
.index-shopcar-board {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background: rgb(235, 235, 235);
  width: 100%;
  position: fixed;
  bottom: 59px;
}

.goodsBottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  color: #fff;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    margin-right: 15px;
  }
  > span {
    height: 20px;
    width: 20px;
    font-size: 13px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    position: absolute;
    left: 70px;
  }
}
</style>

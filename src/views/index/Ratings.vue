<template>
  <div>
    <div class="goodRate">
      <div>
        <div>{{ value }}</div>
        <div>综合评分</div>
        <div>高于周边商家96%</div>
      </div>
      <div>
        <div>
          服务态度
          <van-rate
            :value="this.value"
            size="16px"
            color="#f07f23"
            void-color="#eee"
            void-icon="star"
          />
        </div>
        <div>
          菜品质量
          <van-rate
            :value="this.value"
            size="16px"
            color="#f07f23"
            void-color="#eee"
            void-icon="star"
          />
        </div>
        <div>
          送达时间
          <van-rate
            :value="this.value"
            size="16px"
            color="#f07f23"
            void-color="#eee"
            void-icon="star"
          />
        </div>
      </div>
    </div>
    <div class="rateCategory">
      <span @click="index = 1" :class="{ yollow: index == 1 }"
        >全部{{ getAgreen() }}</span
      >
      <span @click="index = 2" :class="{ yollow: index == 2 }">满意{{ agreen }}</span>
      <span @click="index = 3" :class="{ yollow: index == 3 }">不满意{{ noagreen }}</span>
    </div>
    <div v-if="index == 1">
      <div class="ratings" v-for="(item, index) in ratesInfo" :key="index">
        <img :src="item.avatar" alt="" />
        <div class="ratingsInfo">
          <div>
            <div>{{ item.username }}</div>

            <div>
              {{ item.rateTime }}
            </div>
          </div>
          <div>
            <span>
              <van-rate
                :value="item.score"
                size="16px"
                color="#f07f23"
                void-color="#eee"
                void-icon="star"
                bind:change="onChange"
              />
            </span>
            <span v-if="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
          </div>
          <div>{{ item.text }}</div>
          <div>
            <span v-for="com in item.recommend" :key="com">{{ com }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="index == 2">
      <div class="ratings" v-for="(item, index) in agreenList" :key="index">
        <img :src="item.avatar" alt="" />
        <div class="ratingsInfo">
          <div>
            <div>{{ item.username }}</div>

            <div>
              {{ item.rateTime }}
            </div>
          </div>
          <div>
            <span>
              <van-rate
                :value="item.score"
                size="16px"
                color="#f07f23"
                void-color="#eee"
                void-icon="star"
                bind:change="onChange"
              />
            </span>
            <span v-if="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
          </div>
          <div>{{ item.text }}</div>
          <div>
            <span v-for="com in item.recommend" :key="com">{{ com }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="index == 3">
      <div class="ratings" v-for="(item, index) in noagreenList" :key="index">
        <img :src="item.avatar" alt="" />
        <div class="ratingsInfo">
          <div>
            <div>{{ item.username }}</div>

            <div>
              {{ item.rateTime }}
            </div>
          </div>
          <div>
            <span>
              <van-rate
                :value="item.score"
                size="16px"
                color="#f07f23"
                void-color="#eee"
                void-icon="star"
                bind:change="onChange"
              />
            </span>
            <span v-if="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
          </div>
          <div>{{ item.text }}</div>
          <div>
            <span v-for="com in item.recommend" :key="com">{{ com }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodrates } from "@/apis/app.js";
import moment from "moment";
export default {
  async created() {
    const { data } = await goodrates();
    this.ratesInfo = data;
    this.ratesInfo.forEach((item) => {
      item.rateTime = moment(item.rateTime).format("YYYY-MM-DD hh:mm:ss");
    });
    this.getSore();
  },
  data() {
    return {
      index: 1,
      ratesInfo: [],
      value: 4.0,
      agreen: 0,
      noagreen: 0,
      agreenList: [],
      noagreenList: [],
    };
  },
  methods: {
    getSore() {
      let num = 0;
      this.ratesInfo.forEach((item) => {
        num += item.score;
      });
      this.value = parseInt((num / this.ratesInfo.length).toFixed(1));
      // return (num / this.ratesInfo.length).toFixed(1);
    },
    getAgreen() {
      let ag = 0;
      let no = 0;
      let num;
      for (let obj of this.ratesInfo) {
        if (obj.score > 4) {
          // this.agreenList.push(item);
          this.agreenList[ag] = obj;
          ++ag;
        } else {
          this.noagreenList[no] = obj;
          ++no;
        }
      }
      // this.ratesInfo.forEach((item) => {
      //   if (item.score > 4) {
      //     // this.agreenList.push(item);
      //     console.log(item);
      //     ++ag;
      //   } else {
      //     // this.noagreenList.push(item);
      //     ++no;
      //   }
      // });

      this.agreen = ag;
      this.noagreen = no;
      return ag + no;
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.yollow {
  background: rgb(255, 207, 50);
}
.goodRate {
  display: flex;
  flex-direction: row;
  padding: 15px;
  //   justify-content: space-between;
  div:first-child {
    text-align: center;
    div {
      margin-bottom: 5px;
      //  color:#f07f23
    }
  }
  > div:last-child {
    margin-left: 15px;
    padding-left: 15px;
    border-left: 2px solid rgb(231, 231, 231);
    div {
      margin-bottom: 5px;
    }
  }
}
.rateCategory {
  display: flex;
  justify-content: space-around;
  margin: 0 15px;
  span {
    text-align: center;
    flex: 1 1 33%;
    padding: 10px 0;
    border: 2px solid rgb(255, 207, 50);
    margin-bottom: 15px;
    &:nth-child(1) {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-right: none;
    }
    &:nth-child(3) {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-left: none;
    }
  }
}
.ratings {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  padding-left: 5px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000;
    margin-right: 10px;
  }
  .ratingsInfo {
    flex: 1;
    div {
      margin-bottom: 5px;
    }
    div:first-child {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
      div:first-child {
        flex: 1 1 0;
      }
      div:last-child {
        margin-right: 10px;
      }
    }
    > div:nth-child(2) {
      font-size: 13px;
      color: rgb(158, 158, 158);
      display: flex;
      flex-direction: row;
    }
    div:last-child {
      span {
        color: rgb(158, 158, 158);
        border: 1px solid rgb(158, 158, 158);
        margin-right: 2px;
        font-size: 13px;
      }
    }
  }
}
</style>

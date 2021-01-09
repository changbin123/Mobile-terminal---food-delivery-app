import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建仓库
var mystore = new Vuex.Store({
    state:{
     
        list:[]
    },
    mutations:{
         //初始化数组list
         initlist(state, goodslist){
            state.list = goodslist
        },
      
          //加减商品数量
        changeNum(state, data){         
            //id对应商品， 数量+1或减一
            console.log(data);
            for(let obj of state.list){
                for(let child of obj.foods){
                    if(child.id === data.id){
                        //+ +1或-1
                        child.num += data.num
                        console.log( child.num );
                        return 
                    }
                }
            }
        },
        eliminateList(state){
      
            for(let obj of state.list){
                for(let child of obj.foods){
                    child.num =0
                }
            }
        }
    }
})

export default mystore

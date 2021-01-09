import request from '@/utils/request.js'

//商家名字信息
export const seller = (params)=>{
    return request.get("/shop/seller",params);
}
//商品数据
export const goodList = (params)=>{
    return request.get("/goods/goods_list",params);
}
//评论
export const goodrates = (params)=>{
    return request.get("/shop/ratings",params);
}
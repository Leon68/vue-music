<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommendData" class="slider-wrapper">
        <div class="slider-content">
        <slider>
        <div v-for="item in recommendData.slider"
            :key="item.id"
        >
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
        </slider>
      </div>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">
         热门歌单推荐
        </h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Jsonp from 'common/js/jsonp'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  export default {
    data() {
      return {
        recommendData: null,
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((resolve) => {
          if(resolve.code === ERR_OK)
          this.recommendData = resolve.data
        })
      }

    },
    components: {
      Slider
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>


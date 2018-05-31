<template>
  <div class="recommend">
    <scroll :data="mvList" ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommendSlider" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="item in recommendSlider"
                   :key="item.id"
              >
                <a :href="item.linkUrl">
                  <img class="needclick" @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">
            热门歌单推荐
          </h1>
          <ul v-if="discList" class="item">
            <li class="list-content" v-for="item in discList.recomPlaylist.data.v_hot">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover">
              </div>
              <div class="text">
                <h2 class="name">{{item.title}}</h2>
                <p class="desc">播放量：{{item.listen_num | toThouthend}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">
            热门MV推荐
          </h1>
          <ul v-if="mvList" class="item">
            <li class="list-content" v-for="item in mvList.mvlist">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picurl">
              </div>
              <div class="text">
                <h2 class="name">{{item.mvtitle}}</h2>
                <p class="desc">{{item.mvdesc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList && !mvList">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {getRecommend, getDiscLists, getMvLists} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        recommendSlider: null,
        discList: null,
        mvList: null,
        checkLoaded: false,
      }
    },
    created() {
      this._getRecommend()
      this._getDiscLists()
      this._getMvLists()

    },
    methods: {
      _getRecommend() {
        getRecommend().then((resolve) => {
          if (resolve.code === ERR_OK)
            this.recommendSlider = resolve.data.slider
        })
      },
      _getDiscLists() {
        getDiscLists().then((resolve) => {
          if (resolve.code === ERR_OK)
            this.discList = resolve
        })
      },
      _getMvLists() {
        getMvLists().then((resolve) => {
          if (resolve.code === ERR_OK)
            this.mvList = resolve.data
        })
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    filters: {
      toThouthend(value) {
        if (value > 10000) {
          value = (value / 10000).toFixed(2)
          return value + '万'
        }
      }
    },
    components: {
      Slider,
      Loading,
      Scroll
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
          flex-direction: column
          box-sizing: border-box
          align-items: flex-start
          padding: 0 20px 20px 20px
          .list-content
            display: flex
            padding: 10px 0
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


<template>
  <scroll :data="data" ref="scroll" style="height: 100%">
    <div>
      <ul v-if="singerList">
        <li class="singer-list" v-for="item in data"
            :key="item.singer_id"
        >
          <img class="singer-img" width="80" height="80" v-if="listIndex === -100" v-lazy="item.singer_pic" alt="who">
          <p class="singer-name">{{item.singer_name}}</p>
        </li>
      </ul>
    </div>
  </scroll>
  <ul class="letter-tab">
    <li class="letter"
        :class="{active: currentIndex === index}"
        v-for="(item,index) in letterTab"
        @click="toLetter(index)"
    >{{item}}
    </li>
  </ul>
  <div class="loading-container" v-show="!singerList">
    <loading></loading>
  </div>

</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

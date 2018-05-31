<template>
  <div class="singer">
    <scroll :data="singerList" ref="scroll" style="height: 100%">
      <div>
        <ul v-if="singerList">
          <li class="singer-list" v-for="item in singerList"
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
  </div>
</template>

<script>
  import Vue from 'vue'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        singerList: null,
        listIndex: -100,
        letterTab: [],
        currentIndex: 0,
      }
    },
    created() {
      this._getSingerList()
      this._createLetterTab()
    },
    methods: {
      _getSingerList() {
        getSingerList(this.listIndex).then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = res.singerList.data.singerlist
          }
        })
      },
      _createLetterTab() {
        this.letterTab.push('热门')
        for (let i = 65; i < 91; i++) {
          this.letterTab.push(String.fromCharCode(i))
        }
      },
      toLetter(index) {
        this.currentIndex = index
        if (index === 0) {
          this.listIndex = -100
        } else {
          this.listIndex = index
        }
      }
    },
    watch: {
      listIndex() {
        this._getSingerList()
        this.$refs.scroll.refresh()
      }
    },
    computed: {},
    components: {
      Scroll,
      Loading
    }

  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .singer-list
      display: flex
      flex-direction: row
      padding: 10px 20px
      .singer-name
        display: flex
        align-items: center
        padding: 0 22px
        color: white
      .singer-img
        border-radius: 50% 50%
    .letter-tab
      position: fixed
      right: 0
      top: 90px
      .letter
        display: flex
        justify-content: center
        width: 20px
        padding: 2px 0
        color: white
      .active
        color: red
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

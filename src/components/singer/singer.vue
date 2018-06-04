<template>
  <div class="singer">
    <scroll :data="singerList" style="height: 100%">
      <ul>
        <li v-for="items in singerList">
          <h2>{{items.title}}</h2>
          <div v-for="item in items.items">
            <img width="80" height="80"
                 v-lazy="item.singer_pic"
                 :onerror="defaultImg" alt="">
            <p>{{item.singer_name}}</p>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  const img = require('common/image/default.png')

  console.log(img)

  export default {
    data() {
      return {
        singerList: [],
        hotSingers: [],
        listIndex: -100,
        letterTab: [],
        currentIndex: 0,
        defaultImg: `this.src="${img}"`
      }
    },
    created() {
      this._getSingerList()
      this._createLetterTab()
    },
    methods: {
      _getSingerList() {
          getSingerList(-100).then((res) => {
            if (res.code === ERR_OK) {
              this.hotSingers = {
                title: '热门',
                items: res.singerList.data.singerlist.slice(0, 10)
              }
            }
          })
          for (let i = 1; i < 27; i++) {
            getSingerList(i).then((res) => {
              let singers = {}
              if (res.code === ERR_OK) {
                singers = {
                  title: String.fromCharCode(i + 64),
                  items: res.singerList.data.singerlist.slice(0, 10)
                }
              }
              return this.singerList.push(singers)
            }).then((res) => {
              console.log(res)
//              res.sort((a, b) => {
//                return a.title.charCodeAt() - b.title.charCodeAt()
//              })
            })
          }
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
      Scroll
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
</style>

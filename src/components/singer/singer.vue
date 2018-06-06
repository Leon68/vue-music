<template>
  <div class="singer" >
      <list-view :data="singers"></list-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import ListView from 'base/listview/listview'


  export default {
    data() {
      return {
        singers: [],
      }
    },
    components: {
      ListView
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        let arr = Array.from(new Array(26), (val, index) => index + 1)
        arr.unshift(-100)
        let promises = arr.map((i) => {
          return new Promise((resolve, reject) => {
            getSingerList(i).then((res) => {
              let singers = {}
              if (i === -100) {
                if (res.code === ERR_OK) {
                  singers = {
                    title: '热门',
                    items: res.singerList.data.singerlist.slice(0, 10)
                  }
                }
              } else {
                if (res.code === ERR_OK) {
                  singers = {
                    title: String.fromCharCode(i + 64),
                    items: res.singerList.data.singerlist.slice(0, 10)
                  }
                }
              }
              resolve(singers)
            })
          })
        })
        Promise.all(promises).then((res) => {
          this.singers = res
        })
      },
    },
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>


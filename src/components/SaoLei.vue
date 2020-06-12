<template>
  <div>
    <div id="game-ui">
      <div id="saolei">
        <div class="boom-box"
             v-for="(box,index) in boxs"
             :key="index"
             @click.left="clickLeft($event,box,index)"
             @contextmenu.prevent="clickRight(box)"
             :style="{backgroundColor:box.state === 'clicked' ? 'white' : 'gray'}">

          <img src="../assets/flag.png"
               v-show="box.state === 'signed'" />
          <img src="../assets/boom.png"
               class="boom"
               v-if="box.value === 'boom'"
               v-show="box.state === 'clicked'" />
          <p v-else
             v-show="box.value > 0 && box.state === 'clicked'">{{box.value}}</p>
        </div>
      </div>
      <div id="game-setting">
        炸弹数:<input v-model="inputNumber"
               type="number"
               placeholder="输入炸弹数" />
        <button @click="settingGame()">开始</button>
        <button @click="resetGame()">重开</button>
        <button v-show="false"
                @click="kaig()">一键扫雷</button>
        <p>tips:内置一键扫雷功能</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      boxs: [],
      boxNum: 100,
      boomNum: 20,
      inputNumber: 10
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.boxs = []
      for (let i = 0; i < this.boxNum; i++) {
        let obj = {
          state: '',
          value: ''
        }
        this.boxs.push(obj)
      }
      for (let i = 0; i < this.boomNum; i++) {
        this.addBoom()
      }
      this.boxs.forEach((box, index) => {
        if (box.value !== 'boom') {
          this.countBoomNum(box, index)
        }
      })
    },
    countBoomNum (box, index) {
      let boomNum = 0
      let indexstr = index.toString().split('')
      let curLast = parseInt(indexstr[indexstr.length - 1])

      //topLeft
      if (index > 10 && curLast !== 0 && this.boxs[index - 11].value === 'boom') {
        boomNum++
      }
      //top
      if (index > 10 && this.boxs[index - 10].value === 'boom') {
        boomNum++
      }
      // topRight 
      if (index > 10 && curLast !== 9 && this.boxs[index - 9].value === 'boom') {
        boomNum++
      }
      //left
      if (curLast !== 0 && this.boxs[index - 1].value === 'boom') {
        boomNum++
      }
      //right
      if (curLast !== 9 && this.boxs[index + 1].value === 'boom') {
        boomNum++
      }
      //bottomLeft
      if (index < 90 && curLast !== 0 && this.boxs[index + 9].value === 'boom') {
        boomNum++
      }
      //bottom
      if (index < 90 && this.boxs[index + 10].value === 'boom') {
        boomNum++
      }
      //bottomRight
      if (index < 90 && curLast !== 9 && this.boxs[index + 11].value === 'boom') {
        boomNum++
      }
      box.value = boomNum
    },
    addBoom () {
      let num = Math.floor(Math.random() * this.boxNum)
      let box = this.boxs[num]
      if (box.value !== 'boom') {
        box.value = 'boom'
      } else {
        this.addBoom()
      }
    },
    settingGame () {
      this.boomNum = this.inputNumber < 100 ? this.inputNumber : 100
      this.init()
    },
    clickLeft (e, box, index) {
      if (box.state === 'signed') {
        return
      }
      box.state = 'clicked'
      e.target.style.backgroundColor = '#fff'
      if (box.value === 'boom') {
        this.gameover()
      } else {
        this.checkSafeArea(index)
      }
    },
    clickRight (box) {
      if (box.state !== 'clicked') {
        box.state = box.state === '' ? 'signed' : ''
      }
      let unclickBoxs = this.boxs.filter(box => {
        return !box.state
      })

      if (unclickBoxs.length === 0) {
        let safeBoxs = this.boxs.filter(box => {
          return box.value !== 'boom'
        })
        let errBoxs = safeBoxs.filter(box => {
          return box.state === 'signed'
        })
        if (errBoxs.length === 0) {
          alert('you win the game~')
        }
      }

    },
    checkSafeArea (index) {
      let box = this.boxs[index]
      box.state = 'clicked'
      if (box.value === 0) {

        box.value = -1
        let indexstr = index.toString().split('')
        let curLast = parseInt(indexstr[indexstr.length - 1])

        //top
        if (index > 10) {
          this.checkSafeArea(index - 10)
        }
        //topLeft
        if (index > 10 && curLast !== 0) {
          this.checkSafeArea(index - 11)
        }
        // topRight 
        if (index > 10 && curLast !== 9) {
          this.checkSafeArea(index - 9)
        }
        //bottom
        if (index < 90) {
          this.checkSafeArea(index + 10)
        }
        //bottomLeft
        if (index < 90 && curLast !== 0) {
          this.checkSafeArea(index + 9)
        }
        //bottomRight
        if (index < 90 && curLast !== 9) {
          this.checkSafeArea(index + 11)
        }
        //left
        if (curLast !== 0) {
          this.checkSafeArea(index - 1)
        }
        //right
        if (curLast !== 9) {
          this.checkSafeArea(index + 1)
        }
      }

    },
    gameover () {
      this.boxs.forEach(box => {
        box.state = 'clicked'
      })
    },
    resetGame () {
      this.init()
    },
    kaig () {
      this.boxs.forEach(box => {
        if (box.value === 'boom') {
          box.state = 'signed'
        } else {
          box.state = 'clicked'
        }
      })
    }
  }
}
</script>

<style scoped>
#game-ui {
  text-align: center;
}
#saolei {
  display: flex;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  margin: 0 auto;
  justify-content: flex-start;
  flex-wrap: wrap;
}
#saolei .boom-box {
  width: 48px;
  height: 48px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
}
#saolei .boom-box img {
  font-size: 20px;
  color: red;
  width: 50px;
  height: 50px;
}
#saolei .boom-box .boom {
  animation: boom 3s linear infinite;
}
#saolei .boom-box p {
  font-size: 20px;
  color: black;
}
#game-setting {
  margin: 20px;
  font-size: 14px;
}

@keyframes boom {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.5);
  }
}
</style>

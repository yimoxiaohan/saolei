<template>
  <div>
    <div class="piclist">
      <div class="pic"
           v-for="item in 6"
           :key="item">
        <svg>
          <polyline points="10,10 410,10 410,200 10,200 10,10"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo1',
  deta () {
    return {

    }
  },
  created () {
    prompt('what', 'sa')
  }
}
</script>
<style scoped>
.piclist {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 1290px;
  height: 460px;
  border: 1px solid #000;
  margin: 100px auto;
}
.pic {
  width: 418px;
  height: 210px;
  margin: 10px 3px;
  background-image: url("../assets/daojian1.jpg");
  background-repeat: no-repeat;
  background-position-y: 0px;
  transition: 1s;
  cursor: pointer;
}
.pic:nth-child(1) {
  background-image: url("../assets/daojian1.jpg");
}
.pic:nth-child(2) {
  background-image: url("../assets/daojian2.jpg");
}
.pic:hover {
  background-position-y: -15px;
}
.pic:hover polyline {
  stroke-dashoffset: 0px;
}
svg {
  width: 420px;
  height: 210px;
  /* background-color: pink; */
}
svg polyline {
  stroke: blue;
  fill: none;
  stroke-dasharray: 1180px;
  stroke-dashoffset: 1180px;
  stroke-width: 3px;
  transition: 1s;
}
</style>
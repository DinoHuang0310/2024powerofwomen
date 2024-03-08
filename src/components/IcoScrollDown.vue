<template>
  <div class="scroll-down">
    <div />
  </div>
</template>

<script>
export default {
}
</script>

<style>
.scroll-down > div {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 55px;
  top: 0;
  bottom: 1.5em;
  margin-left: -15px;
  border: solid 2px #fff;
  border-radius: 15px;
}
.scroll-down > div:before {
  content: '';
  position: absolute;
  width: 4px;
  height: 9px;
  top: 8px;
  left: 11px;
  border-radius: 2px;
  background: #fff;
  -webkit-animation-name: scrollDown;
  animation-name: scrollDown;
  animation-iteration-count: infinite;
  animation-duration: 1.5s;
}
.scroll-down svg {
  display: inline-block;
  vertical-align: middle;
  width: 3em;
  margin-left: 0.5em;
}

@keyframes scrollDown {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 10px);
  }
}
</style>

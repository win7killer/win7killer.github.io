<template>
<div class="home">
  <div class="icon-rotate-ui">
    <div class="box-3d"></div>
  </div>
</div>
</template>

<style lang="less">
.icon-rotate-ui {
  margin: 0 auto;
  transform: scale(1);
  transform-origin: 0 0;
  position: relative;
}
</style>

<style lang="less" scoped>
textarea {
  resize: none;
}
.icon-rotate-ui {
  @width: 150px;
  @height: 150px;
  @rose: rgb(0, 183, 255, 1);
  @rose00: fade(@rose, 0);
  @translateX: @width / 8.5;
  @translateY: -@width / 10;
  @translateZ: @width * 7 / 8;
  @transfromOriginStart: 30% 50% -@width * 5 / 80;
  @transfromOriginEnd: center center 0px;

  width: @width;
  height: @height;
  opacity: .8;

  &::after {
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: @rose;
    z-index: 1;
  }
  .box-3d {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 2;
    transform-style: preserve-3d;
    perspective: 500px;
    perspective-origin: center 70%;

    &::before,
    &::after {
      content: 'UI';
      @width: 64px;
      @height: 76px;
      width: @width;
      height: @height;
      background: #fff;
      position: absolute;
      top: 48%;
      left: 55%;
      margin-top: -@height/2;
      margin-left: -@width/2;
      font-size: 30px;
      line-height: @height;
      font-weight: bold;
      will-change: transform, color, opacity;
      border-radius: 6px;
      text-align: center;
    }

    &::before {
      color: @rose;
      transform-origin: @transfromOriginStart;
      transform: translate3d(-@translateX, -@translateY, 0px) rotateY(0deg);
      animation: rotateMove 4s 1s linear infinite;
    }

    &::after {
      // display: none;
      color: @rose00;
      opacity: .8;
      transform-origin: @transfromOriginEnd;
      transform: translate3d(@translateX, @translateY, -@translateZ) rotateY(0deg);
      animation: rotateMoveReverse 4s 1s linear infinite;
    }
  }

  @keyframes rotateMove {
    0% {
      transform-origin: @transfromOriginStart;
      transform: translate3d(-@translateX, -@translateY, 0px) rotateY(0deg);
      color: @rose;
      opacity: 1;
    }
    2.5% {
      color: @rose00;
    }
    12% {
      transform-origin: @transfromOriginStart;
      transform: translate3d(-@translateX, @translateY, -@translateZ) rotateY(-120deg);
    }
    25%,
    50% {
      transform-origin: @transfromOriginEnd;
      color: @rose00;
      opacity: .8;
      transform: translate3d(@translateX, @translateY, -@translateZ) rotateY(-360deg);
    }
    65% {
      color: @rose00;
      opacity: 1;
    }
    75%,
    100% {
      color: @rose;
      opacity: 1;
      transform: translate3d(-@translateX, -@translateY, 0px) rotateY(-360deg);
    }
  }

  @keyframes rotateMoveReverse {
    0% {
      color: @rose00;
      opacity: .8;
      transform: translate3d(@translateX, @translateY, -@translateZ) rotateY(0deg);
    }
    15% {
      color: @rose00;
      opacity: 1;
    }
    25%,
    50% {
      transform-origin: @transfromOriginStart;
      color: @rose;
      opacity: 1;
      transform: translate3d(-@translateX, -@translateY, 0px) rotateY(0deg);
    }
    52.5% {
      color: @rose00;
    }
    56% {
      transform-origin: @transfromOriginStart;
      transform: translate3d(-@translateX, @translateY, -@translateZ) rotateY(-120deg);
    }
    75%,
    100% {
      transform-origin: @transfromOriginEnd;
      color: @rose00;
      opacity: .8;
      transform: translate3d(@translateX, @translateY, -@translateZ) rotateY(-360deg);
    }
  }

}
</style>

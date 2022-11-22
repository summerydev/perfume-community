<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-close-button">
            <slot name="close-button">X</slot>
          </div>
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="overflow">
                <div>
                  <span class="recommendation">
                    {{ recommendationMessage[review.recommendation] }}
                  </span>
                </div>
                <div>
                  <span class="perfume_name">{{ review.perfume_name }}</span>
                  <span class="brand">({{ review.name }})</span>
                </div>
              </div>
              <div>
                <span class="reviewInfo">
                  <span v-if="review.user_name">{{ review.user_name }}님</span>
                  |
                  {{ review.created_date.substr(0, 10) }}
                </span>
              </div>
              <div class="img-box">
                <img
                  v-bind:src="review.path"
                  alt="perfume image"
                  class="image"
                />
              </div>
              <table>
                <tr>
                  <td colspan="4">
                    <span
                      v-for="item in review.fragrance.split(',')"
                      v-bind:key="item"
                      class="fragrance"
                      :class="color[item]"
                      style="margin-right: 3px"
                      >{{ frangranceMessage[item] }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td class="td-1">지속력</td>
                  <td colspan="3">{{ longevityMessage[review.longevity] }}</td>
                </tr>
                <tr>
                  <td class="td-1">확산력</td>
                  <td colspan="3">{{ strengthMessage[review.strength] }}</td>
                </tr>
                <tr>
                  <td class="td-1">성별</td>
                  <td colspan="3">{{ genderMessage[review.gender] }}</td>
                </tr>
                <tr>
                  <td class="td-1">상세리뷰</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <div class="content">{{ review.content }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" style="display: none"></td>
                </tr>
              </table>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  recommendationMessage,
  longevityMessage,
  strengthMessage,
  genderMessage,
  frangranceMessage,
} from "../config/config.js";
export default {
  props: { review: {} },
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      color: {
        0: "f-0",
        1: "f-1",
        2: "f-2",
        3: "f-3",
        4: "f-4",
        5: "f-5",
        6: "f-6",
        7: "f-7",
      },
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-close-button {
  text-align: right;
}

.modal-header {
  margin-top: 0;
  color: #42b983;
  font-size: 1.5rem;
}

.modal-body {
  margin: 10px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.overflow div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommendation {
  font-size: 1.3rem;
  font-weight: bolder;
}
.reviewInfo {
  font-size: 0.8rem;
  color: gray;
}

.perfume_name {
  font-size: 1rem;
  font-weight: bolder;
}

.fragrance {
  width: max-content;
  font-size: 0.8em;
  padding: 2px 7px;
  border-radius: 20px;
  text-align: center;
}

.content {
  padding: 10px;
  width: 280px;
  height: 150px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.083);
  overflow-x: auto;
  overflow-y: auto;
}

.img-box {
  text-align: center;
  width: 100px;
  height: 150px;
  margin: 0 auto;
}
.image {
  width: 100%;
  object-fit: cover;
}
.f-0 {
  background-color: rgb(252, 251, 195);
}
.f-1 {
  background-color: rgb(255, 202, 191);
}
.f-2 {
  background-color: rgb(255, 221, 228);
}
.f-3 {
  background-color: rgb(243, 136, 82);
}
.f-4 {
  background-color: rgb(255, 135, 199);
}
.f-5 {
  background-color: rgb(198, 185, 171);
}
.f-6 {
  background-color: rgb(234, 234, 224);
}
.f-7 {
  background-color: rgb(186, 221, 181);
}
</style>

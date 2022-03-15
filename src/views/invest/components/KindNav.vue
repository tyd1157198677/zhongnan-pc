<template>
  <div style="padding-right: 10px">
    <ul class="list-group" style="position: relative">
      <li class="list-group-item"><span class="glyphicon glyphicon-tasks"></span>&nbsp;&nbsp;供方分类</li>
      <menu v-for="(item, index) in cates" :key="item.id" @mouseenter="onMouseEnter(item.id)" @mouseleave="onMouseLeave(item.id)">
        <li class="hand" :class="{ 'list-group-item': index < cates.length, 'list-group-item-bottom': index == cates.length - 1 }">
          <span class="el-icon-s-cooperation"></span>
          {{ item.cateName }}
        </li>
        <div class="cat-subcategory" :id="`con-${item.id}`">
          <div class="shadow" style="height: 100%">
            <div class="entity-main">
              <ul class="shadow-left">
                <li v-for="second in item.children" :key="second.id">
                  <h3 class="mt-2">{{ second.cateName }}</h3>
                  <a class="hand" v-for="third in second.children" :key="third.id" @click="itemClick(third)">{{ third.cateName }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </menu>
    </ul>
  </div>
</template>
<script>
import "@/assets/css/supplier.css";
import { mapState, mapMutations } from "vuex";

export default {
  name: "KindNav",
  data() {
    return {};
  },
  computed: {
    ...mapState("categoryTree", { cates: "oriCats" }),
  },
  created() {
    if (!this.cates || this.cates.length == 0) {
      this.$api.SupplierTree.GetSupplierCategoryTree().then((res) => {
        // console.log("supplier kind-nav created:", res);
        this.initCats(res);
      });
    }
  },
  methods: {
    ...mapMutations("categoryTree", { initCats: "init" }),
    onMouseEnter(id) {
      let dom = document.querySelector(`#con-${id}`);
      dom.style.display = "block";
    },
    onMouseLeave(id) {
      let dom = document.querySelector(`#con-${id}`);
      dom.style.display = "none";
    },
    itemClick(kind) {
      this.$emit("itemClick", kind);
    },
  },
};
</script>
<style scoped>
.cat-subcategory {
  left: 189px;
}

v-deep .list-group-item {
  height: 40px;
  line-height: 40px;
  position: relative;
  display: block;
  padding: 0rem 1.25rem;
  background-color: #fff;
  border-bottom: 0px solid;
}

.list-group-item-bottom {
  position: relative;
  display: block;
  padding: 0rem 1.25rem;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>

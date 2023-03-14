"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 0:展示列表, 1:选择项目
      type: 0,
      items: []
    };
  },
  onLoad(e) {
    if (e.type != null) {
      this.type = e.type;
    }
  },
  onShow() {
    common_vendor.index.request({
      url: "https://klogan.cn/zhc/item/listAll",
      method: "POST",
      data: {
        "page": 1,
        "size": 100,
        "condition": {}
      },
      success: (res) => {
        console.log("success:");
        console.log(res);
        this.items = res.data.list;
      },
      fail: (err) => {
        console.log("fail:" + JSON.stringify(err));
      }
    });
  },
  methods: {
    rowClicked(item) {
      if (this.type == 0) {
        common_vendor.index.navigateTo({
          url: "repair_item?item=" + JSON.stringify(item)
        });
      } else if (this.type == 1) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("selectRepairItem", {
          data: item
        });
        common_vendor.index.navigateBack();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.price),
        c: common_vendor.o(($event) => $options.rowClicked(item), index),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/cmb/Documents/HBuilderProjects/garage-h5/pages/repair_item/repair_item_list.vue"]]);
wx.createPage(MiniProgramPage);

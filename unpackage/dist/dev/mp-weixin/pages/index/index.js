"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      categorys: [{
        categoryName: "维修单",
        items: [
          {
            icon: "../../static/logo.png",
            text: "新建",
            url: "../repair_bill/repair_bill"
          },
          {
            icon: "../../images/BusinessIcons_DollarCoin.png",
            text: "列表",
            url: "../repair_bill/repair_bill_list"
          },
          {
            icon: "../../images/BusinessIcons_WalletMoney-.png",
            text: "扫一扫",
            url: "scan/scan"
          }
        ]
      }, {
        categoryName: "维修项目",
        items: [
          {
            icon: "../../static/logo.png",
            text: "新建",
            url: "../repair_item/repair_item"
          },
          {
            icon: "../../images/BusinessIcons_DollarCoin.png",
            text: "列表",
            url: "../repair_item/repair_item_list"
          }
        ]
      }, {
        categoryName: "其他",
        items: [
          {
            icon: "../../images/BusinessIcons_ShareMoney.png",
            text: "统计",
            url: "statistics/statistics"
          },
          {
            icon: "../../images/BusinessIcons_YenMoneyDeal.png",
            text: "账号管理"
          }
        ]
      }]
    };
  },
  methods: {
    itemClicked() {
      console.log("111");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.categorys, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.categoryName),
        b: common_vendor.f(category.items, (item, k1, i1) => {
          return {
            a: common_vendor.t(item.text),
            b: item.url
          };
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/cmb/Documents/HBuilderProjects/garage-h5/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

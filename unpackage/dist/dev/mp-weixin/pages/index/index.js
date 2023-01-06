"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: [
        {
          icon: "../../static/logo.png",
          text: "\u65B0\u5EFA\u7EF4\u4FEE\u5355",
          url: "../repair_bill/repair_bill"
        },
        {
          icon: "../../images/BusinessIcons_BlankMonitor.png",
          text: "\u65B0\u5EFA\u91C7\u8D2D\u5355",
          url: "bill/cud/cud?itemType=1"
        },
        {
          icon: "../../images/BusinessIcons_DollarCoin.png",
          text: "\u67E5\u8BE2\u7EF4\u4FEE\u5355",
          url: "bill/search/search?itemType=0"
        },
        {
          icon: "../../images/BusinessIcons_GoldMoney.png",
          text: "\u67E5\u8BE2\u91C7\u8D2D\u5355",
          url: "bill/search/search?itemType=1"
        },
        {
          icon: "../../images/BusinessIcons_PoundMoneyDeal.png",
          text: "\u7BA1\u7406\u4FEE\u7406\u9879\u76EE",
          url: "item/menu/menu?itemType=0"
        },
        {
          icon: "../../images/BusinessIcons_SafeMoney.png",
          text: "\u7BA1\u7406\u91C7\u8D2D\u9879\u76EE",
          url: "item/menu/menu?itemType=1"
        },
        {
          icon: "../../images/BusinessIcons_ShareMoney.png",
          text: "\u7EDF\u8BA1",
          url: "statistics/statistics"
        },
        {
          icon: "../../images/BusinessIcons_WalletMoney-.png",
          text: "\u626B\u4E00\u626B",
          url: "scan/scan"
        },
        {
          icon: "../../images/BusinessIcons_YenMoneyDeal.png",
          text: "\u8D26\u53F7\u7BA1\u7406"
        }
      ]
    };
  },
  methods: {
    itemClicked() {
      console.log("111");
    }
  }
};
if (!Array) {
  const _component_page_head = common_vendor.resolveComponent("page-head");
  _component_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "form"
    }),
    b: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.url,
        c: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/cmb/Documents/HBuilderProjects/garage/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

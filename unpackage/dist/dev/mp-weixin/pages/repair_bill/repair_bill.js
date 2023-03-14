"use strict";
const common_vendor = require("../../common/vendor.js");
const common_graceChecker = require("../../common/graceChecker.js");
const _sfc_main = {
  data() {
    return {
      items: [{
        title: "plateNum",
        name: "plateNumber",
        check: null
      }, {
        title: "carModel",
        name: "carModel",
        check: null
      }, {
        title: "mileage",
        name: "mileage",
        check: null
      }, {
        title: "owner",
        name: "owner",
        check: null
      }, {
        title: "phone",
        name: "phone",
        check: null
      }],
      repairItems: [],
      totalAmount: 0
    };
  },
  methods: {
    formSubmit: function(e) {
      console.log("form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
      var rule = [
        {
          name: "plateNumber",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "车牌号必填"
        },
        {
          name: "repairItems",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "维修项目必填"
        }
      ];
      var formData = e.detail.value;
      formData.repairItems = this.repairItems;
      var checkRes = common_graceChecker.graceChecker.check(formData, rule);
      if (checkRes)
        ;
      else {
        common_vendor.index.showToast({
          title: common_graceChecker.graceChecker.error,
          icon: "none"
        });
      }
    },
    addRepairItemClicked() {
      let that = this;
      common_vendor.index.navigateTo({
        url: "../repair_item/repair_item_list?type=1",
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          selectRepairItem: function({
            data
            // 解构
          }) {
            console.log(data);
            data.count = 1;
            that.repairItems.push(data);
            that.updateTotalAmount();
          }
        }
      });
    },
    updateTotalAmount() {
      var sum = 0;
      this.repairItems.forEach((repairItem) => {
        sum += repairItem.price * repairItem.count;
      });
      this.totalAmount = sum;
    }
  }
};
if (!Array) {
  const _component_page_head = common_vendor.resolveComponent("page-head");
  _component_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "form"
    }),
    b: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.name
      };
    }),
    c: common_vendor.o(($event) => $options.addRepairItemClicked()),
    d: common_vendor.f($data.repairItems, (repairItem, k0, i0) => {
      return {
        a: common_vendor.t(repairItem.name),
        b: common_vendor.t(repairItem.count),
        c: common_vendor.t(repairItem.price * repairItem.count)
      };
    }),
    e: $data.repairItems
  }, $data.repairItems ? {
    f: common_vendor.t($data.totalAmount)
  } : {}, {
    g: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    h: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/cmb/Documents/HBuilderProjects/garage-h5/pages/repair_bill/repair_bill.vue"]]);
wx.createPage(MiniProgramPage);

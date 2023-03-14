"use strict";
const common_vendor = require("../../common/vendor.js");
const common_graceChecker = require("../../common/graceChecker.js");
const _sfc_main = {
  data() {
    return {
      itemID: false,
      canEdit: true,
      properties: [{
        title: "name",
        name: "name",
        value: null,
        check: null
      }, {
        title: "price",
        name: "price",
        value: null,
        check: null
      }]
    };
  },
  onLoad(e) {
    if (e.item) {
      console.log(e);
      this.canEdit = false;
      let item = JSON.parse(e.item);
      this.itemID = item.id;
      this.properties[0].value = item.name;
      this.properties[1].value = item.price;
    }
  },
  methods: {
    formSubmit: function(e) {
      console.log("form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
      console.log(this.properties);
      var rule = [
        // {
        // 	name: "nickname",
        // 	checkType: "string",
        // 	checkRule: "1,3",
        // 	errorMsg: "姓名应为1-3个字符"
        // },
        // {
        // 	name: "gender",
        // 	checkType: "in",
        // 	checkRule: "男,女",
        // 	errorMsg: "请选择性别"
        // },
        // {
        // 	name: "loves",
        // 	checkType: "notnull",
        // 	checkRule: "",
        // 	errorMsg: "请选择爱好"
        // }
      ];
      var formData = e.detail.value;
      var checkRes = common_graceChecker.graceChecker.check(formData, rule);
      if (!checkRes) {
        common_vendor.index.showToast({
          title: common_graceChecker.graceChecker.error,
          icon: "none"
        });
        return;
      }
      if (this.itemID) {
        this.updateItem(formData);
      } else {
        this.createItem(formData);
      }
    },
    resetItemsValue: function(e) {
      this.properties.forEach((property) => {
        property.value = null;
      });
    },
    editButtonClicked() {
      this.canEdit = true;
    },
    deleteButtonClicked() {
      common_vendor.index.request({
        url: "https://klogan.cn/zhc/item/delete",
        method: "POST",
        data: { id: this.itemID },
        success: (res) => {
          console.log("success:");
          console.log(res);
          common_vendor.index.navigateBack();
          common_vendor.index.showToast({
            title: "删除成功"
          });
        },
        fail: (err) => {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    },
    createItem(item) {
      common_vendor.index.request({
        url: "https://klogan.cn/zhc/item/create",
        method: "POST",
        data: item,
        success: (res) => {
          console.log("success:");
          console.log(res);
          common_vendor.index.showToast({
            title: "成功"
          });
          this.resetItemsValue();
        },
        fail: (err) => {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    },
    updateItem(item) {
      item.id = this.itemID;
      common_vendor.index.request({
        url: "https://klogan.cn/zhc/item/update",
        method: "POST",
        data: item,
        success: (res) => {
          console.log("success:");
          console.log(res);
          common_vendor.index.showToast({
            title: "成功"
          });
          this.canEdit = false;
        },
        fail: (err) => {
          console.log("fail:" + JSON.stringify(err));
        }
      });
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
    b: common_vendor.f($data.properties, (property, k0, i0) => {
      return {
        a: common_vendor.t(property.title),
        b: property.name,
        c: property.value,
        d: common_vendor.o(($event) => property.value = $event.detail.value, property.title),
        e: property.title
      };
    }),
    c: !$data.canEdit,
    d: $data.canEdit
  }, $data.canEdit ? common_vendor.e({
    e: $data.itemID
  }, $data.itemID ? {
    f: common_vendor.o(($event) => $options.deleteButtonClicked())
  } : {}) : {
    g: common_vendor.o(($event) => $options.editButtonClicked())
  }, {
    h: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    i: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/cmb/Documents/HBuilderProjects/garage-h5/pages/repair_item/repair_item.vue"]]);
wx.createPage(MiniProgramPage);

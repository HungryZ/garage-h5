<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex" v-for="item in items">
					<view class="gar-title">{{item.title}}</view>
					<input class="uni-input" :name="item.name" placeholder="placeholder" />
				</view>
				<div class="gar-flex" style="padding-top: 30rpx;">
					<div class="hint">项目</div>
					<div class="add-button" @click="addRepairItemClicked()">添加></div>
				</div>
				<view class="repair-item gar-flex" v-for="repairItem in repairItems">
					<view class="gar-title">{{repairItem.title}}</view>
					<view class="title">¥{{repairItem.price}}</view>
				</view>
				<view class="repair-item gar-flex">
					<view class="gar-title">合计</view>
					<view class="title">¥10000</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import graceChecker from "../../common/graceChecker.js"
	export default {
		data() {
			return {
				items: [{
					title: 'plateNum',
					name: 'plateNumber',
					check: null,
				}, {
					title: 'carModel',
					name: 'carModel',
					check: null,
				}, {
					title: 'owner',
					name: 'owner',
					check: null,
				}, {
					title: 'phone',
					name: 'phone',
					check: null,
				}, {
					title: 'mileage',
					name: 'mileage',
					check: null,
				}],
				repairItem: null,
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "string",
						checkRule: "1,3",
						errorMsg: "姓名应为1-3个字符"
					},
					{
						name: "gender",
						checkType: "in",
						checkRule: "男,女",
						errorMsg: "请选择性别"
					},
					{
						name: "loves",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择爱好"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			addRepairItemClicked() {
				let that = this
				uni.navigateTo({
					url: '../repair_item/repair_item',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						selectRepairItem: function(data) {
							that.repairItem = data
							console.log(that.repairItem)
							that.$forceUpdate()
						},
					},
				});
			},
		}
	}
</script>

<style>
	.hint {
		font-size: 18rpx;
		padding-left: 10rpx;
		color: gray;
	}

	.basic-item {
		border-bottom: 1rpx solid lightgray;
		padding: 8rpx 25rpx;
	}

	.uni-input {
		font-size: 36rpx;
		text-align: right;
	}

	.add-button {
		color: royalblue;
		border-bottom: 1rpx solid royalblue;
		margin-right: 10rpx;
	}

	.repair-item {
		padding: 8rpx 25rpx;
		flex-wrap: nowrap;
	}

	.uni-btn-v {
		margin: 50rpx;
	}
</style>

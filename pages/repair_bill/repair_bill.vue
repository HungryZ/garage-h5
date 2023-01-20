<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex bottom-border" v-for="item in items">
					<view class="gar-title">{{item.title}}</view>
					<input class="uni-input" :name="item.name" placeholder="placeholder" />
				</view>
				<div class="gar-flex" style="padding-top: 30rpx;">
					<div class="hint">项目</div>
					<div class="add-button" @click="addRepairItemClicked()">添加></div>
				</div>
				<view class="repair-item gar-flex bottom-border" v-for="repairItem in repairItems">
					<div>
						<view class="gar-title">{{repairItem.name}}</view>
						<view class="repair-item-count">x{{repairItem.count}}</view>
					</div>
					<view class="title">¥{{repairItem.price * repairItem.count}}</view>
				</view>
				<view class="repair-item gar-flex" v-if="repairItems">
					<view class="gar-title">合计</view>
					<view class="title">¥{{totalAmount}}</view>
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
					title: 'mileage',
					name: 'mileage',
					check: null,
				}, {
					title: 'owner',
					name: 'owner',
					check: null,
				}, {
					title: 'phone',
					name: 'phone',
					check: null,
				}],
				repairItems: [{
					name: '11111111111',
					count: 1,
					price: 100,
				}],
				totalAmount: 0,
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
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
				//进行表单检查
				var formData = e.detail.value
				formData.repairItems = this.repairItems
				var checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					// request
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
						selectRepairItem: function({
							data // 解构
						}) {
							console.log(data)
							that.repairItems = data
							that.updateTotalAmount()
						},
					},
				});
			},
			updateTotalAmount() {
				var sum = 0
				this.repairItems.forEach((repairItem) => {
					sum += repairItem.price * repairItem.count
				})
				this.totalAmount = sum
			},
		}
	}
</script>

<style>
	.bottom-border {
		border-bottom: 1rpx solid lightgray;
	}

	.hint {
		font-size: 18rpx;
		padding-left: 10rpx;
		color: gray;
	}

	.basic-item {
		padding: 8rpx 25rpx;
	}

	.uni-input {
		font-size: 36rpx;
		text-align: right;
	}

	.add-button {
		font-size: 18rpx;
		color: royalblue;
		margin-right: 10rpx;
		border-bottom: 1rpx solid royalblue;
	}

	.repair-item {
		padding: 8rpx 25rpx;
		flex-wrap: nowrap;
	}

	.repair-item-count {
		padding: 8rpx 25rpx;
		color: darkgray;
		font-size: 18rpx;
	}

	.uni-btn-v {
		margin: 50rpx;
	}
</style>

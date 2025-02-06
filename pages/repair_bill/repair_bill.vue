<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex bottom-border" v-for="property in propertys" :key="property.id">
					<view class="gar-content">{{property.title}}</view>
					<input class="uni-input" :disabled="!canEdit" :name="property.name" placeholder="placeholder"
						v-model="property.value" />
				</view>
				<div class="gar-flex" style="padding-top: 30rpx;">
					<div class="hint">项目</div>
					<div class="add-button" @click="addRepairItemClicked()" v-if="canEdit">添加 ></div>
				</div>
				<view class="repair-item gar-flex bottom-border" v-for="repairItem in repairItems"
					:key="repairItem.name">
					<div>
						<view class="gar-content">{{repairItem.name}}</view>
						<div class="gar-flex-row gar-padding-h-25 gar-padding-top-10">
							<view @click="subtractButtonClicked(repairItem)" v-if="canEdit">-</view>
							<view class="repair-item-count">{{repairItem.count}}</view>
							<view @click="addButtonClicked(repairItem)" v-if="canEdit">+</view>
						</div>
					</div>
					<view class="title">¥{{(repairItem.price * repairItem.count).toLocaleString()}}</view>
				</view>
				<view class="gar-flex repair-item gar-margin-top-20">
					<view class="gar-content">合计</view>
					<view class="title" style="font-size: 36rpx;font-weight: bold;">
						¥{{totalAmount.toLocaleString()}}</view>
				</view>
				<view class="uni-btn-v">
					<div v-if="canEdit">
						<button form-type="submit">Submit</button>
						<button class="button-delete" @click="deleteButtonClicked()" v-if="orderID">Delete</button>
					</div>
					<button @click="editButtonClicked()" v-else>Edit</button>
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
				orderID: null,
				canEdit: true,
				propertys: [{
					title: 'plateNum',
					name: 'plateNumber',
					value: null,
					check: null,
				}, {
					title: 'carModel',
					name: 'carModel',
					value: null,
					check: null,
				}, {
					title: 'mileage',
					name: 'mileage',
					value: null,
					check: null,
				}, {
					title: 'owner',
					name: 'owner',
					value: null,
					check: null,
				}, {
					title: 'phone',
					name: 'phone',
					value: null,
					check: null,
				}],
				repairItems: [],
				totalAmount: 0,
			}
		},
		onLoad(e) {
			wx.cloud.callFunction({
				name: 'period-amount',
				data: {
					collectionName: 'repair-bill',
					year: 2023,
					month: 8,
				},
				success: res => {
					wx.hideLoading()
					console.log('[云函数] [period-amount] 调用成功：', res.result)
					this.setData({
						statisticList: res.result
					})
				},
				fail: err => {
					console.error('[云函数] [period-amount] 调用失败', err)
					wx.showToast({
						icon: 'none',
						title: '请求失败'
					})
				}
			})
			if (e.id) {
				this.canEdit = false
				this.orderID = e.id
				this.$req.request({
					path: 'order/detail',
					method: 'GET',
					data: {
						"id": e.id
					},
				}).then((res) => {
					this.propertys[0].value = res.plateNumber
					this.propertys[1].value = res.carModel
					this.propertys[2].value = res.mileage
					this.propertys[3].value = res.vehicleOwner
					this.propertys[4].value = res.phone
					this.repairItems = res.items
					this.updateTotalAmount()
				})
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
					var data = {
						"plateNumber": formData.plateNumber,
						"plateColor": 0, // 车牌颜色 0蓝 1黄 2黑 3白 4渐变绿 5黄绿双拼 6蓝白渐变，目前全传0
						"carModel": formData.carModel,
						"mileage": formData.mileage,
						"vehicleOwner": formData.owner,
						"phone": formData.phone,
						"items": this.repairItems,
					}
					var url
					if (!this.orderID) { // 新建
						url = 'order/create'
					} else { // 编辑
						url = 'order/update'
						data.id = this.orderID
					}
					this.$req.request({
						path: url,
						data: data,
					}).then((res) => {
						this.canEdit = false
						this.orderID = res
					})
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
					url: '../repair_item/repair_item_list?type=1',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						selectRepairItem: function({
							data // 解构
						}) {
							// 订单里的维修项ID叫itemId，这里统一用itemId
							data.itemId = data.id
							console.log(data)
							var isNewItem = true
							for (let item of that.repairItems) {
								console.log('for')
								console.log(item)
								if (item.itemId == data.itemId) {
									item.count += 1
									isNewItem = false
									break
								}
							}
							if (isNewItem) {
								data.count = 1
								that.repairItems.push(data)
							}
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
			addButtonClicked(item) {
				item.count += 1;
				this.updateTotalAmount()
			},
			subtractButtonClicked(item) {
				if (item.count > 1) {
					item.count -= 1
				} else {
					this.repairItems.splice(this.repairItems.indexOf(item), 1)
				}
				this.updateTotalAmount()
			},
			editButtonClicked() {
				this.canEdit = true
			},
			deleteButtonClicked() {
				this.$req.request({
					path: 'order/delete',
					data: {
						id: this.orderID
					},
				}).then((res) => {
					uni.navigateBack()
					uni.showToast({
						title: '删除成功'
					})
				})
			},
		}
	}
</script>

<style>
	.bottom-border {
		border-bottom: 1rpx solid lightgray;
	}

	.hint {
		font-size: 24rpx;
		padding-left: 10rpx;
		margin-bottom: 10rpx;
		color: gray;
	}

	.basic-item {
		padding: 8rpx 20rpx;
	}

	.uni-input {
		font-size: 36rpx;
		text-align: right;
		height: 48rpx;
	}

	.add-button {
		font-size: 24rpx;
		color: royalblue;
		margin-right: 10rpx;
		border-bottom: 1rpx solid royalblue;
	}

	.repair-item {
		padding: 8rpx 20rpx;
		flex-wrap: nowrap;
	}

	.repair-item-count {
		padding: 4rpx 25rpx 0 25rpx;
		color: darkgray;
		font-size: 24rpx;
	}

	.uni-btn-v {
		margin: 50rpx;
	}

	.button-delete {
		color: red;
	}
</style>
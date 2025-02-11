<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex bottom-border" v-for="property in propertys" :key="property.id">
					<view class="gar-content">{{property.title}}</view>
					<div class="gar-flex-row">
						<input class="uni-input" :disabled="!canEdit" :name="property.name"
							:placeholder="property.title" v-model="property.value" />
						<image class="item-image" v-if="canEdit && property.name == 'plateNumber'" @click="onScan"
							src="../../static/scan.png" mode="aspectFill"></image>
					</div>
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
						<button form-type="submit">提交</button>
						<div v-if="canEdit && type == 1">
							<button class="button-delete" @click="deleteButtonClicked()">删除</button>
							<button class="button-cancel" @click="cancelButtonClicked()">取消</button>
						</div>
					</div>
					<button @click="editButtonClicked()" v-else>编辑</button>
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
				type: 0, // 0 add, 1 update
				canEdit: true,
				bill: {},
				propertys: [{
					title: '车牌号',
					name: 'plateNumber',
					value: null,
					check: null,
				}, {
					title: '车型',
					name: 'carModel',
					value: null,
					check: null,
				}, {
					title: '公里数',
					name: 'mileage',
					value: null,
					check: null,
				}, {
					title: '车主',
					name: 'owner',
					value: null,
					check: null,
				}, {
					title: '车主号码',
					name: 'phone',
					value: null,
					check: null,
				}, {
					title: '施工员',
					name: 'operator',
					value: null,
					check: null,
				}],
				repairItems: [],
				totalAmount: 0,
			}
		},
		onLoad(e) {
			if (e.item) {
				this.bill = JSON.parse(e.item)
				console.log('onLoad')
				console.log(this.bill)
				this.canEdit = false
				this.type = 1
				this.refreshShowingData()
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
						name: "plateNumber",
						checkType: "reg",
						checkRule: "^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳使领]$",
						errorMsg: "车牌号格式错误"
					},
					{
						name: "mileage",
						checkType: "int",
						checkRule: "0,5",
						errorMsg: "公里数错误"
					},
					{
						name: "repairItems",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "项目必填"
					},
					{
						name: "operator",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "施工员必填"
					},
				];
				//进行表单检查
				var formData = e.detail.value
				formData.repairItems = this.repairItems
				if (!graceChecker.check(formData, rule)) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return
				}

				this.bill.plateNumber = formData.plateNumber
				this.bill.carModel = formData.carModel
				this.bill.mileage = formData.mileage
				this.bill.owner = formData.owner
				this.bill.phone = formData.phone
				this.bill.operator = formData.operator
				this.bill.items = JSON.parse(JSON.stringify(this.repairItems))
				this.bill.amount = this.totalAmount

				if (this.type == 0) {
					this.bill.date = new Date()
					uni.showLoading({
						mask: true
					})
					wx.cloud.callFunction({
						name: 'add',
						data: {
							collectionName: 'repair-bill',
							data: this.bill
						},
						success: res => {
							console.log('[云函数] [add] 调用成功：', res.result)
							this.canEdit = false
							this.type = 1
							uni.showToast({
								title: '创建成功',
								icon: 'success'
							});
						},
						fail: err => {
							console.error('[云函数] [add] 调用失败', err)
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						}
					})
				} else {
					uni.showLoading({
						mask: true
					})
					wx.cloud.callFunction({
						name: 'update',
						data: {
							collectionName: 'repair-bill',
							_id: this.bill._id,
							data: this.bill
						},
						success: res => {
							console.log('[云函数] [update] 调用成功：', res.result)
							this.canEdit = false
							uni.showToast({
								icon: 'success',
								title: '更新成功'
							})
						},
						fail: err => {
							console.error('[云函数] [update] 调用失败', err)
							uni.showToast({
								icon: 'none',
								title: '请求失败'
							})
						}
					})
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
							console.log(data)
							var isNewItem = true
							for (let item of that.repairItems) {
								console.log('for')
								console.log(item)
								if (item._id == data._id) {
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
			cancelButtonClicked() {
				this.canEdit = false
				this.refreshShowingData()
			},
			deleteButtonClicked() {
				uni.showModal({
					content: '确定删除吗',
					confirmColor: '#f00',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							wx.cloud.callFunction({
								name: 'remove',
								data: {
									collectionName: 'repair-bill',
									_id: this.bill._id
								},
								success: res => {
									wx.hideLoading()
									console.log('[云函数] [remove] 调用成功：', res.result)
									if (res.result.succeed) {
										uni.navigateBack()
										uni.showToast({
											title: '删除成功'
										})
									} else {
										this.setData({
											error: '删除失败'
										})
									}
								},
								fail: err => {
									console.error('[云函数] [remove] 调用失败', err)
									uni.showToast({
										icon: 'none',
										title: '请求失败'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			refreshShowingData() {
				this.propertys[0].value = this.bill.plateNumber
				this.propertys[1].value = this.bill.carModel
				this.propertys[2].value = this.bill.mileage
				this.propertys[3].value = this.bill.owner
				this.propertys[4].value = this.bill.phone
				this.propertys[5].value = this.bill.operator
				this.repairItems = JSON.parse(JSON.stringify(this.bill.items)) // 重新生成对象，否则会被同步修改
				this.updateTotalAmount()
			},
			onScan() {
				if (this.canEdit) {
					this.$ocr.takePhotoAndRecognizePlateNumber().then((res) => {
						this.propertys[0].value = res
					})
				}
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

	.item-image {
		width: 30rpx;
		height: 30rpx;
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
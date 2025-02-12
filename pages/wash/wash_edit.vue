<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex bottom-border" v-for="property in propertys" :key="property.id">
					<view class="gar-content">{{property.title}}</view>
					<input class="uni-input" :disabled="!canEdit" :name="property.name" :placeholder="property.title"
						v-model="property.value" />
				</view>
				<view class="uni-btn-v">
					<div v-if="canEdit">
						<button form-type="submit">提交</button>
						<div v-if="canEdit && type == 1">
							<button class="button-delete" @click="deleteButtonClicked()">删除</button>
							<button class="button-cancel" @click="cancelButtonClicked()">取消</button>
						</div>
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
				type: 0, // 0 add, 1 update
				canEdit: true,
				car: {},
				propertys: [{
					title: '车牌号',
					name: 'plateNumber',
					value: null,
					check: null,
				}, {
					title: '剩余洗车次数',
					name: 'washTimesLeft',
					value: null,
					check: null,
				}],
			}
		},
		onLoad(e) {

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
						name: "washTimesLeft",
						checkType: "int",
						checkRule: "0,5",
						errorMsg: "剩余洗车次数错误"
					}
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

				this.car.plateNumber = formData.plateNumber
				this.car.washTimesLeft = formData.washTimesLeft

				if (this.type == 0) {
					this.car.date = new Date()
					uni.showLoading({
						mask: true
					})
					wx.cloud.callFunction({
						name: 'add',
						data: {
							collectionName: 'car-info',
							data: this.car
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
			editButtonClicked() {
				this.canEdit = true
			},
			cancelButtonClicked() {
				this.canEdit = false
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

	.uni-btn-v {
		margin: 50rpx;
	}

	.button-delete {
		color: red;
	}
</style>
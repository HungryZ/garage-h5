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
				<button class="uni-btn-v" @click="washClicked">新增洗车一次</button>
				<div class="gar-flex" style="padding-top: 30rpx;">
					<div class="hint">洗车记录</div>
				</div>
				<view class="repair-item gar-flex bottom-border" v-if="car.washRecords"
					v-for="(record, index) in car.washRecords" :key="index">
					<view class="gar-content">{{new Date(record).toLocaleString() + ' 洗车一次'}}</view>
				</view>
				<view class="hint gar-content" v-else>无洗车记录</view>
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
				canEdit: false,
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
			this.plateNumber = e.plateNumber
			this.requestWashRecord()
		},
		methods: {
			requestWashRecord() {
				uni.showLoading({
					title: this.plateNumber,
				})
				wx.cloud.callFunction({
					name: 'regexp-search',
					data: {
						collectionName: 'car-info',
						field: 'plateNumber',
						value: this.plateNumber,
					},
					success: res => {
						uni.hideLoading()
						console.log('[云函数] [regexp-search] 调用成功：', res.result)
						const data = res.result.data
						if (data.length > 1) {
							const that = this
							const plateNumbers = data.map(item => item.plateNumber)
							uni.showActionSheet({
								title:'选择具体车牌',
								itemList: plateNumbers,
								success: function(res) {
									that.car = data[res.tapIndex]
									that.propertys[0].value = that.car.plateNumber
									that.propertys[1].value = that.car.washTimesLeft
								},
								fail: function(res) {
									uni.navigateBack()
								}
							})
						} else {
							this.car = data[0]
							this.propertys[0].value = this.car.plateNumber
							this.propertys[1].value = this.car.washTimesLeft
						}
					},
					fail: err => {
						console.error('[云函数] [regexp-search] 调用失败', err)
						wx.showToast({
							icon: 'none',
							title: '请求失败'
						})
					}
				})
			},
			washClicked() {
				if (this.car.washTimesLeft <= 0) {
					uni.showModal({
						content: '无剩余洗车次数',
						showCancel: false
					})
					return
				}
				var washRecords
				if (this.car.washRecords == null) {
					washRecords = [new Date()]
				} else {
					washRecords = this.car.washRecords.slice()
					washRecords.unshift(new Date())
				}
				// 是否需要二次弹窗确认
				var shouldConfirm = false
				if (washRecords.length > 1) {
					// 毫秒级时间戳
					// 洗车记录是倒序保存的，所以取 0，1
					let lastWashTime = new Date(washRecords[1]).getTime()
					let currentWashTime = new Date(washRecords[0]).getTime()
					let timeDiff = currentWashTime - lastWashTime
					if (timeDiff < 5 * 60 * 1000) {
						// 五分钟内重复洗车，二次弹窗确认
						shouldConfirm = true
					}
				}
				if (shouldConfirm) {
					let that = this
					uni.showModal({
						title: '提示',
						content: '确定五分钟内重复洗车吗',
						success: function(res) {
							if (res.confirm) {
								that.requestWashForOneTime(washRecords)
							}
						}
					})
				} else {
					this.requestWashForOneTime(washRecords)
				}
			},
			requestWashForOneTime(newWashRecords) {
				uni.showLoading({
					mask: true
				})
				wx.cloud.callFunction({
					name: 'update',
					data: {
						collectionName: 'car-info',
						_id: this.car._id,
						data: {
							'washRecords': newWashRecords,
							'washTimesLeft': this.car.washTimesLeft - 1
						}
					},
					success: res => {
						console.log('[云函数] [update] 调用成功：', res.result)
						this.car.washRecords = newWashRecords
						this.car.washTimesLeft -= 1
						this.propertys[1].value = this.car.washTimesLeft
						uni.showToast({
							icon: 'success',
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
</style>
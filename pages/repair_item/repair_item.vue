<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="basic-item gar-flex bottom-border" v-for="property in properties" :key="property.title">
					<view class="gar-title">{{property.title}}</view>
					<input class="uni-input" :disabled="!canEdit" :name="property.name" placeholder="placeholder"
						v-model="property.value" />
				</view>
				<view class="uni-btn-v">
					<div v-if="canEdit">
						<button form-type="submit">提交</button>
						<button class="button-delete" @click="deleteButtonClicked()" v-if="type == 1 && canEdit">删除</button>
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
				item: {},
				properties: [{
					title: '名称',
					name: 'name',
					value: null,
					check: null,
				}, {
					title: '单价',
					name: 'price',
					value: null,
					check: null,
				}],
			}
		},
		onLoad(e) {
			if (e.item) {
				this.canEdit = false
				this.type = 1
				this.item = JSON.parse(e.item)
				this.properties[0].value = this.item.name
				this.properties[1].value = this.item.price
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(this.properties)
				// 定义表单规则
				var rule = [
					{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "名称不能为空"
					},
					{
						name: "price",
						checkType: "int",
						checkRule: "0,5",
						errorMsg: "单价错误"
					}
				];
				// 进行表单检查
				var formData = e.detail.value;
				formData.price = Number(formData.price)
				var checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return
				}
				if (this.type == 0) {
					this.createItem(formData)
				} else {
					this.updateItem(formData)
				}
			},
			resetItemsValue: function(e) {
				this.properties.forEach(property => {
					property.value = null
				})
			},
			editButtonClicked() {
				this.canEdit = true
			},
			deleteButtonClicked() {
				uni.showLoading({
					mask: true
				})
				wx.cloud.callFunction({
					name: 'remove',
					data: {
						collectionName: 'repair-item',
						_id: this.item._id
					},
					success: res => {
						console.log('[云函数] [remove] 调用成功：', res.result)
						if (res.result.succeed) {
							uni.showToast({
								icon: 'success',
								title: '删除成功',
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 500);
						} else {
							uni.showToast({
								icon: 'none',
								title: '请求失败'
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
			},
			createItem(item) {
				wx.cloud.callFunction({
					name: 'add',
					data: {
						collectionName: 'repair-item',
						data: item
					},
					success: res => {
						console.log('[云函数] [add] 调用成功：', res.result)
						this.canEdit = false
					},
					fail: err => {
						console.error('[云函数] [add] 调用失败', err)
						wx.showToast({
							icon: 'none',
							title: '请求失败'
						})
					}
				})
			},
			updateItem(item) {
				wx.cloud.callFunction({
					name: 'update',
					data: {
						collectionName: 'repair-item',
						_id: this.item._id,
						data: item
					},
					success: res => {
						console.log('[云函数] [update] 调用成功：', res.result)
						this.canEdit = false
					},
					fail: err => {
						console.error('[云函数] [update] 调用失败', err)
						wx.showToast({
							icon: 'none',
							title: '请求失败'
						})
					}
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
		color: gray;
	}

	.basic-item {
		padding: 8rpx 25rpx;
	}

	.uni-input {
		font-size: 36rpx;
		text-align: right;
	}

	.uni-btn-v {
		margin: 50rpx;
	}

	.button-delete {
		color: red;
	}
</style>
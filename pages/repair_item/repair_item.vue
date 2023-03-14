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
						<button form-type="submit">Submit</button>
						<button class="button-delete" @click="deleteButtonClicked()" v-if="itemID">Delete</button>
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
				itemID: false,
				canEdit: true,
				properties: [{
					title: 'name',
					name: 'name',
					value: null,
					check: null,
				}, {
					title: 'price',
					name: 'price',
					value: null,
					check: null,
				}],
			}
		},
		onLoad(e) {
			if (e.item) {
				console.log(e)
				this.canEdit = false
				let item = JSON.parse(e.item)
				this.itemID = item.id
				this.properties[0].value = item.name
				this.properties[1].value = item.price
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(this.properties)
				//定义表单规则
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
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return
				}
				if (this.itemID) {
					this.updateItem(formData)
				} else {
					this.createItem(formData)
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
				uni.request({
					url: 'https://klogan.cn/zhc/item/delete',
					method: 'POST',
					data: {id: this.itemID},
					success: (res) => {
						console.log('success:')
						console.log(res)
						uni.navigateBack()
						uni.showToast({
							title: '删除成功'
						})
					},
					fail: (err) => {
						console.log('fail:' + JSON.stringify(err))
					},
				})
			},
			createItem(item) {
				uni.request({
					url: 'https://klogan.cn/zhc/item/create',
					method: 'POST',
					data: item,
					success: (res) => {
						console.log('success:')
						console.log(res)
						uni.showToast({
							title: '成功'
						})
						this.resetItemsValue()
					},
					fail: (err) => {
						console.log('fail:' + JSON.stringify(err))
					},
				})
			},
			updateItem(item) {
				item.id = this.itemID
				uni.request({
					url: 'https://klogan.cn/zhc/item/update',
					method: 'POST',
					data: item,
					success: (res) => {
						console.log('success:')
						console.log(res)
						uni.showToast({
							title: '成功'
						})
						this.canEdit = false
					},
					fail: (err) => {
						console.log('fail:' + JSON.stringify(err))
					},
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

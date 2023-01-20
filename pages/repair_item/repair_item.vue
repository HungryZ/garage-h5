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
					title: 'name',
					name: 'name',
					check: null,
				}, {
					title: 'price',
					name: 'price',
					check: null,
				}],
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

	.uni-btn-v {
		margin: 50rpx;
	}
</style>

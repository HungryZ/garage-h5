<template>
	<view>
		<page-head title="form"></page-head>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<div class="hint">基础信息</div>
				<view class="uni-form-item gar-flex-row" v-for="item in items">
					<view class="title">{{item.title}}</view>
					<input class="uni-input" :name="item.name" placeholder="placeholder" />
				</view>
				<div class="gar-flex" style="padding-top: 30rpx;">
					<div class="hint">项目</div>
					<div class="add-button" @click="addRepairItemClicked()">添加</div>
				</div>
				<view class="uni-form-item gar-flex-row" v-for="repairItem in repairItems">
					<view class="title">{{repairItem.title}}</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
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
				repairItems: [],
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
			formReset: function(e) {
				console.log('清空数据')
			},
			addRepairItemClicked() {
				console.log('addRepairItemClicked')
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

	.add-button {
		color: royalblue;
		border-bottom: 1rpx solid royalblue;
		margin-right: 10rpx;
	}

	.uni-form-item {
		border-bottom: 1rpx solid lightgray;
		padding: 8rpx 10rpx;
	}

	.title {
		margin: 0 10rpx;
		width: 150rpx;
		font-size: 36rpx;
	}

	.uni-input {
		font-size: 36rpx;
	}
</style>

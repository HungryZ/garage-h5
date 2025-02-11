<template>
	<div class="container">
		<div class="row gar-flex">
			<div class="header">铠驰汽车养护中心</div>
			<view class="date">{{new Date(this.bill.date).toLocaleDateString()}}</view>
		</div>
		<div class="bottom-border" style="margin-top: 0;"></div>
		<div class="hint">车辆信息</div>
		<view v-for="item in car_infos" :key="item.title">
			<div v-if="item.content" class="row gar-flex">
				<view class="title">{{item.title}}</view>
				<view class="content">{{item.content}}</view>
			</div>
		</view>
		<div class="bottom-border"></div>
		<div class="hint">维修项目</div>
		<view class="row gar-flex" v-for="repairItem in bill.items" :key="repairItem.name">
			<view class="title">
				{{repairItem.name + (repairItem.count > 1 ? ' (*' + repairItem.count + ')' : '')}}
			</view>
			<view class="content">¥ {{(repairItem.price * repairItem.count).toLocaleString()}}</view>
		</view>
		<div class="bottom-border"></div>
		<view class="gar-flex row">
			<view class="gar-content">合计</view>
			<view class="amount">
				¥ {{bill.amount.toLocaleString()}}</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bill: {},
				car_infos: [],
			}
		},
		onLoad(e) {
			this.bill = JSON.parse(e.bill)
			this.car_infos = [{
					title: "车牌号码",
					content: this.bill.plateNumber,
				},
				{
					title: "车型",
					content: this.bill.carModel,
				},
				{
					title: "公里数",
					content: this.bill.mileage,
				},
				{
					title: "车主",
					content: this.bill.owner,
				},
				{
					title: "车主号码",
					content: this.bill.phone,
				},
				{
					title: "施工员",
					content: this.bill.operator,
				},
			]
		},
	}
</script>

<style>
	.container {
		padding: 20px;
	}

	.header {
		font-size: 48rpx;
		padding-left: 10rpx;
		padding-bottom: 20rpx;
	}

	.date {
		font-size: 28rpx;
		padding-right: 10rpx;
		color: dimgray;
	}

	.bottom-border {
		margin: 40rpx 10rpx 40rpx 10rpx;
		border-bottom: 1rpx solid lightgray;
	}

	.hint {
		font-size: 24rpx;
		padding-left: 10rpx;
		margin-bottom: 10rpx;
		color: gray;
	}

	.row {
		padding: 12rpx 0rpx;
		flex-wrap: nowrap;
	}

	.title {
		margin: 0 20rpx;
		font-size: 28rpx;
		color: gray;
		width: 64%;
	}

	.content {
		margin: 0 20rpx;
		font-size: 28rpx;
		color: #222;
	}

	.amount {
		text-align: right;
		font-size: 36rpx;
		font-weight: bold;
	}
</style>
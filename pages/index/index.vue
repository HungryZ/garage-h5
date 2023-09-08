<template>
	<view class="container gar-flex-column">
		<div v-for="category in categorys" :key="category.categoryName">
			<div class="category-title">{{ category.categoryName }}</div>
			<div class="gar-flex-row gar-flex-wrap category-content">
				<navigator class="item" :url="item.url" v-for="item in category.items" :key="item.text">
					<image class="item-image" src="../../static/logo.png" mode="aspectFill"></image>
					<div class="item-title">{{ item.text }}</div>
				</navigator>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorys: [{
					categoryName: "维修单",
					items: [{
							icon: '../../static/logo.png',
							text: '新建',
							url: '../repair_bill/repair_bill'
						},
						{
							icon: '../../images/BusinessIcons_DollarCoin.png',
							text: '列表',
							url: '../repair_bill/repair_bill_list'
						},
						{
							icon: '../../images/BusinessIcons_WalletMoney-.png',
							text: '扫一扫',
							url: 'scan/scan'
						},
					]
				}, {
					categoryName: "维修项目",
					items: [{
							icon: '../../static/logo.png',
							text: '新建',
							url: '../repair_item/repair_item'
						},
						{
							icon: '../../images/BusinessIcons_DollarCoin.png',
							text: '列表',
							url: '../repair_item/repair_item_list'
						},
					]
				}, {
					categoryName: "其他",
					items: [{
							icon: '../../images/BusinessIcons_ShareMoney.png',
							text: '统计',
							url: 'statistics/statistics'
						},
						{
							icon: '../../images/BusinessIcons_YenMoneyDeal.png',
							text: '账号管理'
						},
					]
				}]
			}
		},
		methods: {
			itemClicked() {
				console.log('111')
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		line-height: 24px;
		align-items: flex-start;
	}

	.item {
		text-align: center;
		width: 160rpx;
		height: 160rpx;
		font-size: 26rpx;
	}

	.item-image {
		width: 60rpx;
		height: 60rpx;
	}

	.item-title {
		/* font-size: 1px; */
		/* background-color: red; */
	}

	.category-title {
		font-size: 36rpx;
		padding: 10rpx 10rpx 40rpx 0rpx;
	}

	.category-content {
		padding-bottom: 50rpx;
	}
</style>

<template>
	<view class="container gar-flex">
		<page-head title="form"></page-head>
		<div class="item" v-for="item in items" :key="item.id">
			<navigator :url="item.url">
				<div>
					<image class="item-image" src="../../static/logo.png" mode="aspectFill"></image>
				</div>
				<div>{{ item.text }}</div>
			</navigator>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						icon: '../../static/logo.png',
						text: '新建维修单',
						url: '../repair_bill/repair_bill'
					},
					{
						icon: '../../images/BusinessIcons_BlankMonitor.png',
						text: '新建采购单',
						url: 'bill/cud/cud?itemType=1'
					},
					{
						icon: '../../images/BusinessIcons_DollarCoin.png',
						text: '查询维修单',
						url: 'bill/search/search?itemType=0'
					},
					{
						icon: '../../images/BusinessIcons_GoldMoney.png',
						text: '查询采购单',
						url: 'bill/search/search?itemType=1'
					},
					{
						icon: '../../images/BusinessIcons_PoundMoneyDeal.png',
						text: '管理修理项目',
						url: 'item/menu/menu?itemType=0'
					},
					{
						icon: '../../images/BusinessIcons_SafeMoney.png',
						text: '管理采购项目',
						url: 'item/menu/menu?itemType=1'
					},
					{
						icon: '../../images/BusinessIcons_ShareMoney.png',
						text: '统计',
						url: 'statistics/statistics'
					},
					{
						icon: '../../images/BusinessIcons_WalletMoney-.png',
						text: '扫一扫',
						url: 'scan/scan'
					},
					{
						icon: '../../images/BusinessIcons_YenMoneyDeal.png',
						text: '账号管理'
					}
				]
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
		font-size: 14px;
		line-height: 24px;
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
</style>

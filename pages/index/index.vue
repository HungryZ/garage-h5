<template>
	<view class="container gar-flex-column">
		<div v-for="category in categorys" :key="category.categoryName">
			<div class="category-title">{{ category.categoryName }}</div>
			<div class="gar-flex-row gar-flex-wrap category-content">
				<div v-for="item in category.items" :key="item.text">
					<div class="item" @click=itemClicked(item)>
						<image class="item-image" :src="item.icon" mode="aspectFill"></image>
						<div class="item-title">{{ item.text }}</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorys: [{
					categoryName: "维修记录",
					items: [{
							icon: '../../static/bill.png',
							text: '新建',
							url: '../repair_bill/repair_bill'
						},
						{
							icon: '../../static/scan.png',
							text: '拍照搜索',
							action: () => {
								this.$ocr.takePhotoAndRecognizePlateNumber().then((res) => {
									uni.navigateTo({
										url: '../repair_bill/repair_bill_list?plateNumber=' +
											res,
									});
								})
							}
						},
						{
							icon: '../../static/search.png',
							text: '输入搜索',
							action: () => {
								uni.showModal({
									title: '输入车牌号进行搜索',
									editable: true,
									placeholderText: '车牌号',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../repair_bill/repair_bill_list?plateNumber=' +
													res.content
											})
										}
									}
								})
							}
						},
					]
				}, {
					categoryName: "项目",
					items: [{
							icon: '../../static/item.png',
							text: '新建',
							url: '../repair_item/repair_item'
						},
						{
							icon: '../../static/list.png',
							text: '列表',
							url: '../repair_item/repair_item_list'
						},
					]
				}, {
					categoryName: "洗车",
					items: [{
							icon: '../../static/wash.png',
							text: '拍照洗车',
							action: () => {
								this.$ocr.takePhotoAndRecognizePlateNumber().then((res) => {
									uni.navigateTo({
										url: '../wash/wash_record?plateNumber=' +
											res,
									})
								})
							},
						},
						{
							icon: '../../static/search.png',
							text: '输入洗车',
							action: () => {
								uni.showModal({
									title: '输入车牌号进行搜索',
									editable: true,
									placeholderText: '车牌号',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../wash/wash_record?plateNumber=' +
													res.content
											})
										}
									}
								})
							}
						}, {
							icon: '../../static/banka.png',
							text: '办卡',
							url: '../wash/wash_edit'
						}, {
							icon: '../../static/vip_manage.png',
							text: '会员管理',
							url: '../wash/wash_vip_list'
						},
					]
				}]
			}
		},
		methods: {
			itemClicked(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url,
					});
				} else if (item.action) {
					item.action()
				}
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

	.category-title {
		font-size: 36rpx;
		padding: 10rpx 10rpx 10rpx 0rpx;
		/* background-color: aqua; */
	}

	.category-content {
		padding: 10rpx 0rpx 50rpx 0rpx;
		/* background-color: antiquewhite; */
	}

	.item {
		text-align: center;
		width: 150rpx;
		/* height: 160rpx; */
		font-size: 26rpx;
		padding: 10rpx 10rpx 10rpx 0rpx;
		/* background-color: blueviolet; */
	}

	.item-image {
		width: 60rpx;
		height: 60rpx;
	}

	.item-title {
		/* font-size: 1px; */
		/* background-color: red; */
	}
</style>
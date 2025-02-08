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
					categoryName: "Record",
					items: [{
							icon: '../../static/c1.png',
							text: 'new',
							url: '../repair_bill/repair_bill'
						},
						{
							icon: '../../static/c2.png',
							text: 'search',
							action: () => {
								uni.navigateTo({
									url: '../repair_bill/repair_bill_list?plateNumber=888'
								})
								return
							}
						},
						{
							icon: '../../static/c3.png',
							text: 'scan',
							action: () => {
								uni.navigateTo({
									url: '../repair_bill/repair_bill_list?plateNumber=浙AK162Y'
								})
								return
								// 选择图片
								wx.chooseMedia({
									count: 1,
									mediaType: ['image'],
									sourceType: ['camera'],
									sizeType: ['compressed'],
									camera: 'back',
									success: async function(res) {
										uni.showLoading({
											title: '识别中···'
										})
										try {
											const invokeRes = await wx.serviceMarket
												.invokeService({
													service: 'wx79ac3de8be320b71',
													api: 'OcrAllInOne',
													data: {
														// 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
														img_url: new wx.serviceMarket.CDN({
															type: 'filePath',
															filePath: res
																.tempFiles[0]
																.tempFilePath,
														}),
														data_type: 3,
														ocr_type: 10
													},
												})
											console.log('invokeService success', invokeRes)
											uni.hideLoading()
											if (invokeRes.errMsg == 'invokeService:ok') {
												let plateNum = invokeRes.data.plate_num_res
													.number.text
												uni.navigateTo({
													url: '../repair_bill/repair_bill_list?plateNumber=' +
														plateNum,
												});
											} else {
												uni.showToast({
													title: '识别失败',
													icon: 'error'
												});
											}
										} catch (err) {
											console.error('invokeService fail', err)
											uni.showToast({
												title: '识别失败',
												icon: 'error'
											});
										}
									},
									fail(err) {
										uni.showToast({
											title: '拍照失败',
											icon: 'error'
										});
									},
								})
								/*
								
								*/
							}
						},
					]
				}, {
					categoryName: "Item",
					items: [{
							icon: '../../static/c1.png',
							text: 'new',
							url: '../repair_item/repair_item'
						},
						{
							icon: '../../static/c2.png',
							text: 'list',
							url: '../repair_item/repair_item_list'
						},
					]
				}, {
					categoryName: "Wash",
					items: [{
							icon: '../../static/c1.png',
							text: 'newWashVip',
							url: '../wash/wash_edit'
						},
						{
							icon: '../../static/c2.png',
							text: 'manage'
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
		width: 160rpx;
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
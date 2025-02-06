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
							icon: '../../static/c1.png',
							text: '新建',
							url: '../repair_bill/repair_bill'
						},
						{
							icon: '../../static/c2.png',
							text: '车牌查询',
							action: () => {
								console.log('车牌查询')
							}
						},
						{
							icon: '../../static/c3.png',
							text: '扫一扫',
							action: () => {
								console.log('扫一扫')
								// 选择图片
								wx.chooseMedia({
									count: 1,
									mediaType: ['image'],
									sourceType: ['camera'],
									sizeType: ['compressed'],
									camera: 'back',
									success: async function(res) {
										console.log(res.tempFiles[0])
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
											if (invokeRes.errMsg == 'invokeService:ok') {
												uni.showModal({
													title: invokeRes.data.plate_num_res
														.number.text
												})
											}
										} catch (err) {
											console.error('invokeService fail', err)
											uni.showToast({
												title: '识别失败'
											});
										}
									},
									fail(err) {
										uni.showToast({
											title: '拍照失败',
											icon: "none"
										});
									},
								})
								/*
								
								*/
							}
						},
					]
				}, {
					categoryName: "维修项目",
					items: [{
							icon: '../../static/c1.png',
							text: '新建',
							url: '../repair_item/repair_item'
						},
						{
							icon: '../../static/c2.png',
							text: '列表',
							url: '../repair_item/repair_item_list'
						},
					]
				}, {
					categoryName: "其他",
					items: [{
							icon: '../../static/c1.png',
							text: '统计',
							url: 'statistics/statistics'
						},
						{
							icon: '../../static/c2.png',
							text: '账号管理'
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
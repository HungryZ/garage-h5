<template>
	<view vfor>
		<template v-for="(item, index) in items" :key="index">
			<div class="gar-flex item-row" @click="rowClicked(item)"
				style="background-color: {{index % 2 ? '#f5f5f5' : 'white'}};">
				<div> {{ item.plateNumber }} </div>
				<div style="font-family: Menlo;"> {{ item.date.substring(0, 10) }} </div>
			</div>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plateNumber: '',
				items: [],
			}
		},
		onLoad(e) {
			this.plateNumber = e.plateNumber
			this.requestItemList()
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.requestItemList()
		},
		onReachBottom() {

		},
		methods: {
			requestItemList() {
				uni.showLoading()
				wx.cloud.callFunction({
					name: 'regexp-search',
					data: {
						collectionName: 'repair-bill',
						field: 'plateNumber',
						value: this.plateNumber,
					},
					success: res => {
						uni.hideLoading()
						console.log('[云函数] [regexp-search] 调用成功：', res.result)
						this.items = res.result.data.reverse()
						console.log(this.items)
					},
					fail: err => {
						console.error('[云函数] [regexp-search] 调用失败', err)
						wx.showToast({
							icon: 'none',
							title: '请求失败'
						})
					}
				})
			},
			rowClicked(item) {
				uni.navigateTo({
					url: 'repair_bill?item=' + JSON.stringify(item),
				});
			},
		},
	}
</script>

<style>
	.item-row {
		height: 40rpx;
		padding: 20rpx;
	}
</style>
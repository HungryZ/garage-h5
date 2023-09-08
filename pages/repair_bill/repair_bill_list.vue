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
	const PAGE_SIZE = 100
	export default {
		data() {
			return {
				page: 0,
				hasMoreData: true,
				items: [],
			}
		},
		onLoad(e) {

		},
		onShow() {
			this.requestDataOfPage(1)
		},
		onPullDownRefresh() {
			this.requestDataOfPage(1)
		},
		onReachBottom() {
			this.requestDataOfPage(this.page + 1)
		},
		methods: {
			requestDataOfPage(page) {
				if (!this.hasMoreData && page != 1) return
				this.$req.request({
					path: 'order/listAll',
					data: {
						"page": page,
						"size": PAGE_SIZE,
						"condition": {},
					},
				}).then((res) => {
					this.page = page
					this.hasMoreData = res.list.length >= PAGE_SIZE
					if (this.page == 1) {
						this.items = res.list
					} else {
						this.items = [...this.items, ...res.list]
					}
				})
			},
			rowClicked(item) {
				uni.navigateTo({
					url: 'repair_bill?id=' + item.id,
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
<template>
	<view vfor>
		<template v-for="(item, index) in items" :key="index">
			<div class="gar-flex item-row" @click="rowClicked(item)"
				style="background-color: {{index % 2 ? '#f5f5f5' : 'white'}};">
				<div> {{ item.name }} </div>
				<div> {{ item.price }} </div>
			</div>
		</template>
	</view>
</template>

<script>
	const PAGE_SIZE = 100
	export default {
		data() {
			return {
				// 0:展示列表, 1:选择项目
				type: 0,
				page: 0,
				hasMoreData: true,
				items: [],
			}
		},
		onLoad(e) {
			if (e.type != null) {
				this.type = e.type
			}
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
					path: 'item/listAll',
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
				if (this.type == 0) {
					// 进入详情页
					uni.navigateTo({
						url: 'repair_item?item=' + JSON.stringify(item),
					});
				} else if (this.type == 1) {
					// 选择项目
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('selectRepairItem', {
						data: item
					});
					uni.navigateBack()
				}
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
<template>
	<view vfor>
		<button @click="newClicked">新建项目</button>
		<uni-search-bar placeholder="输入关键字进行搜索" @confirm="search" v-model="keyword"></uni-search-bar>
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
	export default {
		data() {
			return {
				// 0:展示列表, 1:选择项目
				type: 0,
				hasMoreData: true,
				keyword: '',
				items: [],
			}
		},
		onLoad(e) {
			if (e.type != null) {
				this.type = e.type
			}
		},
		onShow() {
			if (this.keyword.length > 0) {
				this.search()
			}
		},
		onPullDownRefresh() {},
		onReachBottom() {},
		methods: {
			search(res) {
				wx.showLoading({
					mask: true,
					title: this.keyword,
				})
				wx.cloud.callFunction({
					name: 'regexp-search',
					data: {
						collectionName: 'repair-item',
						field: 'name',
						value: this.keyword,
					},
					success: res => {
						wx.hideLoading()
						console.log('[云函数] [regexp-search] 调用成功：', res.result)
						this.items = res.result.data
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
			newClicked() {
				uni.navigateTo({
					url: '../repair_item/repair_item'
				})
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
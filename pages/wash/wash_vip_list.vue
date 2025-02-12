<template>
	<view vfor>
		<button @click="newClicked">新增洗车会员</button>
		<uni-search-bar placeholder="输入车牌号进行搜索" @confirm="search" v-model="keyword"></uni-search-bar>
		<template v-for="(car, index) in cars" :key="index">
			<div class="gar-flex item-row" @click="rowClicked(car)"
				style="background-color: {{index % 2 ? '#f5f5f5' : 'white'}};">
				<div> {{ car.plateNumber }} </div>
				<div> 剩余次数: {{ car.washTimesLeft }} </div>
			</div>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				cars: [],
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
						collectionName: 'car-info',
						field: 'plateNumber',
						value: this.keyword,
					},
					success: res => {
						wx.hideLoading()
						console.log('[云函数] [regexp-search] 调用成功：', res.result)
						this.cars = res.result.data
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
			rowClicked(car) {
				// 进入详情页
				uni.navigateTo({
					url: 'wash_edit?car=' + JSON.stringify(car),
				})
			},
			newClicked() {
				uni.navigateTo({
					url: 'wash_edit'
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
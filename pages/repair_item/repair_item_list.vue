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
	export default {
		data() {
			return {
				// 0:展示列表, 1:选择项目
				type: 0,
				items: [],
			}
		},
		onLoad(e) {
			if (e.type != null) {
				this.type = e.type
			}
		},
		onShow() {
			uni.request({
				url: 'https://klogan.cn/zhc/item/listAll',
				method: 'POST',
				data: {
					"page": 1,
					"size": 100,
					"condition": {},
				},
				success: (res) => {
					console.log('success:')
					console.log(res)
					// statusCode判断
					this.items = res.data.list
				},
				fail: (err) => {
					console.log('fail:' + JSON.stringify(err))
				},
			})
		},
		methods: {
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

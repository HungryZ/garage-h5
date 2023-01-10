<template>
	<div>repair_item</div>
	<div @click="buttonClicked()">好了</div>
</template>

<script>
	export default {
		methods: {
			buttonClicked() {
				this.getOpenerEventChannel().emit('selectRepairItem', {
					data: [{
						title: 'repair item 1',
						price: 200
					}, {
						title: 'repair item 1repair item 1repair item 1repair item 1repair item 1',
						price: 200
					}, {
						title: 'repair item 1',
						price: 200
					}],
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style>
</style>

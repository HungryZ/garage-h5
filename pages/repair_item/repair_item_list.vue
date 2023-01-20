<template>
	<view>
		<div v-for="item in items">
			<div> {{ item.name }}</div>
			<div> {{item.price }}</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					name: 'item1',
					price: 100,
				}, {
					name: 'item2',
					price: 200,
				}, {
					name: 'item3',
					price: 300,
				}, {
					name: 'item4',
					price: 400,
				}, {
					name: 'item5',
					price: 500,
				}, ]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>

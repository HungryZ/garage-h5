const BASE_URL = 'https://klogan.cn/zhc/'
export default {
	request: ({
		path,
		method = 'POST',
		showLoading = true,
		data,
	}) => {
		return new Promise((resolve, reject) => {
			console.log('--------------------- Request start ------------------------')
			console.log({
				path,
				method,
				showLoading,
				data,
			})
			console.log('------------------------------------------------------------\n\n')
			if (showLoading) {
				uni.showLoading({
					title: '加载中'
				})
			}
			uni.request({
				url: BASE_URL + path,
				method: method,
				data: data,
				success: (res) => {
					console.log
					if (res.statusCode == 200 && res.data.code == 200) {
						console.log(
							'--------------------- Request success ----------------------'
						)
						resolve(res.data.data)
					} else {
						console.log(
							'--------------------- Request fail ------------------------')
						reject(res.data)
					}
					console.log(res)
					console.log(
						'------------------------------------------------------------\n\n')
				},
				fail: (err) => {
					console.log('--------------------- Request fail ------------------------')
					console.log(err)
					console.log(
						'-----------------------------------------------------------\n\n')
					err.code = 10086
					err.msg = err.errMsg
					reject(err)
				},
				complete: () => {
					if (showLoading) {
						uni.hideLoading()
					}
				},
			})
		})
	}
}
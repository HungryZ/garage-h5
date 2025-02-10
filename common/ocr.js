export default {
	takePhotoAndRecognizePlateNumber: () => {
		return new Promise((resolve, reject) => {
			wx.chooseMedia({
				count: 1,
				mediaType: ['image'],
				sourceType: ['camera'],
				sizeType: ['compressed'],
				camera: 'back',
				success: async function(res) {
					uni.showLoading({
						title: '识别中···',
						mask: true
					})
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
						uni.hideLoading()
						if (invokeRes.errMsg == 'invokeService:ok') {
							let plateNum = invokeRes.data.plate_num_res
								.number.text
							resolve(plateNum)
						} else {
							uni.showToast({
								title: '识别失败',
								icon: 'error'
							});
							reject()
						}
					} catch (err) {
						console.error('invokeService fail', err)
						uni.showToast({
							title: '识别失败',
							icon: 'error'
						});
						reject()
					}
				},
				fail(err) {
					reject()
				},
			})
		})
	}
}
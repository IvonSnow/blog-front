import Mock from 'mockjs'

export default Mock.mock('/blog/api/list', 'get', {
	'articles|10': [
		{
			'article_id|+1': 1,
			'title|1': ['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者'],
			'author|1': ['薛云峰', 'xyf', 'pinus', 'king'],
			'abstract|1': [
				'你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响你翻译不了我的声响',
				'数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲数码宝贝主题曲',
				'摩天大楼太稀有sdddddddddddddddd21444444444444444444444444123像海浪撞破了山丘像海浪撞破了山丘',
				'像海浪撞破了山丘',
			],
			'cover|1': [
				'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
				'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
				'https://i.loli.net/2021/04/05/CBNkZGKwM1lJWSQ.jpg',
			],
			create_time: '2017-07-25 19:38:14',
			update_time: '2017-07-25 19:38:14',
		},
	],
})

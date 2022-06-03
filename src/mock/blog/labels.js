import Mock from 'mockjs'

export default Mock.mock('/blog/api/labels', 'get', {
	'data|15': [
		{
			'id|+1': 1,
			'label|1': ['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者'],
			'count|+1': 0,
		},
	],
})

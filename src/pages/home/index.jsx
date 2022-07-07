import React from 'react'
import { useMount, useRequest } from 'ahooks'
import { useState } from 'react'
import axios from 'axios'
import LabelArea from './components/LabelArea'
import WaterFall from './components/WaterFall'

import { isArray } from 'lodash'
// import '@/mock/user.js'

export default function Home() {
	const [curLabel, setCurLabel] = useState('')
	const { data: articles, error, loading } = useRequest(queryArticlesList)

	return (
		<>
			{/* 文章标签 */}
			<div style={{ marginBottom: 40 }}>
				<LabelArea />
			</div>
			{/* 推荐文章--瀑布流 */}
			{console.log(articles)}
			{isArray(articles) && <WaterFall data={articles} />}
		</>
	)
}

// 请求文章列表数据
const queryArticlesList = async () => {
	const { data: res } = await axios.get('/front/blog/articles/list').catch(err => {
		console.error(err)
	})

	let articles = []
	if (res.success && res.data) {
		articles = res.data
	}

	return articles
}

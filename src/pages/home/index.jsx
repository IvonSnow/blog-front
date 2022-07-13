import React, { useEffect } from 'react'
import { useMount, useRequest } from 'ahooks'
import { useState } from 'react'
import axios from 'axios'
import LabelArea from './components/LabelArea'
import WaterFall from './components/WaterFall'
import styles from './index.module.scss'
import { isArray } from 'lodash'
// import '@/mock/user.js'

// 请求文章列表数据
const queryArticlesList = async curLabel => {
	const { data: res } = await axios.get('/front/blog/articles/list').catch(err => {
		console.error(err)
	})

	let articles = []
	if (res.success && res.data) {
		articles = res.data
	}

	return articles
}

export default function Home() {
	const [curLabel, setCurLabel] = useState('')
	const {
		data: articles,
		error,
		loading,
	} = useRequest(async () => await queryArticlesList(curLabel))

	return (
		<div className={styles.homeContainer}>
			{/* 文章标签 */}
			<div style={{ marginBottom: 40 }}>
				<LabelArea select={setCurLabel} />
			</div>
			{/* 推荐文章--瀑布流 */}
			{isArray(articles) && <WaterFall data={articles} />}
		</div>
	)
}

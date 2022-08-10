import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import LabelArea from './components/LabelArea'
import WaterFall from './components/WaterFall'
import styles from './index.module.scss'
import { isArray } from 'lodash'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { LoadingOutlined } from '@ant-design/icons'
// import '@/mock/user.js'

// 请求文章列表数据
const queryArticlesList = async ({ pageSize, currentPage, curLabel }) => {
	const { data: res } = await axios
		.get('/front/blog/articles/list', {
			params: {
				label: curLabel,
				pageSize,
				currentPage,
			},
		})
		.catch(err => {
			console.error(err)
		})

	if (res.success && res.data) {
		return res.data
	}

	return {}
}

export default function Home() {
	const [curLabel, setCurLabel] = useState('')

	const {
		data: articles,
		isNoMore,
		loading,
	} = useInfiniteScroll(
		async ({ pageSize, currentPage }) =>
			await queryArticlesList({ pageSize, currentPage, curLabel }),
		{
			deps: [curLabel],
		}
	)

	const [tip, setTip] = useState(false)

	useEffect(() => {
		if (isNoMore) {
			setTip(true)
			setTimeout(() => {
				setTip(false)
			}, 2000)
		}
	}, [isNoMore])

	return (
		<div className={styles.homeContainer}>
			{/* 文章标签 */}
			<div style={{ marginBottom: 40 }}>
				<LabelArea select={setCurLabel} curLabel={curLabel} />
			</div>
			{/* 推荐文章--瀑布流 */}
			{isArray(articles) && <WaterFall data={articles} />}
			{/* loading more */}
			{loading && (
				<div className={styles.loadingMore}>
					<LoadingOutlined />
				</div>
			)}
			<div className={`${styles.noMoreTip} ${tip ? '' : styles.hideTip}`}>没有更多了TT</div>
		</div>
	)
}

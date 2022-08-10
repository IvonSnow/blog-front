import React, { useState } from 'react'
import TimeLineArticles from '@/components/TimeLineArticles'
import axios from 'axios'
import { useRequest } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import moment from 'moment'
import styles from './index.module.scss'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

async function getHeatMapData(year) {
	const { data: res } = await axios.get('/front/blog/articles/heat?year=' + year)

	let data = []
	if (res.success) {
		data = res.data.map(item => [item.created_at, item.sum])
	}
	return data
}

// 请求文章列表数据
const queryArticlesList = async ({ pageSize, currentPage }) => {
	const { data: res } = await axios
		.get('/front/blog/articles/list', {
			params: {
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

export default function PostTimeline() {
	const {
		data: articles,
		isNoMore,
		loading,
	} = useInfiniteScroll(
		async ({ pageSize, currentPage }) => await queryArticlesList({ pageSize, currentPage })
	)

	const [year, setYear] = useState('2022')
	const { data: heatMapData } = useRequest(async () => await getHeatMapData(year))

	const heatOptions = {
		title: {
			top: 30,
			left: 'center',
			text: '博客更新记录',
		},
		tooltip: {},
		visualMap: {
			min: 0,
			max: 8,
			type: 'piecewise',
			splitNumber: 4,
			orient: 'horizontal',
			left: 'center',
			top: 65,
			inRange: {
				color: ['#e6f7ff', '#40a9ff'],
			},
		},
		calendar: {
			top: 120,
			left: 30,
			right: 30,
			cellSize: ['auto', 13],
			range: year,
			itemStyle: {
				borderWidth: 0.6,
			},
			yearLabel: { show: false },
		},
		series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: heatMapData,
		},
	}

	return (
		<div>
			{/* 热力图 */}
			<div className={styles.heatMapWrap}>
				<ReactECharts option={heatOptions} />
			</div>

			{/* 时间线 */}
			<TimeLineArticles data={articles} />
		</div>
	)
}

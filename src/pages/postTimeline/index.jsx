import React from 'react'
import TimeLineArticles from '@/components/TimeLineArticles'
import axios from 'axios'
import { useRequest } from 'ahooks'

export default function PostTimeline() {
	const { data: articles, error, loading } = useRequest(queryArticlesList)

	return (
		<div>
			<h1>PostTimeline</h1>
			<TimeLineArticles data={articles} />
		</div>
	)
}

// 请求文章列表数据
const queryArticlesList = async () => {
	const {
		data: { articles: res },
	} = await axios.get('/blog/api/list').catch(err => {
		console.error(err)
	})

	return res
}

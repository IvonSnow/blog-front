import React from 'react'
import TimeLineArticles from '@/components/TimeLineArticles'
import axios from 'axios'
import { useRequest } from 'ahooks'

export default function PostTimeline() {
	const { data: articles, error, loading } = useRequest(queryArticlesList)

	return (
		<div>
			<TimeLineArticles data={articles} />
		</div>
	)
}

// 请求文章列表数据
// 请求文章列表数据
const queryArticlesList = async () => {
	const { data: res } = await axios.get('/front/blog/articles/list').catch(err => {
		console.error(err)
	})

	let articles = []
	if (res.success) {
		articles = res.data
	}

	return articles
}

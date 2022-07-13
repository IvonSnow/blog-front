import { useRequest } from 'ahooks'
import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import classNames from 'classnames'
import 'react-markdown-editor-lite/lib/index.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { BarsOutlined, CloseOutlined } from '@ant-design/icons'

import MarkdownNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

moment.locale('zh-cn')

const ArticleDetail = () => {
	const { id } = useParams()
	const { data = {} } = useRequest(async () => await queryArticleDetail(id))

	const [hideNav, sethideNav] = useState(false)

	return (
		<div className={styles.articleWraper}>
			<div className={styles.coverWraper}>
				<img src={data.cover_url} alt={data.title} />
			</div>
			<div className={styles.headerWrap}>
				<h1 className={styles.articleTitle}>{data.title}</h1>
				<div>
					<span className={styles.like}>{`${data.like_count}人赞同该文章`}</span>
					<span className={styles.time}>
						{moment(data.updated_at).format('MMMM Do YYYY')}
					</span>
				</div>
			</div>

			<div className={styles.hideBtn} onClick={() => sethideNav(!hideNav)}>
				{hideNav ? <BarsOutlined /> : <CloseOutlined />}
			</div>
			<div
				className={classNames(
					styles.articleNav,
					'navigation',
					hideNav ? styles.hideNav : styles.showNav
				)}
			>
				<MarkdownNavbar source={data.content_md} ordered={false} headingTopOffset={100} />
			</div>

			<div
				className={classNames(styles.articleContent, 'custom-html-style')}
				dangerouslySetInnerHTML={{ __html: data.content_html }}
			></div>
		</div>
	)
}

const queryArticleDetail = async id => {
	const { data: res } = await axios(`/front/blog/articles/detail?id=${id}`)
	if (res.success) {
		let article = res.data

		// 避免目录解析不出来第一行的标题
		if (article?.content_md.startsWith('#')) {
			article.content_md = '\n' + article.content_md
		}

		return article
	} else {
		throw new Error(res.message)
	}
}

export default ArticleDetail

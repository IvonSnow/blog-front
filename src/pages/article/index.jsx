import { useRequest } from 'ahooks'
import { message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import classNames from 'classnames'
import 'react-markdown-editor-lite/lib/index.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// // markdow语法解析器
// const mdParser = new MarkdownIt({
//   highlight: function (str, lang) {
//     if (lang && window.hljs.getLanguage(lang)) {
//       try {
//         return window.hljs.highlight(str, { language: lang }).value;
//       } catch (__) {}
//     }

//     return ''; // use external default escaping
//   },
// });

const ArticleDetail = () => {
	const { id } = useParams()
	const { data = {} } = useRequest(async () => await queryArticleDetail(id))

	console.log(moment.locales())

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
		return res.data
	} else {
		throw new Error(res.message)
	}
}

export default ArticleDetail

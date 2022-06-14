import React, { useEffect, useState } from 'react'
import { TagCloud } from 'react-tagcloud'
import { useRequest } from 'ahooks'
import axios from 'axios'
import { isArray } from 'lodash'
import styles from './index.module.scss'
import { Input, List, message, Skeleton, Space } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'

const { Search } = Input

export default function BlogSearch() {
	// 标签云
	const { data, error, loading } = useRequest(queryLabels)
	const [labels, setLabels] = useState([])
	// 搜索结果
	const [initLoading, setInitLoading] = useState(true)
	const [loadMoreing, setLoadMoreing] = useState(false)
	const [list, setList] = useState([])
	const [hasSearch, setHasSearch] = useState(false)

	useEffect(() => {
		let tags = []
		if (isArray(data)) {
			tags = data.map(item => ({
				value: item.name,
				count: item.article_count,
				color: '#858585',
			}))
			setLabels(tags)
		}
	}, [data])

	const handleSearch = (value, event) => {
		if (value) {
			setHasSearch(true)
			setInitLoading(true)
			axios
				.get('/front/blog/articles/search', {
					params: {
						keyword: value,
					},
				})
				.then(res => {
					if (res.data.success) {
						setList(res.data.data)
						setInitLoading(false)
					} else {
						message.error(res.data.message)
					}
				})
		} else {
			setHasSearch(false)
			setInitLoading(true)
		}
	}

	const loadMore = () => {
		console.log('loadMore')
	}

	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	)

	return (
		<div>
			{isArray(labels) && labels.length > 0 && (
				<TagCloud
					className={styles.tagCloud}
					tags={labels}
					minSize={12}
					maxSize={35}
					shuffle={true}
				/>
			)}

			<Search
				className={styles.search}
				placeholder='输入你想搜索的内容...'
				size='large'
				allowClear
				onSearch={handleSearch}
			/>

			{!hasSearch && (
				<div className={styles.searchMan}>
					<img src='./search.jpg' alt='' />
				</div>
			)}

			{hasSearch && list.length && (
				<List
					className={styles.searchResult}
					loading={initLoading}
					itemLayout='vertical'
					size='large'
					loadMore={loadMore}
					dataSource={list}
					renderItem={item => (
						<List.Item
							actions={[
								<IconText
									icon={LikeOutlined}
									text='156'
									key='list-vertical-like-o'
								/>,
								<IconText
									icon={MessageOutlined}
									text='2'
									key='list-vertical-message'
								/>,
							]}
							extra={<img width={272} alt='logo' src={item.cover_url} />}
						>
							<Skeleton title={true} loading={false} active round>
								<List.Item.Meta
									title={<h3>{item.title}</h3>}
									description={
										<p className={styles.description}>{item.abstract}</p>
									}
								/>
							</Skeleton>
						</List.Item>
					)}
				/>
			)}
			{hasSearch && !list.length && (
				<div className={styles.searchMan}>
					<img src='./none.jpg' alt='' />
				</div>
			)}
		</div>
	)
}

export const queryLabels = async () => {
	let {
		data: { data: res },
	} = await axios.get('/front/blog/articleLabels/recommend')

	return res
}

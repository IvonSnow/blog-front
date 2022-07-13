import { useRequest } from 'ahooks'
import axios from 'axios'
import React from 'react'
import { Tag, Row, Badge, Tooltip } from 'antd'
import { ReloadOutlined, TagsOutlined } from '@ant-design/icons'
import { isArray } from 'lodash'
import styles from './index.module.scss'
import '@/mock/blog/labels'
import { queryLabels } from '@/pages/blogSearch/index'

export default function LabelArea({ select }) {
	const { data: labels, error, loading } = useRequest(queryLabels)
	return (
		<div className={styles.labelWrap}>
			<Row className={styles.labelHead} align={'middle'} justify={'center'}>
				<TagsOutlined style={{ margin: '0 8px' }} />
				{'文章标签'}
				<Tooltip title={'重置标签'}>
					<ReloadOutlined className={styles.labelReset} onClick={() => select('')} />
				</Tooltip>
			</Row>
			<Row className={styles.labelBody}>
				{isArray(labels) &&
					labels.map((item, index) => (
						<Badge
							size='small'
							count={item.article_count}
							offset={[-10, 10]}
							color={'cyan'}
						>
							<Tag
								key={index}
								className={styles.labelTag}
								onClick={() => select(item.name)}
							>
								{item.cn_name || item.name}
							</Tag>
						</Badge>
					))}
			</Row>
		</div>
	)
}

import { useRequest } from 'ahooks'
import axios from 'axios'
import React from 'react'
import { Tag, Row } from 'antd'
import { TagsOutlined } from '@ant-design/icons'
import { isArray } from 'lodash'
import styles from './index.module.scss'
import '@/mock/blog/labels'

export default function LabelArea() {
	const { data: labels, error, loading } = useRequest(queryLabels)
	return (
		<div className={styles.labelWrap}>
			<Row className={styles.labelHead} align={'middle'} justify={'center'}>
				<TagsOutlined style={{ margin: '0 8px' }} />
				{'文章标签'}
			</Row>
			<Row className={styles.labelBody}>
				{isArray(labels) &&
					labels.map((item, index) => (
						<Tag
							key={index}
							className={styles.labelTag}
						>{`${item.label} (${item.count})`}</Tag>
					))}
			</Row>
		</div>
	)
}

const queryLabels = async () => {
	let {
		data: { data: res },
	} = await axios.get('/blog/api/labels')

	return res
}

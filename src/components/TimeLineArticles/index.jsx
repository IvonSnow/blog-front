import styles from './index.module.scss'
import React from 'react'
import { Timeline } from 'antd'
import moment from 'moment'
import { isArray } from 'lodash'
import { RiseOutlined } from '@ant-design/icons'

const TimeineItem = Timeline.Item

export default function TimeLineArticles({ data }) {
	return (
		<div className={styles.timeLineWrap}>
			{
				<Timeline mode={'left'}>
					<TimeineItem className={styles.lineSumaryContent} dot={<RiseOutlined />}>
						{`已经发布了${data ? data.length : 0}篇博客，继续保持 :)`}
					</TimeineItem>
					{isArray(data) &&
						data.map(item => {
							return (
								<TimeineItem
									className={styles.lineContent}
									color='gray'
									label={
										<span className={styles.lineTitle}>
											{moment(item.update_time).format('YYYY-MM-DD')}
										</span>
									}
								>
									<div className={styles.content}>{item.title}</div>
								</TimeineItem>
							)
						})}
				</Timeline>
			}
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'antd'
import { useMount } from 'ahooks'
import styles from './index.module.scss'
import { isArray } from 'lodash'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

export default function WaterFall({ data }) {
	const [col1, setCol1] = useState([])
	const [col2, setCol2] = useState([])
	const [col3, setCol3] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		let c1 = [],
			c2 = [],
			c3 = []
		let idx = 0
		data.forEach((item, index) => {
			switch (idx) {
				case 0:
					c1.push(item)
					idx += 1
					break
				case 1:
					c2.push(item)
					idx += 1
					break
				case 2:
					c3.push(item)
					idx = 0
					break
				default:
					break
			}
		})
		setCol1(c1)
		setCol2(c2)
		setCol3(c3)
	}, [data])

	const toDetail = id => {
		console.log('to')
		navigate(`/articles/${id}`)
	}

	// 获得每列的渲染内容
	const getColContent = data => {
		return isArray(data) ? (
			<>
				{data.map((item, index) => {
					return (
						<Card
							key={index}
							className={styles.itemCard}
							hoverable={true}
							cover={<img alt={item.title} src={item.cover_url} />}
							actions={[
								<LikeOutlined key='like' />,
								<MessageOutlined key='comment' />,
							]}
							onClick={() => toDetail(item.article_id)}
						>
							<Meta title={item.title} description={item.abstract} />
						</Card>
					)
				})}
			</>
		) : null
	}

	return (
		<>
			<Row className={styles.waterFallWrap} justify={'center'} gutter={[32, 24]}>
				<Col span={8}>{getColContent(col1)}</Col>
				<Col span={8}>{getColContent(col2)}</Col>
				<Col span={8}>{getColContent(col3)}</Col>
			</Row>
		</>
	)
}

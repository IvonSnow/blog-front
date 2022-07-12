import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Layout, Avatar, Space, Row, Col, BackTop, Image } from 'antd'
import {
	GithubOutlined,
	MailOutlined,
	ToTopOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	LoadingOutlined,
} from '@ant-design/icons'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import Menu from '@/components/Menu'
import { NavItems } from '@/router/router'
import { useRequest } from 'ahooks'
import axios from 'axios'

const { Content, Footer, Sider } = Layout

function BasicLayout({ children }) {
	// 侧边栏收起状态
	const [collapsed, setCollapsed] = useState(false)
	//
	const location = useLocation()
	// 当前目录
	const [currNav, setCurNav] = useState('')
	// 总文章数和标签数
	const { data: totalPosts } = useRequest(getTotalPosts)
	const { data: totalLabels } = useRequest(getTotalLabels)

	// 解析路径，设置当前目录
	useEffect(() => {
		setCurNav(location.pathname)
	}, [location])

	const handleTrigger = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout className={classnames(styles.BaseLayout)}>
			<Sider
				className={classnames(styles.LeftSider)}
				collapsible
				collapsed={collapsed}
				collapsedWidth={0}
				width={260}
				trigger={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
				onCollapse={handleTrigger}
			>
				<Space direction={'vertical'} style={{ width: '100%', height: '100%' }}>
					{/* 头像 */}
					<Row
						className={classnames(styles.AvatarWrap)}
						align={'middle'}
						justify={'center'}
					>
						<Avatar
							shape='square'
							size={72}
							style={{ borderRadius: 6 }}
							icon={<Image src='./avator.jpg' />}
						/>
					</Row>

					{/* 用户名 */}
					<Row
						className={classnames(styles.UserNameWrap)}
						align={'middle'}
						justify={'center'}
					>
						{'薛云峰'}
					</Row>

					{/* 描述 */}
					<Row
						className={classnames(styles.DescriptionWrap)}
						align={'middle'}
						justify={'center'}
					>
						{'个人网站-博客页面实现'}
					</Row>

					{/* 计数 */}
					<Row
						className={classnames(styles.CountWrap)}
						align={'middle'}
						justify={'center'}
					>
						<Col className={classnames(styles.LeftCol)}>
							<Row className={classnames(styles.CountArea)}>
								{totalPosts ? totalPosts : <LoadingOutlined />}
							</Row>
							<Row>{'posts'}</Row>
						</Col>
						<Col className={classnames(styles.RightCol)}>
							<Row className={classnames(styles.CountArea)}>
								{totalLabels ? totalLabels : <LoadingOutlined />}
							</Row>
							<Row>{'labels'}</Row>
						</Col>
					</Row>

					{/* 导航 */}
					<Row className={classnames(styles.NavWrap)} align={'middle'} justify={'center'}>
						<Menu selectedKey={currNav} items={NavItems}></Menu>
					</Row>
				</Space>
			</Sider>
			<Layout>
				<Content className={styles.MainContent}>{children}</Content>
				<Footer className={styles.footer}>
					{/* 声明和链接 */}
					<Row
						className={classnames(styles.LinkWrap)}
						align={'middle'}
						justify={'center'}
					>
						<Col>风云雪 ©2022 Created by xueyunfeng</Col>
						<Col>
							<a
								className={classnames(styles.LinkStyle)}
								href='https://github.com/IvonSnow'
								title={'Github to IvonSnow'}
								target={'_blank'}
								rel='noopener noreferrer'
							>
								<GithubOutlined className={classnames(styles.IconStyle)} />
								{'Github'}
							</a>
						</Col>

						<Col>
							<a
								className={classnames(styles.LinkStyle)}
								href='mailto:pinus0716@163.com'
								title={'EMail to pinus0716@163.com'}
								target={'_blank'}
								rel='noopener noreferrer'
							>
								<MailOutlined className={classnames(styles.IconStyle)} />
								{'E-Mail'}
							</a>
						</Col>
					</Row>
					{/* 备案 */}
					<Row align={'middle'} justify={'center'}>
						<a href='https://beian.miit.gov.cn' target={'_blank'} rel='noreferrer'>
							苏ICP备2022024806号-1
						</a>
					</Row>
				</Footer>
			</Layout>
			<BackTop className={classnames(styles.backToTop)}>
				<ToTopOutlined />
			</BackTop>
		</Layout>
	)
}

const getTotalLabels = async () => {
	let { data: res } = await axios.get('/front/blog/articleLabels/total')

	if (res.success) {
		return res.data
	}

	return 0
}

const getTotalPosts = async () => {
	let { data: res } = await axios.get('/front/blog/articles/total')

	if (res.success) {
		return res.data
	}

	return 0
}

export default BasicLayout

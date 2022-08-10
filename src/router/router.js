import { lazy } from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, InsertRowLeftOutlined, SearchOutlined } from '@ant-design/icons'

const Home = lazy(() => import('@/pages/home'))
const PostTimeline = lazy(() => import('@/pages/postTimeline'))
const BlogSearch = lazy(() => import('@/pages/blogSearch'))

export const NavItems = [
	{
		title: '主页',
		label: (
			<Link to={'home'} style={{ color: '#999' }}>
				<HomeOutlined />
			</Link>
		),
		key: '/home',
		component: <Home />,
	},
	// {
	// 	title: '目录',
	// 	label: (
	// 		<Link to={'categories'} style={{color: '#999'}}>
	// 			<UnorderedListOutlined />
	// 		</Link>
	// 	),
	// 	key: '/categories',
	// 	component: <Categories />,
	// },
	{
		title: '时间线',
		label: (
			<Link to={'timeline'} style={{ color: '#999' }}>
				<InsertRowLeftOutlined />
			</Link>
		),
		key: '/timeline',
		component: <PostTimeline />,
	},
	{
		title: '搜索',
		label: (
			<Link to={'search'} style={{ color: '#999' }}>
				<SearchOutlined />
			</Link>
		),
		key: '/search',
		component: <BlogSearch />,
	},
]

import { Link } from 'react-router-dom'
import {
	HomeOutlined,
	UnorderedListOutlined,
	InsertRowLeftOutlined,
	SearchOutlined,
} from '@ant-design/icons'

import Home from '@/pages/home/index.jsx'
import Categories from '@/pages/categories'
import PostTimeline from '@/pages/postTimeline'
import BlogSearch from '@/pages/blogSearch'

export const NavItems = [
	{
		title: '主页',
		label: (
			<Link to={'home'} style={{color: '#999'}}>
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
			<Link to={'timeline'} style={{color: '#999'}}>
				<InsertRowLeftOutlined />
			</Link>
		),
		key: '/timeline',
		component: <PostTimeline />,
	},
	{
		title: '搜索',
		label: (
			<Link to={'search'} style={{color: '#999'}}>
				<SearchOutlined />
			</Link>
		),
		key: '/search',
		component: <BlogSearch />,
	},
]

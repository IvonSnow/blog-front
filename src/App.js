import BasicLayout from './layouts/BasicLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NavItems } from './router/router'
import ArticleDetail from '@/pages/article'

function App() {
	return (
		<BasicLayout>
			<Routes>
				{/* 菜单栏 */}
				{NavItems.map((item, index) => {
					return <Route path={item.key} element={item.component} key={index}></Route>
				})}
				{/* 文章详情 */}
				<Route
					path={'/articles/:id'}
					element={<ArticleDetail />}
					key={'article-detail'}
				></Route>
				{/* 将'/'重定向 */}
				<Route path='/' element={<Navigate to='/home' />}></Route>
			</Routes>
		</BasicLayout>
	)
}

export default App

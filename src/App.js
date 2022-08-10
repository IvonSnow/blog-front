import { Suspense } from 'react'
import BasicLayout from './layouts/BasicLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NavItems } from './router/router'
import ArticleDetail from '@/pages/article'
import React, { useState } from 'react'

function App() {
	return (
		<BasicLayout>
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
		</BasicLayout>
	)
}

export default App

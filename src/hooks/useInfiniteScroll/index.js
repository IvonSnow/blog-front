import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { useGetState, useUpdateEffect } from 'ahooks'

// service的返回数据必须包含
// list: []
function useInfiniteScroll(service, options = {}) {
	// 解析选项
	const { pageSize = 10, deps = [] } = options

	const [data, setData, getData] = useGetState([])
	const [isNoMore, setIsNoMore] = useState(false)
	const latestNoMoreingRef = useRef(null)
	latestNoMoreingRef.current = isNoMore

	const [loading, setLoading] = useState(false)
	const latestLoadingRef = useRef(null)
	latestLoadingRef.current = loading

	const [currentPage, setCurrentPage] = useState(1)
	const latestPageRef = useRef(null)
	latestPageRef.current = currentPage

	// 请求新的数据并追加进入data
	const fetchAppendData = async function () {
		const res = await service({ pageSize, currentPage: latestPageRef.current })
		if (res.list.length < pageSize) {
			setIsNoMore(true) // 没有下一页了
		}
		if (latestPageRef.current === 1) {
			setData([...res.list])
		} else {
			setData([...getData(), ...res.list])
		}
	}

	// 再加载一页数据
	const loadMore = () => {
		setCurrentPage(currentPage => currentPage + 1)
	}

	// 重置数据加载
	const reLoad = () => {
		setIsNoMore(false)
		setCurrentPage(1)
		fetchAppendData()
	}

	useEffect(() => {
		setLoading(true)
		fetchAppendData()
		setLoading(false)
	}, [currentPage])

	// 每当deps中依赖项变化，重置数据
	useUpdateEffect(() => {
		reLoad()
	}, deps)

	// 滚动事件处理函数
	const scrollHandler = e => {
		let el = e.target.documentElement

		if (
			el &&
			Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 100 &&
			!latestLoadingRef.current
		) {
			if (latestNoMoreingRef.current) {
				console.log('没有更多了')
				return
			}
			loadMore()
		}

		if (latestLoadingRef.current) {
			console.log('加载中')
		}
	}

	// 绑定窗口滚动事件，检测是否活动到底部
	useEffect(() => {
		let handler = _.debounce(scrollHandler, 300)
		window.addEventListener('scroll', handler)

		return () => {
			window.removeEventListener('scroll', handler)
		}
	}, [])

	return {
		data,
		loading,
		isNoMore,
		loadMore,
		reLoad,
	}
}

export default useInfiniteScroll

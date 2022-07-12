import styles from './index.module.scss'
import { Tooltip } from 'antd'
import React from 'react'

function MenuItem({ label, title }) {
	return (
		<Tooltip title={title}>
			<div className={styles.menuItem}>{label}</div>
		</Tooltip>
	)
}

export default function Menu({ items, selectedKey }) {
	return (
		<div className={styles.menu}>
			{items.map(item => (
				<MenuItem label={item.label} title={item.title} />
			))}
		</div>
	)
}

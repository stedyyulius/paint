import { useDrag } from 'react-dnd'
import type { CSSProperties, FC } from 'react'
import { memo, useEffect } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Resizable } from 're-resizable'

export interface DragItem {
	id: string
	type: string
	left: number
	top: number
}

function getStyles(
	left: number,
	top: number,
	isDragging: boolean,
): CSSProperties {
	const transform = `translate3d(${left}px, ${top}px, 0)`
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		opacity: isDragging ? 0.5 : 1,
		height: isDragging ? 0.5 : '',
	}
}

const boxStyles: CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export interface BoxProps {
	title: string
	color?: string,
	type: string
}

export const Box: FC<BoxProps> = memo(function Box({ title, color, type }) {

	let boxStyles: CSSProperties = {
		border: '1px dashed gray',
		padding: '0.5rem 1rem',
		cursor: 'move',
	}

	if (type === 'rectangle') {

	}

	return (
		<Resizable
			style={{ ...boxStyles, backgroundColor: color || 'black' }}
		>
			{title}
		</Resizable>
	)
})

export interface DraggableBoxProps {
	id: string
	title: string
	left: number
	top: number,
	type: string
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
	props,
) {
	const { id, title, left, top, type } = props

	const [{ isDragging }, drag, preview] = useDrag(
		() => ({
			type: 'box',
			item: { id, left, top, title },
			collect: (monitor: DragSourceMonitor) => ({
				isDragging: monitor.isDragging(),
                opacity: monitor.isDragging() ? 0.5 : 1
			}),
		}),
		[id, left, top, title],
	)

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true })
	}, [preview])

	return (
		<div
			ref={drag}
			style={getStyles(left, top, isDragging)}
			role="DraggableBox"
		>
			<Box title={title} type={type} />
		</div>
	)
})
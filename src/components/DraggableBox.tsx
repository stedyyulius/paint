import { useDrag } from 'react-dnd'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { Resizable } from 're-resizable'

import { BoxMap } from './DragDropContainer'

import bucket from '../assets/fill-bucket.png';

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

export interface BoxProps {
	color?: string,
	type: string,
	selectedIcon: string
}

export const Box: FC<BoxProps> = memo(function Box({ color, type, selectedIcon }) {

	let boxStyles: CSSProperties = {};

	if (type === 'rectangle') {
		boxStyles = {
			border: '1px solid gray',
			padding: 40,
			backgroundColor: color
		}
	}

	if (type === 'circle') {
		boxStyles = {
		    width: 40,
			height: 40,
			borderRadius: '100%',
			backgroundColor: color,
			border: '1px solid gray',
			padding: 40,
		}
	}

	if (type === 'triangle') {
		boxStyles = {
		    width: 0,
			height: 0,
			borderLeft: '40px solid transparent',
			borderRight: '40px solid transparent',
			borderBottom: `65px solid ${color}`,
		}
	}

	return (
		<Resizable
			lockAspectRatio
			style={{ 
				...boxStyles, 
				cursor: selectedIcon === 'color' ? `url(${bucket}), auto` : 'move' 
			}}
		/>
	)
})

export interface DraggableBoxProps {
	id: string
	color: string
	left: number
	top: number,
	type: string,
	selectedBox: string,
	setBoxes: (box: BoxMap) => void,
	boxes: BoxMap,
	selectedIcon: string
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
	props,
) {
	const { id, color, left, top, type, selectedBox, boxes, setBoxes, selectedIcon } = props

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'box',
			item: { id, left, top, color },
			collect: (monitor: DragSourceMonitor) => ({
				isDragging: monitor.isDragging(),
                opacity: monitor.isDragging() ? 0.5 : 1
			}),
		}),
		[id, left, top, color],
	)

	const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.code === 'Backspace') {
			const newBox = boxes;
			delete newBox[id];
			setBoxes({ ...newBox })
		}
	}

	return (
		<div
			tabIndex={0}
			ref={drag}
			style={{...getStyles(left, top, isDragging), border: selectedBox === id ? '1px dashed blue' : '' }}
			onKeyDown={handleDelete}
		>
			<Box type={type} color={color} selectedIcon={selectedIcon} />
		</div>
	)
})
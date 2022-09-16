import { FC, CSSProperties } from 'react';
import update from 'immutability-helper';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { snapToGrid } from '../helpers/snapToGrid';

import { DraggableBox } from './DraggableBox';

interface BoxMap {
	[key: string]: { top: number; left: number; title: string; type: string }
}

interface ContainerProps {
	snap: boolean
    setBoxes: (box:BoxMap) => void
    boxes: BoxMap
}

interface DragItem {
	id: string
	type: string
	left: number
	top: number
}

const styles: CSSProperties = {
	width: '100%',
	height: 300,
	border: '1px solid black',
	position: 'relative',
}


export const DragDropContainer: FC<ContainerProps> = (props) => {

    const { snap, boxes, setBoxes } = props;

	const moveBox = useCallback(
		(id: string, left: number, top: number) => {
			setBoxes(
				update(boxes, {
					[id]: {
						$merge: { left, top },
					},
				}),
			)
	}, [props])

	const [, drop] = useDrop(
		() => ({
			accept: 'box',
			drop(item: DragItem, monitor) {
				const delta = monitor.getDifferenceFromInitialOffset() as {
					x: number
					y: number
				}

				let left = Math.round(item.left + delta.x)
				let top = Math.round(item.top + delta.y)
				if (snap) {
					;[left, top] = snapToGrid(left, top)
				}

				moveBox(item.id, left, top)
				return undefined
			},
	}),[moveBox])

	return (
		<div ref={drop} style={styles}>
			{Object.keys(boxes).map((key) => (
				<DraggableBox
					key={key}
					id={key}
					{...(boxes[key])}
				/>
			))}
		</div>
	)
}


import { FC, CSSProperties, useState } from 'react';
import update from 'immutability-helper';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { snapToGrid } from '../helpers/snapToGrid';

import { DraggableBox } from './DraggableBox';

export interface BoxMap {
	[key: string]: { top: number; left: number; color: string; type: string }
}

interface ContainerProps {
	snap: boolean
    setBoxes: (box:BoxMap) => void
    boxes: BoxMap,
	selectedColor: string,
	selectedIcon: string
}

interface DragItem {
	id: string
	type: string
	left: number
	top: number,
}

const styles: CSSProperties = {
	width: '99%',
	height: 300,
	position: 'absolute',
	zIndex: 2,
	backgroundColor: 'transparent'
}


export const DragDropContainer: FC<ContainerProps> = (props) => {
	const [selectedBox, setSelectedBox] = useState('');

    const { snap, boxes, setBoxes, selectedColor, selectedIcon } = props;

	const moveBox = useCallback(
		(id: string, left: number, top: number) => {
			setBoxes(
				update(boxes, {
					[id]: {
						$merge: { left, top },
					},
				}),
			)
	}, [boxes, setBoxes])

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

	const changeBoxColor = (id: string) => {
		const newBoxes = boxes;
		newBoxes[id].color = selectedColor;
		setBoxes({ ...newBoxes })
	}

	return (
		<div ref={drop} style={styles}>
			{Object.keys(boxes).map((key) => (
				<div 
				key={key}
				onClick={() => selectedIcon === 'color' ? changeBoxColor(key) : setSelectedBox(key)}>
					<DraggableBox
						id={key}
						selectedBox={selectedBox}
						selectedIcon={selectedIcon}
						setBoxes={setBoxes}
						boxes={boxes}
						{...(boxes[key])}
					/>
				</div>
			))}
		</div>
	)
}


import { useState } from 'react';
import styled from 'styled-components';

import pencil from '../assets/pencil.png';
import upload from '../assets/upload-image.png';

interface Props {
    onIconClick: (iconName: string) => void
}

interface IconProps {
    selected: boolean,
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export const PaintNavigator = (props: Props) => {

    const [selected, setSelected] = useState('');

    const handleClick = (iconName: string) => {
        setSelected(iconName);
        props.onIconClick(iconName);
    }

    const __renderRectangleIcon = () => {

        const iconName = 'rectangle';

        return (
            <IconContainer 
            selected={selected === iconName }
            onClick={() => handleClick(iconName)}
            title="Create Rectangle"
            >
                <RectangleIcon />
            </IconContainer>
        )
    }

    const __renderTriangleIcon = () => {
       
        const iconName = 'triangle';

        return (
            <IconContainer 
            selected={selected === iconName }
            onClick={() => handleClick(iconName)}
            title="Create Triangle"
            >
                <TriangleIcon />
            </IconContainer>
        )
    }

    const __renderCircleIcon = () => {
   
        const iconName = 'circle';

        return (
            <IconContainer 
            selected={selected === iconName }
            onClick={() => handleClick(iconName)}
            title="Create Circle" 
            >
                <CircleIcon  />
            </IconContainer>
        )
    }

    const __renderPencilIcon = () => {
 
        const iconName = 'pencil';

        return (
            <IconContainer 
            selected={selected === iconName }
            onClick={() => handleClick(iconName)}
            title="Draw"
            >
                <PencilIcon src={pencil} />
            </IconContainer>
        )
    }

    const __renderUploadImageIcon = () => {

        const iconName = 'upload';

        return (
            <IconContainer 
            selected={selected === iconName }
            onClick={() => handleClick(iconName)}
            title="Upload Image"
            >
                <UploadImageIcon src={upload} />
            </IconContainer>
        )
    }

    return (
        <NavigationContainer>
            { __renderRectangleIcon() }
            { __renderTriangleIcon() }
            { __renderCircleIcon() }
            { __renderPencilIcon() }
            { __renderUploadImageIcon() }
        </NavigationContainer>
    )
}

const NavigationContainer = styled.div`
    margin: 5% auto;
    border: 2px solid black;
    display: flex;
    flex-direction: row;
`

const IconContainer = styled.div((props: IconProps) => {
    return `
        width: 20%;
        height: 80px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        justify-content: center;
        align-items: center;
        display: flex;
        padding: 10px;
        background-color: ${(props.selected) ? '#edebe6' : '#none' };
    `;
});

const RectangleIcon = styled.div`
    border: 2px solid black;
    width: 40px;
    height: 40px;
    background-color: black;
`

const TriangleIcon = styled.div`
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 45px solid black;
`

const CircleIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: black;
`

const PencilIcon = styled.img`
    width: 50px;
    height: 50px;
`

const UploadImageIcon = styled.img`
    width: 50px;
    height: 50px;
`
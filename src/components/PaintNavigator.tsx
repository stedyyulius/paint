import styled from 'styled-components';

import pencil from '../assets/pencil.png';
import upload from '../assets/upload-image.png';
import color from '../assets/color.png';

interface Props {
    onIconClick: (iconName: string, event?: React.ChangeEvent<HTMLInputElement>) => void
    selectedColor: string,
    selectedIcon: string,
    setSelectedIcon: (iconName: string) => void
}

interface IconProps {
    selected: boolean,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    selectedColor?: string
}

export const PaintNavigator = (props: Props) => {

    const { onIconClick, selectedColor, setSelectedIcon, selectedIcon } = props;

    const handleClick = (iconName: string) => {
        setSelectedIcon(iconName);
        onIconClick(iconName);
    }

    const __renderRectangleIcon = () => {

        const iconName = 'rectangle';

        return (
            <IconContainer 
            selected={selectedIcon === iconName }
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
            selected={selectedIcon === iconName }
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
            selected={selectedIcon === iconName }
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
            selected={selectedIcon === iconName }
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
            selected={selectedIcon === iconName }
            onClick={() => setSelectedIcon(iconName)}
            title="Upload Image"
            >
                <UploadImageIcon src={upload} />
                <HiddenInputFile type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onIconClick('upload', e)} />
            </IconContainer>
        )
    }

    const __renderColorIcon = () => {

        const iconName = 'color';

        return (
            <IconContainer 
            selected={selectedIcon === iconName }
            onClick={() => setSelectedIcon(iconName)}
            title="Color Object"
            selectedColor={selectedColor}
            >
                <ColorIcon src={color} />
                <HiddenInputColor type="color" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onIconClick('color', e)} />
            </IconContainer>
        )
    }

    return (
        <NavigationContainer>
            { __renderRectangleIcon() }
            { __renderTriangleIcon() }
            { __renderCircleIcon() }
            { __renderPencilIcon() }
            { __renderColorIcon() }
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
        background-color: ${(props.selected) ? props.selectedColor ? props.selectedColor : '#edebe6'  : 'none' };
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

const ColorIcon = styled.img`
    width: 50px;
    height: 50px;
`

const HiddenInputColor = styled.input`
    opacity: 0;
    position: absolute;
    right: 20%;
    width: 20%;
    height: 80px;
`

const UploadImageIcon = styled.img`
    width: 50px;
    height: 50px;
`

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    right: 0;
    width: 20%;
    height: 80px;
`
import { useMemo } from 'react';
import styled from 'styled-components';

import pencil from '../assets/pencil.png';
import upload from '../assets/upload-image.png';

interface Props {
    onDrawClick: () => void
}

export const PaintNavigator = (props: Props) => {

    const __renderRectangleIcon = () => {
        return (
            <IconContainer>
                <RectangleIcon title="Create Rectangle" />
            </IconContainer>
        )
    }

    const __renderTriangleIcon = () => {
        return (
            <IconContainer>
                <TriangleIcon />
            </IconContainer>
        )
    }

    const __renderCircleIcon = () => {
        return (
            <IconContainer>
                <CircleIcon title="Create Circle"  />
            </IconContainer>
        )
    }

    const __renderPencilIcon = () => {
        return (
            <IconContainer>
                <PencilIcon src={pencil} title="Draw" onClick={() => props.onDrawClick()} />
            </IconContainer>
        )
    }

    const __renderUploadImageIcon = () => {
        return (
            <IconContainer>
                <UploadImageIcon src={upload} title="Upload Image"  />
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
    width: 30vw;
    margin: 5% auto;
    border: 2px solid black;
    display: flex;
    flex-direction: row;
`

const IconContainer = styled.div`
    width: 20%;
    height: 80px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px;
`

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
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { Item } from '../../../schemas/Item';



interface Item {
    id: number;
    text: string;
}

const ItemTypes = {
    CARD: 'card',
};

interface CardProps {
    item: Item;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    isDragging: (isDragging: boolean) => void;
    setDraggableElement: (draggableElement: string) => void;
}

interface DropZoneProps {
    item: Item;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card: React.FC<CardProps> = ({ item, index, moveCard, isDragging, setDraggableElement }) => {


    const [collected, drag, dragPreview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { id: item.id, index },
        collect: (monitor) => {

            return {

                isDragging: monitor.isDragging(),
                myitem: monitor.getItem,
            }
        },
        end(draggedItem, monitor) {
            // console.log(monitor.)
            const { id: droppedId, index: droppedIndex } = draggedItem
            const didDrop = monitor.didDrop();

            if (!didDrop) {
                moveCard(droppedIndex, index)
            }
        },
        canDrag: () => true,

    }))

    React.useEffect(() => {
        if (collected.isDragging) {
            isDragging(true)
            setDraggableElement(String(item.id))
        } else {
            isDragging(false)
            setDraggableElement("")
        }
    }, [collected.isDragging])

    return (
        <div
            ref={drag}
            style={{
                padding: '0.5rem',
                backgroundColor: collected.isDragging ? 'lightgreen' : 'white',
                border: '1px solid gray',
                cursor: 'move',
            }}
        >
            {item.text}
        </div>
    );
};

const DropZone: React.FC<DropZoneProps> = (props) => {

    const [collectedProps, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                Item: monitor.getItem(),
                isFinished: monitor.didDrop(),
            };
        },
        drop(item, monitor) {
            console.log(" from drop : item, monitor")
            console.log(item, monitor)
        },
    }));

    return (
        <div
            ref={drop}
            style={{
                padding: '0.5rem',
                backgroundColor: collectedProps.isOver ? 'lightgreen' : 'lightgrey',
                border: '1px solid gray',
                cursor: 'move',
            }}
        >
            Drop here
        </div>
    )
}

interface ContainerProps {
    items: Item[];
}

const Container: React.FC<ContainerProps> = ({ items }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggableElement, setDraggableElement] = useState('');
    const [cards, setCards] = useState(items);

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const draggedCard = cards[dragIndex];
        const newCards = [...cards];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, draggedCard);
        setCards(newCards);
    };

    return (
        <div>
            {cards.map((item, index) => {

                return isDragging && String(item.id) !== draggableElement ? <DropZone key={item.id} item={item} index={index} moveCard={moveCard} /> : <Card
                    key={item.id}
                    item={item}
                    index={index}
                    moveCard={moveCard}
                    isDragging={setIsDragging}
                    setDraggableElement={setDraggableElement}
                />
            })}
            {isDragging ? "Dragging " + draggableElement : "not dragging"}


        </div>
    );
};

const App: React.FC = () => {
    const items: Item[] = [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <Container items={items} />
        </DndProvider>
    );
};

export default App;
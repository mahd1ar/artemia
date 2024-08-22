import React, { useState, useEffect } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

type GeneralTreeItem = {
    key: string,
    children?: GeneralTreeItem[],
    value: { code: string, title: string }

}
const RecursiveTreeItem: React.FC<{ item: GeneralTreeItem, onSelect: (currentItem: { id: string, code: string, title: string }) => void }> = (props) => {
    return (
        <TreeItem itemId={props.item.key} label={props.item.value.title + ' - ' + props.item.value.code}
            onDoubleClickCapture={() => props.onSelect({ code: props.item.value.code, title: props.item.value.title, id: props.item.key })}
        >
            {props.item.children?.map((node) => (
                <RecursiveTreeItem onSelect={props.onSelect} key={node.key} item={node} />
            ))}
        </TreeItem>
    );
}

const TreeCategories: React.FC<{ rootCode: string, onSelect: (currentItem: { id: string, code: string, title: string }) => void }> = (props) => {


    const [treeData, setTreeData] = useState<GeneralTreeItem>({
        key: 'root',
        value: { code: 'root', title: 'root' },
        children: [],
    });

    useEffect(() => {
        fetch("/api/v1/category-by-root/78").then((res) => res.json()).then((res) => {

            setTreeData(res);
        })
    }, [props.rootCode]);



    return (

        <SimpleTreeView>
            <RecursiveTreeItem item={treeData} onSelect={props.onSelect} />
        </SimpleTreeView>


    );
}


export default TreeCategories
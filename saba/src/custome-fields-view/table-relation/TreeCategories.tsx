import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import React, { useEffect, useState } from 'react'

interface GeneralTreeItem {
  key: string
  children?: GeneralTreeItem[]
  value: { code: string, title: string }

}
const RecursiveTreeItem: React.FC<{
  item: GeneralTreeItem
  onSelect: (currentItem: { id: string, code: string, title: string }) => void
  onClicked: (currentItem: { id: string, code: string, title: string }) => void
}> = (props) => {
  return (
    <TreeItem
      itemId={props.item.key}
      label={`${props.item.value.title} - ${props.item.value.code}`}
      onDoubleClickCapture={() => props.onSelect({ code: props.item.value.code, title: props.item.value.title, id: props.item.key })}
      onClick={() => props.onClicked({ code: props.item.value.code, title: props.item.value.title, id: props.item.key })}
    >
      {props.item.children?.map(node => (
        <RecursiveTreeItem onSelect={props.onSelect} onClicked={props.onClicked} key={node.key} item={node} />
      ))}
    </TreeItem>
  )
}

const TreeCategories: React.FC<{
  rootCode: string
  onSelect: (currentItem: { id: string, code: string, title: string }) => void
  onClicked: (currentItem: { id: string, code: string, title: string }) => void
}> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [treeData, setTreeData] = useState<GeneralTreeItem>({
    key: 'root',
    value: { code: 'root', title: 'root' },
    children: [],
  })

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/v1/category-by-root/${props.rootCode}`).then(res => res.json()).then((res) => {
      setTreeData(res)
      setIsLoading(false)
    })
  }, [props.rootCode])

  if (isLoading)
    return <div>Loading...</div>

  return (

    <SimpleTreeView defaultExpandedItems={[treeData.key]}>
      <RecursiveTreeItem item={treeData} onSelect={props.onSelect} onClicked={props.onClicked} />
    </SimpleTreeView>

  )
}

export default TreeCategories

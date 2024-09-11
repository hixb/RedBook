import React from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import { View } from 'react-native'

interface RowItem {
  rowData: ItemData[]
  rowOffsetTop: number
  height: number
}

interface ItemData {
  item: any
  index: number
  columnIndex: number
  offsetTop: number
  height?: number
}

interface RenderItemInfo {
  item: any
  index: number
  columnIndex: number
}

interface FlowListItemProps {
  rowIndex: number
  rowItem: RowItem
  renderItem: (info: RenderItemInfo) => React.ReactNode
  columnWidth: number
  onItemHeightChange: (height: number, index: number) => void
  onItemDidUpdate: (value: number) => void
}

interface FlowListItemState {
  opacity: number
}

export default class FlowListItem extends React.Component<FlowListItemProps, FlowListItemState> {
  constructor(props: FlowListItemProps) {
    super(props)

    this.state = {
      opacity: 0,
    }
  }

  shouldComponentUpdate(nextProps: FlowListItemProps): boolean {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps))
      return true

    const { onItemDidUpdate } = this.props
    onItemDidUpdate(0)
    return false
  }

  componentDidUpdate(): void {
    const { onItemDidUpdate } = this.props
    onItemDidUpdate(1)
  }

  render(): React.ReactNode {
    const {
      rowIndex,
      rowItem,
      renderItem,
      columnWidth,
      onItemHeightChange,
    } = this.props

    const { rowData, rowOffsetTop, height } = rowItem

    const extraStyle: ViewStyle = {}
    if (height > 0)
      extraStyle.height = height

    if (!rowData.some(item => item.height === void 0)) {
      extraStyle.opacity = 1
      this.setState({ opacity: 1 })
    }

    return (
      <View style={{ flexDirection: 'row', opacity: this.state.opacity, ...extraStyle }} key={`row_${rowIndex}`}>
        {
          rowData.map((data, dataIndex) => {
            const { item, index, columnIndex, offsetTop } = data
            return (
              <View
                key={`row_${rowIndex}_item_${dataIndex}`}
                style={{
                  position: 'absolute',
                  top: offsetTop - rowOffsetTop,
                  left: columnIndex * columnWidth,
                  width: columnWidth,
                }}
                onLayout={(e: LayoutChangeEvent) => {
                  onItemHeightChange(e.nativeEvent.layout.height, index)
                }}
              >
                {renderItem ? renderItem({ item, index, columnIndex }) : null}
              </View>
            )
          })
        }
      </View>
    )
  }
}

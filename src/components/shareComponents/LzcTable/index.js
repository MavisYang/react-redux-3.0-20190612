// 表格
import React from 'react'
import Table from 'antd/lib/table'
import './index.scss'
export default function LzcTable(props) {
    const {tableClass,rowSelection,columns,dataSource,loading,onMouseDownHandle,emptyTxt,scroll,scrollHandle,rowClassName} = props
    return (
        <div className={`lzc-table ${tableClass}`} onScrollCapture={scrollHandle}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.id}
                locale={{
                    emptyText: emptyTxt
                }}
                pagination={false}
                loading={{
                    tip:"数据加载中...",
                    indicator:<div>loading...</div>,
                    spinning:loading,
                    wrapperClassName:'tableLoading'
                }}
                onRow={(record)=>{
                    return {
                        onMouseDown: (e)=>{onMouseDownHandle&&onMouseDownHandle(e,record)}
                    }
                }}
                scroll={scroll}
                rowClassName={rowClassName}
            />
        </div>

    )

}

// export default class LzcTable extends Component {
//     render(){
//         const {tableClass,rowSelection,columns,dataSource,loading,onMouseDownHandle,emptyTxt,scroll,scrollHandle,rowClassName} = this.props
//         return (
//             <div className={`lzc-table ${tableClass}`} onScrollCapture={scrollHandle}>
//                 <TableDemo
//                     rowSelection={rowSelection}
//                     columns={columns}
//                     dataSource={dataSource}
//                     rowKey={record => record.id}
//                     locale={{
//                         emptyText: emptyTxt
//                     }}
//                     pagination={false}
//                     loading={{
//                         tip:"数据加载中...",
//                         indicator:<div>loading...</div>,
//                         spinning:loading,
//                         wrapperClassName:'tableLoading'
//                     }}
//                     onRow={(record)=>{
//                         return {
//                             onMouseDown: (e)=>{onMouseDownHandle&&onMouseDownHandle(e,record)}
//                         }
//                     }}
//                     scroll={scroll}
//                     rowClassName={rowClassName}
//                 />
//             </div>
//
//         )
//     }
// }

LzcTable.defaultProps={
    emptyTxt:'没有搜索到结果！',
    tableClass: ''
}

// rowSelection 是否可以选择行
// columns 行数据
// dataSource 元数据
// loading 加载状态
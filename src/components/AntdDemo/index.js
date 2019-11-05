import React, {Fragment, useEffect, useState} from "react";
import SkeletonCom from "../shareComponents/Skeleton";
import ChildCom from './ChildCom'
import TableDemo from "./TableDemo";
import './index.scss'
import {Datas} from "./datas";

export default function AntdDemo(props) {
    const [loading, setLoading] = useState(true)
    const [dataSource,setDataSource] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        setDataSource(Datas.resultContent)
    }, [])

    return (
        <div className='intro container'>
            <ChildCom/>
            <SkeletonCom
                loading={loading}
                active={true}
                paragraph={{row: 4, width: 500}}
                title={{width: 200}}
            >
                <Fragment>
                    <h3>这是Skeleton的demo</h3>
                    <div>这是Skeleton的内容</div>
                    <TableDemo
                        dataSource={dataSource}
                        loading={loading}
                    />
                </Fragment>

            </SkeletonCom>
        </div>
    )
}


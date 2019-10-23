import React, {Fragment, useEffect, useState} from "react";
import SkeletonCom from "../shareComponents/Skeleton";
import ChildCom from './ChildCom'
import './index.scss'

export default function AntdDemo(props) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <div className='intro'>
            <ChildCom/>
            <SkeletonCom
                loading={loading}
                active={true}
                paragraph={{row: 4, width: 500}}
                title={{width: 200}}
            >
                <Fragment>
                    <h3>这是Skeleton的demo</h3>
                    <div>
                        这是Skeleton的内容
                    </div>
                </Fragment>

            </SkeletonCom>
        </div>
    )
}


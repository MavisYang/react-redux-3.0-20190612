import React, {useState, useEffect, useRef} from 'react';
import {List,AutoSizer,InfiniteLoader} from "react-virtualized"
import './index.scss'


export default function React_1120() {
    return (<PreviewGallery
        title={'栗子云品牌图库'}
        galleryImgs={[
            {url: 'http://test.gemii.cc:58080/lizcloud/fs/noauth/media/5dc538603459bb274ff5dcfc'},
            {url: 'http://test.gemii.cc:58080/lizcloud/fs/noauth/media/5dc51bc23459bb274ff5dcfa'},
            {url: 'http://test.gemii.cc:58080/lizcloud/fs/noauth/media/5da3e3abd14c034313cfe53a'},
            {url: 'https://gbotdev.gemii.cc/walle/static/image/0fe732e25c46c50bed45c58e263fdb5a.jpg'},
            {url: 'http://test.gemii.cc:58080/lizcloud/fs/noauth/media/5da3e3abd14c034313cfe53a'},
        ]}
        style={{left: 0, top: 16}}
    />)
}

function PreviewGallery(props) {
    const {title, style, closeModal, modalStatus} = props
    const [list] = useState(props.galleryImgs)
    const [listHeight, setListHeight] = useState(0)
    const [useDynamicRowHeight] = useState(false)//是否使用动态的高度
    const divRef = useRef(null)
    useEffect(() => {
        // console.log(divRef, 'divRef');
        setListHeight(divRef.current.offsetHeight - 50)

        return () => {
        }
    }, [])
    const renderRow = ({index, key, style}) => {
        const row = list[index]
        return (
            <div className='pd_imgBox' key={key} style={style}>
                <img src={row.url} className='pd_img'/>
            </div>
        )
    }

    function _noRowsRenderer() {
        return <div className=''>No rows</div>;
    }

    return (<div className='mm_previewGallery' style={style} onClick={e => e.nativeEvent.stopImmediatePropagation()}>
            <div className="pg_title">{title}</div>
            <div className="pd_content" ref={divRef}>
                {/*<AutoSizer disableHeight>*/}
                {/*    {*/}
                {/*        ({width,height})=>{*/}
                {/*            return (*/}
                {/*                <List*/}
                {/*                    width={width} //592*/}
                {/*                    height={listHeight}*/}
                {/*                    rowHeight={230}*/}
                {/*                    rowRenderer={renderRow}*/}
                {/*                    rowCount={list.length}*/}
                {/*                    noRowsRenderer={_noRowsRenderer}*/}
                {/*                />*/}
                {/*            )*/}
                {/*        }*/}
                {/*    }*/}
                {/*</AutoSizer>*/}

                {
                    list.map((v, i) => {
                     return <div className='pd_imgBox' key={i}>
                       <img src={v.url} className='pd_img'/>
                     </div>
                   })
                 }
            </div>
        </div>
    )

}

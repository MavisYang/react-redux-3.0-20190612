import React from "react";


export default function HooksNew() {
    return(
        <div>HooksNew</div>
    )
}


// export default function FilterArray(props) {
//     // console.log(props,'props==')
//     const filterItems = props.filterData
//     // console.log(props.filterData,filterItems,'props==filterItems')
//     const [filterArray, setFilterArray] = useState(filterItems)
//     const [searchValue, setSearchValue] = useState('')
//     const [searchFlag, setSearchFlag] = useState(false)
//
//     useEffect(() => {
//         document.addEventListener('click', props.hideFilter)
//         return () => {
//             document.removeEventListener('click', props.hideFilter)
//         }
//     }, [])
//
//
//     const filterSearch = (e) => {
//         const value = e.target.value;
//         if (value == '') {
//             setSearchValue(value)
//             setFilterArray(filterItems)
//             return
//         }
//
//         let newFilter = []
//         filterItems.map(item => {
//             if (item.filter_name.match(value) != null) {
//                 newFilter.push(item)
//             }
//         }).filter((item, i, self) => item && self.indexOf(item) === i)
//
//         setFilterArray(newFilter)
//         setSearchValue(value)
//     }
//
//     const focusHandle = () => {
//         setSearchFlag(true)
//     }
//
//     const deleteFilterMember = (id , i) => {
//         filterArray.splice(parseInt(i), 1)
//         setFilterArray(filterArray)
//         setSearchFlag(searchValue != '' ? true : false)
//         props.deleteParam(id, props.type, i)
//     }
//
//     const clearSearch = () => {
//         setFilterArray(filterItems)
//         setSearchValue('')
//         setSearchFlag(false)
//     }
//
//
//     return (
//         <div className='memberTree filterArray_view' onClick={(e) => {
//             e.stopPropagation();
//             e.nativeEvent.stopImmediatePropagation()
//         }}>
//             <div className={`searchBox ${searchFlag ? 'focusSelect' : ''}`}>
//                 <input className='searchInput' type="text"
//                        placeholder={props.placeholder}
//                        autoComplete="off"
//                        style={{textIndent: searchFlag ? '0' : '21px'}}
//                        value={searchValue}
//                        onChange={filterSearch}
//                        onFocus={focusHandle}
//                 />
//                 {
//                     !searchFlag && <div className="filter-searchIcon"/>
//                 }
//                 {
//                     searchValue != '' && <div className="closeIcon" onClick={clearSearch}/>
//                 }
//
//             </div>
//             {
//                 Array.isArray(filterArray)&&filterArray.length>0?
//                     <ul className='member-list'>
//                         {
//                             props.type == 2 ?
//                                 <Members
//                                     type={props.type}
//                                     filterArray={filterArray}
//                                     deleteFilterMember={deleteFilterMember}
//                                 /> :
//                                 props.type == 4 ?
//                                     <XApplets
//                                         type={props.type}
//                                         filterArray={filterArray}
//                                         deleteFilterMember={deleteFilterMember}
//                                     /> :
//                                     props.type == 3 ?
//                                         <Links
//                                             type={props.type}
//                                             filterArray={filterArray}
//                                             deleteFilterMember={deleteFilterMember}
//                                         />
//                                         : null
//                         }
//
//
//                     </ul>:
//                     <NoSearchData/>
//             }
//
//         </div>
//     )
//
// }
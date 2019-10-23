import React, { useState, useEffect} from 'react';
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];


function FriendStatus(id) {
  const [isOnline, setIsOnline] = useState(null);
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    handleStatusChange({ isOnline: id !== undefined ? true : false })
    return () => {//清除
      handleStatusChange({ isOnline: false })
    };
  }, [id]);//仅在 props.friend.id 发生变化时，重新订阅

  return isOnline
}


function FriendListItem(props) {
  const isOnline = FriendStatus(props.friend.id);

  return (
    <div style={{ color: isOnline ? 'yellow' : 'red' }}>
      {props.friend.name}
    </div>
  );
}

function SelectFriend(prop) {
  const [recipientID, setRecipientID] = useState(1)
  const isRecipientOnline = FriendStatus(recipientID)
  return (
    <div className='friendWraper'>
      <FriendListItem friend={{ id: 1, name: 'mavis' }} />

      <span className='loginStatus' style={{ background: isRecipientOnline?'#5bc9a4':'red'}}></span>
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {
          friendList.map(v=>( <option key={v.id} value={v.id} >{v.name}</option> ))
        }
      </select>
    </div>
  )
}
export default SelectFriend;

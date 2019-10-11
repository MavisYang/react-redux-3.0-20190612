// import React, { useState, useEffect} from 'react'

// function Notification(props) {
//   var timer = null;
//   const [visible, setVisible] = useState(false);
//   let { title, description, duration, theme, onClose, } = props;
//   const intervalRef = useRef(null);
//   let leave = (source = '') => {
//     clearTimeout(intervalRef.current);
//     setVisible(false);
//     console.log("leave result:", source, intervalRef);
//     onClose && onClose();
//   }

//   let enter = () => {
//     setVisible(true);
//     if (duration > 0) {
//       let id = setTimeout(() => {
//         console.log(`auto carried out`, intervalRef) //timer Number Id 
//         leave(`Time to`);
//       }, duration * 1000);
//       intervalRef.current = id;
//     }
//   }

//   useEffect(() => {
//     enter();
//     return () => clearTimeout(intervalRef.current);
//   })

//   return (
//     <div className={`${prefixCls}-notice`} style={{ display: `${visible ? '' : 'none'}` }}>
//       {!!theme && <p className={`${prefixCls}-notice-icon`}><Svg iconId={`svg-${theme}`} /></p>}
//       <div className={`${prefixCls}-notice-content`}>
//         ……
//       </div>
//       <p className={`${prefixCls}-notice-colse`} title="关闭" onClick={() => leave("手动点击的关闭")}><Svg /></p>
//     </div>
//   );
// };

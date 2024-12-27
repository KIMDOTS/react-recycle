import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [data, setDate] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((res) => setDate(res));
  }, [])

  return (
    <>
      <div>데이터 목록</div>
      {data.map((el) => (
        <div key={el.id}>{el.content}</div>
      ))}
      <MouseFollower />
      <ScrollIndicator />
      <AlertTimer />
      <div style={{ height: "300vh" }}></div>
    </>
  )
}

const MouseFollower = () => {
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handelMouseMove = (event) => {
      setPosition({x: event.clientX, y: event.clientY})
      console.log("mouseMoved!");
    }
    window.addEventListener("mousemove", handelMouseMove);
    return () => {
      window.removeEventListener("mousemove", handelMouseMove); // 이벤트리스너를 지우고 나오는 함수
    };
  });

  return(
    <div 
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "salmon",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }}
    ></div>
  )
};

const ScrollIndicator = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / windowHeight) * 100;
      setScrollWidth(scrollPercentage);
    }
    window.addEventListener("scroll", handleScroll);
    return() => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  return (
    <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width:`${scrollWidth}%`,
      height: "10px",
      background: "salmon"
    }} 
    ></div>
  )
}

const AlertTimer = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      showAlert === true ? alert('시간 초과') : null
    }, 3000);
    return () => {
      clearTimeout(setTimeoutId);
    }
  });

  return <button onClick={() => setShowAlert(false)}>빨리 클릭!</button>
}
export default App

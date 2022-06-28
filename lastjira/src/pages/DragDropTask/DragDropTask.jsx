import React, { useRef, useState } from "react";
import "./DragTag.css";
const defaultValue = [
  { id: 0, taskName: "Task 1" },
  { id: 1, taskName: "Task 2" },
  { id: 2, taskName: "Task 3" },
  { id: 3, taskName: "Task 4" },
  { id: 4, taskName: "Task 5" },
];

export default function DemoDrapDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const start = useRef({});
  const handleDragStart = (e, task, index) => {
    console.log("indexStart", task);
    start.current = task;
  };
  // const handleDragOver = (e) =>{
  //     // console.log('target', e.target)
  // }
  // const handleDragEnd = (e) =>{
  //     e.stopPropagation();
  //     e.preventDefault();
  //     console.log("dragend", e.target)
  // }
  // const hangdleDrop =(e)=>{
  //     console.log("drop" , e.target)
  // }
  const hangdDragEnter = (e, task, index) => {
    console.log("indexEnd", task);
    const taskListUpDate = [...taskList];
    let indexStart = taskListUpDate.findIndex(
      (item) => item.id === start.current.id
    );
    let indexEnd = taskListUpDate.findIndex((item) => item.id === task.id);
    let tem = taskListUpDate[indexStart];
    console.log("tem", tem);
    taskListUpDate[indexStart] = taskListUpDate[indexEnd];
    console.log("Start -> end", taskListUpDate[indexStart]);
    taskListUpDate[indexEnd] = tem;
    console.log("end -> start", taskListUpDate[indexStart]);
    setTaskList(taskListUpDate);
  };

  const hangdleDragEnd = (e) => {
    start.current = "";
    setTaskList([...taskList]);
  };

  return (
    <div className="container">
      <div className="text-center display-4">Task list</div>
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-4">
          {taskList.map((item, index) => {
            let cssDragTag = item.id === start.current.id ? "dragTag" : "";
            return (
              <div
                draggable="true"
                onDragStart={(e) => {
                  handleDragStart(e, item, index);
                }}
                onDragEnter={(e) => {
                  hangdDragEnter(e, item, index);
                }}
                onDragEnd={(e) => {
                  hangdleDragEnd(e);
                }}
                key={index}
                className={`bg-success text-white m-3 p-3 ${cssDragTag}`}
              >
                {item.taskName}
              </div>
            );
          })}
        </div>
        <div className="col-2">
          <div className="bg-dark p-5 text-white">Anh Tien</div>
        </div>
      </div>
    </div>
  );
}

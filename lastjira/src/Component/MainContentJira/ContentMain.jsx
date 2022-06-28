import { Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAL_SAGA } from "../../redux/contants/TaskTypeConstant";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div
          key={index}
          className="card pb-2"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{taskListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({
                      type: GET_TASK_DETAL_SAGA,
                      idTask: task.taskId,
                    });
                  }}
                >
                  <p className="font-weight-bold">{task.taskName}</p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      {task.priorityTask.priority === "High" ? (
                        <Tag color="red">{task.priorityTask.priority}</Tag>
                      ) : (
                          <Tag color="cyan">{task.priorityTask.priority}</Tag>
                        ) && task.priorityTask.priority === "Medium" ? (
                        <Tag color="blue">{task.priorityTask.priority}</Tag>
                      ) : (
                        <Tag color="green">{task.priorityTask.priority}</Tag>
                      )}
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness.map((member, index) => {
                          return (
                            <div className="avatar" key={index}>
                              <img src={member.avatar} alt={member.avatar} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

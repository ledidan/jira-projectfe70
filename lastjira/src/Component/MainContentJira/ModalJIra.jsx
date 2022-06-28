import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_STATUS_SAGA } from "../../redux/contants/StatusConstants";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_TASK_TYPE_SAGA,
  HANDLE_CHANGE_TASK_POST_API_SAGA,
  REMOVE_USER_TASK,
  UPDATE_TASK_STATUS_SAGA,
} from "../../redux/contants/TaskTypeConstant";
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/contants/PriorityConstants";
import { Button, Select } from "antd";
import { Notification } from "../../util/Notification/notification";

const { Option } = Select;

export default function ModalJIra() {
  const dispatch = useDispatch();

  const { taskDetailModal } = useSelector((state) => state.TaskModalReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const [contentDescription, setContentDescription] = useState(
    taskDetailModal.description
  );
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  useEffect(() => {
    dispatch({ type: GET_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_TASK_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name: name,
      value: value,
    });
  };

  const dataUserTask = projectDetail.members?.filter((item) => {
    let index = taskDetailModal.assigness?.findIndex(
      (item1) => item1.id === item.userId
    );
    if (index !== -1) {
      return false;
    }
    return true;
  });

  const dataUserSelect = dataUserTask?.map((item, index) => {
    return (
      <Option key={index} value={item.userId}>
        {item.name}
      </Option>
    );
  });

  const handleChangeSelect = (value) => {
    let userSelect = projectDetail.members?.find((mem) => mem.userId == value);
    let userSelectUpdate = { ...userSelect, id: userSelect.userId };
    dispatch({
      type: HANDLE_CHANGE_TASK_POST_API_SAGA,
      actionType: CHANGE_ASSIGNESS,
      assignessUpdate: userSelectUpdate,
    });
  };

  const [visibleEditor, setVisibleEditor] = useState(false);
  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            {" "}
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              apiKey="nrpi36979r4qkvdj6xscissomderf9ezwj3nv36mc16v0mit"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContentDescription(content);
              }}
            />
            {/* <Button
              className="btn btn-success mr-2 mt-2"
              type="primary"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_TASK_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: contentDescription,
                });
                setVisibleEditor(!visibleEditor);
              }}
            >
              SAVE
            </Button>
            <Button
              className="btn btn-danger mt-2"
              onClick={() => setVisibleEditor(!visibleEditor)}
            >
              CANCEL
            </Button> */}
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setVisibleEditor(!visibleEditor)}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percentWidth = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div style={{ display: "flex" }} key="1">
        <i className="fa fa-clock" />
        <div style={{ width: "100%" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percentWidth}%` }}
              aria-valuenow={Number(timeTrackingSpent)}
              aria-valuemin={Number(timeTrackingRemaining)}
              aria-valuemax={max}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p className="logged font-weight-bold mt-1 ">
              {Number(timeTrackingRemaining) + "h"} logged
            </p>
            <p className="estimate-time font-weight-bold mt-1">
              {Number(timeTrackingRemaining) + "h"} remaining
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              min="0"
              type="number"
              className="from-control"
              style={{ width: "30%" }}
              name="timeTrackingRemaining"
              onChange={(e) => {
                handleChange(e);
              }}
              defaultValue={timeTrackingRemaining}
            ></input>
            <input
              min="0"
              type="number"
              className="from-control"
              style={{ width: "30%" }}
              name="timeTrackingSpent"
              onChange={(e) => {
                handleChange(e);
              }}
              defaultValue={timeTrackingSpent}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title d-flex align-items-center w-40">
              <i className="fa fa-bookmark" />
              <select
                className="form-control m-2 w-auto "
                defaultValue={taskDetailModal.typeId}
                name="typeId"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {arrTaskType?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.taskType}
                    </option>
                  );
                })}
              </select>

              <span>{taskDetailModal.taskName}</span>
            </div>

            <div style={{ display: "flex" }} className="task-click ">
              <div>
                <i className="fab fa-telegram-plane text-lg mr-1" />
                <span
                  className="font-weight-normal"
                  style={{ paddingRight: 20 }}
                >
                  Give feedback
                </span>
              </div>
              <div>
                <i className="fa fa-link text-lg ml-2 mr-1" />
                <span
                  className="font-weight-normal"
                  style={{ paddingRight: 20 }}
                >
                  Copy link
                </span>
              </div>
              <i
                className="fa fa-trash-alt text-lg ml-2 "
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <h5 className="uppercase font-bold ">DESCRIPTION</h5>
                    {renderDescription()}
                  </div>
                  <div className="comment mt-4">
                    <h5 className="text-lg">Comment</h5>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../assets/img/download1.jfif")}
                          alt="..."
                        />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p className="text-sm mt-2">
                          <span
                            style={{
                              fontWeight: 500,
                              color: "gray",
                              paddingRight: "5px",
                            }}
                          >
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                                fontSize: "16px",
                                paddingRight: "5px",
                                paddingLeft: "5px",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src={require("../../assets/img/download2.jfif")}
                              alt="..."
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      className="custom-select"
                      name="statusId"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);
                        const action = {
                          type: UPDATE_TASK_STATUS_SAGA,
                          taskStatusUpdate: {
                            taskId: taskDetailModal.taskId,
                            statusId: e.target.value,
                            projectId: taskDetailModal.projectId,
                          },
                        };
                        dispatch(action);
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div style={{ display: "flex" }}>
                      {taskDetailModal.assigness?.map((user, index) => {
                        return (
                          <div
                            key={index}
                            style={{ display: "flex" }}
                            className="item"
                          >
                            <div className="avatar">
                              <img src={user.avatar} alt={user.avatar} />
                            </div>
                            <i
                              className="fa fa-times mt-2 ml-2"
                              onClick={() => {
                                dispatch({
                                  type: HANDLE_CHANGE_TASK_POST_API_SAGA,
                                  actionType: REMOVE_USER_TASK,
                                  idUser: user.id,
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                      <Select
                        className="my-2 ml-3"
                        optionFilterProp="label"
                        value="Add user"
                        placeholder="Add user"
                        onChange={handleChangeSelect}
                        style={{ width: "35%" }}
                      >
                        {dataUserSelect}
                      </Select>
                    </div>
                  </div>
                  <div className="priority mt-3" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      className="form-control"
                      value={taskDetailModal.priorityTask?.priorityId}
                      onChange={() => {}}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option value={item.priorityId} key={index}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h5 className="font-bold">TIME TRACKING</h5>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                  <Button
                    className="btn btn-danger mr-2 mt-2"
                    onClick={() => setVisibleEditor(!visibleEditor)}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="btn btn-success mt-2"
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: HANDLE_CHANGE_TASK_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: "description",
                        value: contentDescription,
                      });
                      Notification("success", "Save Project Successfully");
                      setVisibleEditor(!visibleEditor);
                    }}
                  >
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

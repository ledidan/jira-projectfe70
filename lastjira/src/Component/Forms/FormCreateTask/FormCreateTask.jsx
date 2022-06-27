import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { Select, Slider } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  GET_ALL_PROJECT,
  GET_SEARCH_USER,
  GET_USER_API,
} from "../../../redux/contants/JiraConstants";
import {
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  SET_SUBMIT_CREATE_TASK,
} from "../../../redux/contants/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/contants/PriorityConstants";
import { withFormik } from "formik";
import { GET_STATUS_SAGA } from "../../../redux/contants/StatusConstants";
import { GET_USER_BY_PROJECT_SAGA } from "../../../redux/contants/UserConstants";

function FormCreateTask(props) {
  // Editor
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const dispatch = useDispatch();
  // Select multiple choices of Antd
  const { Option } = Select;
  const children = [];

  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const { handleChange, handleSubmit, setFieldValue, values } = props;

  const { arrProject } = useSelector((state) => state.ProjectManagementReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserLoginJiraReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  //  Hook
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_STATUS_SAGA });
    dispatch({ type: GET_USER_API, keyWord: "" });
    // đưa hàm handleSubmit lên drawer reducer để cập nhật lại sự kiện cho nút submit
    dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
  }, [arrProject]);
  const [size, setSize] = React.useState("default");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 5,
    timeTrackingRemaining: 5,
  });
  // Lay du lieu tu redux

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <h6>Project</h6>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            // dispatch gia tri lam thay doi user
            let { value } = e.target;
            dispatch({
              type: GET_USER_BY_PROJECT_SAGA,
              idProject: value,
            });
            // Cap nhat gia tri cho projectId
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject?.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <h6>Task name</h6>
        <input
          className="form-control"
          name="taskName"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <h6>Status</h6>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
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
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <h6>Priority</h6>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((Priority, index) => {
                return (
                  <option value={Priority.priorityId} key={index}>
                    {Priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <h6>Task type</h6>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((TaskType, index) => {
                return (
                  <option value={TaskType.id} key={index}>
                    {TaskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <h6>Assignees</h6>
            <Select
              mode="multiple"
              size={size}
              placeholder="Please select"
              options={userOptions}
              optionFilterProp="label"
              style={{ width: "100%" }}
              onSearch={(value) => {
                console.log(value);
              }}
              onChange={(values) => {
                // set lai gia tri cho lstUserAsign
                setFieldValue("listUserAsign", values);
              }}
            >
              {children}
            </Select>
          </div>
          <div className="col-6">
            <h6>Time tracking</h6>
            <Slider
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent + "h"} logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining + "h"} remaining
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <h6>Original Estimate</h6>
            <input
              className="form-control"
              type="number"
              name="originalEstimate"
              defaultValue="0"
              min="0"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <h6>Time spent</h6>
                <input
                  className="form-control"
                  type="number"
                  name="timeTrackingSpent"
                  defaultValue="0"
                  min="0"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <h6>Time remaining</h6>
                <input
                  className="form-control"
                  type="number"
                  name="timeTrackingRemaining"
                  defaultValue="0"
                  min="0"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <h6>Description</h6>
        <Editor
          name="description"
          apiKey="nrpi36979r4qkvdj6xscissomderf9ezwj3nv36mc16v0mit"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 200,
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
            setFieldValue("description", content);
          }}
        />
      </div>
    </form>
  );
}

const FormCreateTaskFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.id,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },
  validationSchema: Yup.object().shape({
    // form validation
  }),
  handleSubmit: (values, { props, setSubmiting }) => {
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
    console.log("taskObject", values);
  },

  displayName: "FormCreateTaskFormik",
})(FormCreateTask);
// const { arrProject } = useSelector((state) => state.ProjectManagementRedu  r);
//   const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
//   const { arrPriority } = useSelector((state) => state.PriorityReducer);
//   const { userSearch } = useSelector((state) => state.UserLoginJiraReducer);
//   const { arrStatus } = useSelector((state) => state.StatusReducer);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectManagementReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    userSearch: state.UserLoginJiraReducer.userSearch,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(FormCreateTaskFormik);

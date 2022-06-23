import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  API_PROJECT_CATEGORY,
  EDIT_PROJECT_FORM,
  SET_SUBMIT_FORM,
  UPDATE_PROJECT,
} from "../../../redux/contants/JiraConstants";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, setFieldValue, values } = props;

  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  // componentDidMount
  useEffect(() => {
    // call API load project category
    dispatch({ type: API_PROJECT_CATEGORY });
    // load submit event on drawer about submit button
    dispatch({ type: SET_SUBMIT_FORM, submitFunction: handleSubmit });
  }, []);

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h3 className="text-xl">Project ID</h3>
            <input
              disabled
              value={values.id}
              name="id"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h3 className="text-xl">Project Name</h3>
            <input
              value={values.projectName}
              name="projectName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h3 className="text-xl">Project Category</h3>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="text-xl ">Description</p>
            <Editor
              name="description123"
              apiKey="nrpi36979r4qkvdj6xscissomderf9ezwj3nv36mc16v0mit"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={values.description}
              init={{
                height: 300,
                selector: "textarea",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
const FormEditProjectJiraFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({
    // form validation
  }),
  handleSubmit: (values, { props, setSubmiting }) => {
    // props.dispatch({ type: EDIT_PROJECT_FORM, projectEdit: values });
    // Khi nguoi dung bam submit => dua du lieu ve backend thong qua API
    const action = {
      type: UPDATE_PROJECT,
      projectUpdate: values,
    };
    // Call saga
    props.dispatch(action);
  },
  displayName: "FormEditProjectJiraFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.EditProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(FormEditProjectJiraFormik);

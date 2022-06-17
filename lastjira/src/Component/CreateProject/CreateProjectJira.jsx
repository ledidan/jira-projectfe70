import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  API_CREATE_PROJECT,
  API_PROJECT_CATEGORY,
} from "../../redux/contants/JiraConstants";

function CreateProjectJira(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  useEffect(() => {
    // goi api de aly du lieu the select
    dispatch({ type: API_PROJECT_CATEGORY });
  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  return (
    <div className="container m-5">
      <h3 className="text-center text-4xl">Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input
            name="projectName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            apiKey="nrpi36979r4qkvdj6xscissomderf9ezwj3nv36mc16v0mit"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
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
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
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
        <button className="btn btn-outline-primary" type="submit" onClick={log}>
          Create Project
        </button>
      </form>
    </div>
  );
}

const CreateProjectJiraFormik = withFormik({
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.arrProjectCategory,
  }),
  validationSchema: Yup.object().shape({
    // form validation
  }),
  handleSubmit: (values, { props, setSubmiting }) => {
    props.dispatch({ type: API_CREATE_PROJECT, newProject: values });
  },
  displayName: "CreateProjectJiraFormik",
})(CreateProjectJira);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectJiraFormik);

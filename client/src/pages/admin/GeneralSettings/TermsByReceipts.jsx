import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../api/api";
import SidebarAdmin from "../../../components/SidebarAdmin";
import { Editor } from "@tinymce/tinymce-react";

function TermsByReceipts({ userData }) {
  const { t, i18n } = useTranslation();
  const editorRef = useRef(null);
  const [term, setTerm] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${BASE_URL}/api/term`,
      { term },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Successfully");
    setTerm("");
  };
  return (
    <Fragment>
      <ToastContainer />
      <div
        className="position-relative bg-gradient"
        style={{ height: "480px" }}
      >
        <div className="shape shape-bottom shape-slant bg-secondary d-none d-lg-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 260">
            <polygon
              fill="currentColor"
              points="0,257 0,260 3000,260 3000,0"
            ></polygon>
          </svg>
        </div>
      </div>
      <div
        className="container position-relative zindex-5 pb-4 mb-md-3"
        style={{ marginTop: "-350px" }}
      >
        <div className="row">
          <SidebarAdmin userData={userData} />
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 300,
                    width: "100%",
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
                      "removeformat ",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={(newValue, editor) => {
                    setTerm(editor.getContent({ format: "text" }));
                  }}
                />
              </div>
              <button type="submit" className="btn btn-success float-end">
                {t("saveChanges")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TermsByReceipts;

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { stateToHTML } from "draft-js-export-html";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [previewText, setPreviewText] = useState([]);
  const [message, setMessage] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);

    // Update the preview text whenever the editor content changes
    updatePreviewText(state);
  };

  const handleSubmit = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    let previewContent = [];

    rawContent.blocks.forEach((block) => {
      const text = block.text;
      const inlineStyleRanges = block.inlineStyleRanges;
      let currentPosition = 0;

      inlineStyleRanges.forEach((range) => {
        const { offset, length, style } = range;
        const beforeText = text.slice(currentPosition, offset);
        const styledText = text.slice(offset, offset + length);

        // Add plain text before the styled text
        if (beforeText) {
          previewContent.push(beforeText);
        }

        // Add inline styles as React components
        switch (style) {
          case "BOLD":
            previewContent.push(<strong key={offset}>{styledText}</strong>);
            break;
          case "ITALIC":
            previewContent.push(<em key={offset}>{styledText}</em>);
            break;
          case "UNDERLINE":
            previewContent.push(<u key={offset}>{styledText}</u>);
            break;
          case "STRIKETHROUGH":
            previewContent.push(<del key={offset}>{styledText}</del>);
            break;
          default:
            previewContent.push(styledText);
            break;
        }

        currentPosition = offset + length;
      });

      // Add the remaining text after the last inline style
      const remainingText = text.slice(currentPosition);
      if (remainingText) {
        previewContent.push(remainingText);
      }
    });

    setPreviewText(previewContent);

    // Make your API call here to send 'previewContent' to the backend using Axios
    const formattedContent = previewContent
      .map((element) => {
        if (React.isValidElement(element)) {
          // If the element is a React component, get its inner text
          return element.props.children;
        }
        return element; // If it's a plain text, return as is
      })
      .join("");

    // Update the 'message' state with the formatted content
    setMessage(formattedContent);

    const endpoint =
      "https://7769-102-219-208-66.ngrok-free.app/api/messages/compose";

    // Include authorization headers in the request
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .post(endpoint, { message: formattedContent }, { headers })
      .then((response) => {
        // Handle success if needed
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Clear the text editor after a successful API call
        const emptyContentState = ContentState.createFromText("");
        const emptyEditorState =
          EditorState.createWithContent(emptyContentState);
        setEditorState(emptyEditorState);
      })
      .catch((error) => {
        // Handle error if needed
        toast.error("Failed to send message.", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error sending message:", error);
      });
  };

  const updatePreviewText = (state) => {
    const content = state.getCurrentContent();
    const rawContent = convertToRaw(content);
    let previewContent = [];

    rawContent.blocks.forEach((block) => {
      const text = block.text;
      const inlineStyleRanges = block.inlineStyleRanges;
      let currentPosition = 0;

      inlineStyleRanges.forEach((range) => {
        const { offset, length, style } = range;
        const beforeText = text.slice(currentPosition, offset);
        const styledText = text.slice(offset, offset + length);

        // Add plain text before the styled text
        if (beforeText) {
          previewContent.push(beforeText);
        }

        // Add inline styles as React components
        switch (style) {
          case "BOLD":
            previewContent.push(<strong key={offset}>{styledText}</strong>);
            break;
          case "ITALIC":
            previewContent.push(<em key={offset}>{styledText}</em>);
            break;
          case "UNDERLINE":
            previewContent.push(<u key={offset}>{styledText}</u>);
            break;
          case "STRIKETHROUGH":
            previewContent.push(<del key={offset}>{styledText}</del>);
            break;
          default:
            previewContent.push(styledText);
            break;
        }

        currentPosition = offset + length;
      });

      // Add the remaining text after the last inline style
      const remainingText = text.slice(currentPosition);
      if (remainingText) {
        previewContent.push(remainingText);
      }
    });

    setPreviewText(previewContent);
  };

  const applyInlineStyle = (text, style) => {
    switch (style) {
      case "BOLD":
        return <strong>{text}</strong>;
      case "ITALIC":
        return <em>{text}</em>;
      case "UNDERLINE":
        return <u>{text}</u>;
      case "STRIKETHROUGH":
        return <del>{text}</del>;
      // Add more cases for other inline styles if needed
      default:
        return text;
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="SymoGasPoint Text Editor (Admin only)" />
            <CardContent>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Type your message here... the longer the message the higher the cost."
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "emoji",
                    "image",
                    "remove",
                  ],
                  inline: {
                    inDropdown: false,
                    options: [
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "monospace",
                      "superscript",
                      "subscript",
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                      "Code",
                    ],
                  },
                  fontSize: {
                    className: "editor-toolbar-option",
                  },
                  fontFamily: {
                    options: [
                      "Arial",
                      "Georgia",
                      "Impact",
                      "Tahoma",
                      "Verdana",
                    ],
                  },
                  textAlign: {
                    inDropdown: true,
                  },
                  colorPicker: {
                    colors: ["black", "red", "green", "blue"],
                  },
                  link: {
                    inDropdown: false,
                  },
                  embedded: {
                    inDropdown: false,
                  },
                  emoji: {
                    inDropdown: false,
                  },
                  image: {
                    uploadEnabled: true,
                    alt: { present: true, mandatory: false },
                  },
                  remove: { className: "editor-toolbar-option" },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* Show the preview of the edited text below the submit button */}
          {/* <div>
            <h3>Preview:</h3>
            <p
              style={{
                fontWeight: "normal",
                fontStyle: "normal",
                textDecoration: "none",
              }}
            >
              {previewText.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
              ))}
            </p>
          </div> */}
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default MyEditor;

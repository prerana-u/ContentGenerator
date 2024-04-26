import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ShareIcon from "@mui/icons-material/Share";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";

export default function MessageGenerator(props) {
  //   const [selectedFile, setSelectedFile] = useState(null);
  const API_KEY = "AIzaSyC9yw7V35BE9U4Tg0EELDSpLhSb9NyeVsU";
  const genAI = new GoogleGenerativeAI(API_KEY);

  //   const handleFileUpload = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //   };

  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState(
    "Enter as comma separated values..."
  );
  const [sender, setSender] = useState("Type Here...");
  const [recname, setRecName] = useState("Type Here...");
  const [genText, setGenText] = useState("");
  const location = useLocation();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  async function function1() {
    setIsOpen(!isOpen);

    // For text-and-images input (multimodal), use the gemini-pro-vision model

    const prompt =
      "Create a " +
      props.type +
      " on behalf of " +
      sender +
      " as given in the description: " +
      location.state.text +
      " If it is a congratulatory message, only then mention that the winners of the event are: " +
      postContent +
      ". Generate the content in the form of a " +
      data +
      " in the length of " +
      length +
      " " +
      intype +
      ". If it is a letter or an email, also set the receiver's name as " +
      recname;

    console.log(prompt);
    // console.log(postContent);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setGenText(text);
    document.getElementById("message").innerHTML = text;

    document.getElementById("headertext").innerHTML = "Your Generated Message";
  }

  function copyText() {
    // Get the text field
    var copyText = document.getElementById("message").innerHTML;

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    // Alert the copied text
    alert("Message successfully copied!");
  }

  const [data, setData] = useState(undefined);
  const [intype, setIntype] = useState(undefined);
  const [length, setLength] = useState(1);
  const options = [
    "Email",
    "Formal Letter",
    "Simple Paragraph",
    "Formal Announcement",
    "Social Media Post",
    "Speech",
  ];
  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
    //console.log("User Selected Value - ", event.target.value);
  };
  const onOptionChangeHandler1 = (event) => {
    setIntype(event.target.value);
    console.log("User Selected Value - ", event.target.value);
  };
  const onNumberChangeHandler = (event) => {
    if (event.target.value > 100 || event.target.value < 1) {
      event.preventDefault();
    } else setLength(event.target.value);
  };

  const clearOnClick = (event) => {
    if (event.target.value === "Type Here...") {
      event.target.value = "";
    }
  };

  const revertClear = (event) => {
    if (event.target.value === "") {
      event.target.value = "Type Here...";
    }
  };

  const clearOnClickTextArea = (event) => {
    if (event.target.value === "Enter as comma separated values...") {
      event.target.value = "";
    }
  };

  const revertClearTextArea = (event) => {
    if (event.target.value === "") {
      event.target.value = "Enter as comma separated values...";
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dropDownMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function downloadFile() {
    const element = document.createElement("a");
    console.log(genText);
    const file = new Blob([genText], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div class=" flex justify-center xl:absolute inset-0 xl:mx-auto xl:top-[240px]">
      <div class="bg-white shadow-md rounded-xl px-8 pt-6  h-fit w-[350px] min-[320px]:w-[300px] md:w-[450px] mt-11 2xl:mt-0 flex flex-col items-center mb-24">
        <h3
          class="text-md md:text-xl text-center font-medium mt-3"
          id="headertext"
        >
          Customize Your Content
        </h3>
        {isOpen ? (
          <div class="">
            <div class="flex flex-column  items-center justify-center">
              <p
                id="message"
                class="mt-10 text-justify text-sm md:text-md  md:w-[350px] w-fit whitespace-pre-wrap"
              >
                Loading.. Please wait.
              </p>
            </div>
            <br />
            <div class="flex md:flex-row flex-col items-center justify-center mb-6">
              <Tooltip
                title="Regenerate"
                className="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-2 rounded-full mt-6 w-fit]"
              >
                <button color="primary" onClick={togglePopup}>
                  <ReplayIcon />
                </button>
              </Tooltip>
              <Tooltip
                title="Copy"
                className="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-2 rounded-full mt-6 md:ml-10 w-fit "
              >
                <button onClick={copyText} class="">
                  <ContentCopyIcon />
                </button>
              </Tooltip>
              <Tooltip
                title="Share"
                className="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-2 rounded-full mt-6 md:ml-10 w-fit "
              >
                <button id="sharebtn" onClick={dropDownMenuClick}>
                  <ShareIcon />
                </button>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 2.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <WhatsAppIcon fontSize="small" />
                  </ListItemIcon>
                  <a
                    href={"whatsapp://send?text= " + genText}
                    rel="nofollow noopener"
                    target="_blank"
                    className="share-icon"
                  >
                    Whatsapp
                  </a>
                </MenuItem>
                <MenuItem onClick={downloadFile}>
                  <ListItemIcon>
                    <DownloadIcon fontSize="small" />
                  </ListItemIcon>
                  Download
                </MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <div class=" mb-5 mt-[50px] ">
            <form className="w-[250px] md:w-[350px]">
              <label>Enter a list of winners</label>
              <div class="flex flex-col justify-center items-center mb-[20px]">
                <textarea
                  name="postContent"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  onFocus={(e) => {
                    clearOnClickTextArea(e);
                  }}
                  onBlur={(e) => {
                    revertClearTextArea(e);
                  }}
                  class="border border-black mt-3 p-4 md:w-[350px] w-[250px]"
                />
              </div>

              <label className="mt-10">Choose the format of content</label>
              <div className="flex flex-col justify-center items-center mb-[20px]">
                <select
                  onChange={onOptionChangeHandler}
                  className="md:w-[350px] w-[250px] border border-black mt-3 p-2"
                >
                  <option>Please choose one option</option>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>
              {data === "Email" || data === "Formal Letter" ? (
                <div>
                  <label>Mention Sender's Name</label>
                  <div className="flex flex-col justify-center items-center mb-[20px]">
                    <input
                      type="text"
                      value={sender}
                      onFocus={(e) => {
                        clearOnClick(e);
                      }}
                      onBlur={(e) => {
                        revertClear(e);
                      }}
                      onChange={(e) => setSender(e.target.value)}
                      className="border border-black mt-3 p-2 md:w-[350px] w-[250px]"
                    />
                  </div>
                  <label>Mention Receiver's Name</label>
                  <div className="flex flex-col justify-center items-center mb-[20px]">
                    <input
                      type="text"
                      value={recname}
                      onFocus={(e) => {
                        clearOnClick(e);
                      }}
                      onBlur={(e) => {
                        revertClear(e);
                      }}
                      onChange={(e) => setRecName(e.target.value)}
                      className="border border-black mt-3 p-2 md:w-[350px] w-[250px]"
                    />
                  </div>
                </div>
              ) : (
                console.log("nothing")
              )}
              <label className="mt-10">Choose the length of the content</label>
              <div className="flex  justify-center items-center">
                <input
                  type="number"
                  value={length}
                  min={1}
                  max={10}
                  onChange={onNumberChangeHandler}
                  className="md:w-[100px] w-[100px] border border-black mt-3 p-2"
                />
                <select
                  onChange={onOptionChangeHandler1}
                  className="md:w-[200px] w-[250px] border border-black mt-3 p-2 ml-11"
                >
                  <option>None</option>
                  <option>Sentences</option>
                  <option>Paragraphs</option>
                </select>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={function1}
                  className="bg-[#FFC100] hover:bg-[#ffa852] text-white font-bold py-2 px-4 rounded mt-10 w-[200px]"
                >
                  Continue
                  <KeyboardDoubleArrowRightIcon />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const { XMarkIcon, PaperClipIcon } = require("@heroicons/react/24/solid")
const { set } = require("immer/dist/internal")
const { useState } = require("react")
const { default: Dropzone } = require("react-dropzone")

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
}) => {
  const [preview, setPreview] = useState("")
  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            alt="message-form-preview"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => {
              URL.revokeObjectURL(preview)
            }}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setAttachment("")
              setPreview("")
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
      </div>
      <Dropzone
        acceptedFiles=".jpg,.jepg,.png"
        multiple={false}
        noClick={true}
        onDrop={(acceptedFiles) => {
          setAttachment(acceptedFiles[0])
          setPreview(URL.createObjectURL(acceptedFiles[0]))
        }}
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <PaperClipIcon className="message-form-icon-clip" onClick={open} />
          </div>
        )}
      </Dropzone>
    </div>
  )
}
export default MessageFormUI

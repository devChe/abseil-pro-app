import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

export default function PhotoEditor({photo}) {
  return (
    <div className="App">
      <ImageEditor
        includeUI={{
          loadImage: {
            path: `${photo.url}`,
            name: "SampleImage",
          },
          initMenu: "filter",
          uiSize: {
            width: "1000px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </div>
  );
}


// import React, { useRef, useState } from "react";
// import FilerobotImageEditor, {
// 	TABS,
// 	TOOLS
// } from "react-filerobot-image-editor";

// export default function PhotoEditor() {
// 	const editorRef = useRef(null);

// 	const [isImgEditorShown, setIsImgEditorShown] = useState(false);
// 	const [source, setSource] = React.useState("");
// 	const [selectedShapeId, setSelectedShapeId] = useState(null);

// 	const openImgEditor = () => {
// 		setIsImgEditorShown(true);
// 	};

// 	const closeImgEditor = () => {
// 		setIsImgEditorShown(false);
// 	};

// 	const handleShapeSelection = (shapeId) => {
// 		console.log(shapeId);
// 		setSelectedShapeId(shapeId);
// 	};

// 	console.log(editorRef);

// 	return (
// 		<div>
// 			{/* Display the position of the selected shape */}
// 			{selectedShapeId !== null && (
// 				<div>
// 					Selected shape position:
// 					{editorRef.current &&
// 						editorRef.current
// 							.getShapes()
// 							.find((shape) => shape.id === selectedShapeId).position.x}
// 					,
// 					{editorRef.current &&
// 						editorRef.current
// 							.getShapes()
// 							.find((shape) => shape.id === selectedShapeId).position.y}
// 				</div>
// 			)}

// 			{/* Render the FilerobotImageEditor component and pass it the editor reference */}
// 			<img style={{ width: "300px", height: "auto" }} src={source} />
// 			<button onClick={openImgEditor}>Open Filerobot image editor</button>
// 			{isImgEditorShown && (
// 				<FilerobotImageEditor
// 					ref={editorRef}
// 					source="https://i.imgur.com/kHkrXoX.png"
// 					onSave={(editedImageObject, designState) => {
// 						closeImgEditor();
// 						setSource(editedImageObject.imageBase64);
// 						// console.log("saved", editedImageObject, designState)
// 						console.log("saved", editedImageObject);
// 						console.log("saved", designState);
// 					}}
// 					onShapeCreate={(shape) => handleShapeSelection(shape.id)}
// 					onClose={closeImgEditor}
// 					annotationsCommon={{
// 						fill: "#ff0000"
// 					}}
// 					Text={{ text: "Filerobot..." }}
// 					tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
// 					defaultTabId={TABS.ANNOTATE} // or 'Annotate'
// 					defaultToolId={TOOLS.TEXT} // or 'Text'
// 				/>
// 			)}
// 		</div>
// 	);
// }
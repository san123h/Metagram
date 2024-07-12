import { useCallback, useState } from 'react';
import { FileWithPath , useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';


type FileUploaderprops ={
    fieldChange: (FILES: File[])=> void;
    mediaUrl: string;
}

const FileUploader = ( { fieldChange, mediaUrl }: FileUploaderprops ) => {

    const [ file, setFile ] = useState<File[]>([]);
    const [ fileUrl, setFileUrl ] = useState(mediaUrl);

    const onDrop = useCallback( 
        (acceptedFiles :FileWithPath[])   =>{
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },[file]);

    const { getRootProps, getInputProps }=useDropzone(
        {onDrop,
            accept:{
                'image/*':['.png','.jpg','.jpeg', '.gif', '.svg']
            }
        });


  return (
    <div {...getRootProps()} 
    className = "flex flex-col bg-dark-3 cursor-pointer">
        <input  {...getInputProps()} className="cursor-pointer"/>
        {
            fileUrl ? (
                <>
                <div className="flex flex-1 justify-center w-full 
                p-5 lg:p-10">
                    <img
                        src={fileUrl}
                        alt="image"
                        className="file_uploader-img"
                    />
                </div>
                <p className="file_uploader-label">
                    Click or drag photo to replace
                </p>
                </>
            ):(
                <div className="file_uploader-box ">
                    <img
                        src= "/assets/icons/file-upload.svg"
                        alt="file upload"
                        width={95}
                        height={70}
                    />
                    <h3 className="base-medium text-light-2 mb-2 mt-6">
                        Drag photo here...
                    </h3>
                    <p className="text-light-4 small-regular mb-6 ">
                        PNG, JPG, JPEG
                    </p>
                    <Button className="shad-button_dark_4">
                        Upload from device
                    </Button>
                </div>
            )
        }
    </div>
  )
}
export default FileUploader
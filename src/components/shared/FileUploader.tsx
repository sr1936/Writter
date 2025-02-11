import  {useCallback, useState} from 'react'
import {FileWithPath,useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange , mediaUrl }:FileUploaderProps) => {
 const [file,setFile]= useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
   const [fileError, setFileError] = useState(''); // Error state for file size

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
       console.log(file);
     // Clear any previous error messages
    setFileError('');

    // Check file size
    if (acceptedFiles[0].size > MAX_FILE_SIZE) {
      setFileError('File size exceeds the limit of 10MB.');
      return;
    }

    // Do something with the files
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(convertFileToUrl(acceptedFiles[0]))
  }, [fieldChange])
  const {getRootProps, getInputProps} = useDropzone({onDrop,
    accept:{
      'image/*':['.png','.jpeg','.jpg','.svg']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()}  className='cursor-pointer'/>
      {
        fileUrl ? (
          <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} alt="image"
            className='file_uploader-img' />
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace </p>
          </>
        ):
        (
           <div className='file_uploader-box'>
                 <img src="/public/assets/icons/file-upload.svg" alt="file upload"  />
                <h3 className='base-medium text-light-2 mb-2 mt-6'> Drag photo here</h3>
             <p className='text-light-4 small-regular mb-6'>SVG,PNG,JPG</p>
             <Button className='shad-button_dark_4'>
              Selet from Gellary 
             </Button>
          </div>
        )
      }
      {fileError && <div className="error">{fileError}</div>} {/* Display error message */}
    </div>
    
  )
}

export default FileUploader
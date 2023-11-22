/* eslint-disable react/prop-types */
import axios from "axios"
import { UploadIcon } from "./icons"

export default function UploaderPhotos({ fotosAgregadas, onChange }) {

    function uploadPhoto(event) {
        const files = event.target.files;
        const data = new FormData();
    
        for (let i = 0; i < files.length; i++) {
            data.append('fotos', files[i]);
        }
    
        const fileNames = Array.from(files).map(file => file.name);  // Captura los nombres de los archivos antes de la solicitud
    
        axios.post('http://localhost:1234/uploads', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            console.log(response);
            const { data: { success } } = response;
            if (success) {
                onChange(prev => [...prev, ...fileNames]);
            } else {
                console.error('La respuesta del servidor indica un error:', response.data);
            }
        }).catch(error => {
            console.error('Error al subir las imágenes:', error);
        });
    }

    return (
        <>
            <div className="flex gap-2">
                <div className=" ">
                    {fotosAgregadas.length > 0 && fotosAgregadas.map(link => (
                        <div className="h-32 flex relative" key={link}>
                            <img className='w-full rounded-2xl' src={`https://1023c07-prosport.s3.amazonaws.com/${link}`} alt="" />
                        </div>
                    )
                    )}
                    <label className="w-90 flex justify-center items-center gap-4 border bg-transparent rounded-2xl p-6 text-white font-semibold cursor-pointer">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                        <UploadIcon />
                        Agrega fotos del espacio
                    </label>
                </div>
            </div>
        </>
    )
}
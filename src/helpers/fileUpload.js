
export const fileUpload = async( file )=>{
    
    const cloudURL = ' https://api.cloudinary.com/v1_1/dm0pznyix/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try{
        const respuesta = await fetch(
            cloudURL,
            {   
                method: 'POST',
                body: formData

            });

        if(respuesta.ok){
            const cloudResp = await respuesta.json();
            return cloudResp.secure_url;
        }

    }catch(e){
        console.log(e);
    }


}
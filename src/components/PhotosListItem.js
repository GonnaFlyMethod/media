import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({photo}){
    const [removePhoto] = useRemovePhotoMutation(); 
    
    const handleRemovePhoto = () => {
        removePhoto(photo)
    }

    return <div onClick={handleRemovePhoto} className="relative m-3 cursor-pointer">
        <img className="h-50 w-50" src={photo.url} alt="random pic"/>
       
        <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
            <GoTrashcan className="text-3xl"/>
        </div>
    </div>
}

export default PhotosListItem;
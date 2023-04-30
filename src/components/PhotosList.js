import {useFetchPhotosQuery, useAddPhotoMutation} from '../store'
import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

function PhotosList({ album }){
    const {data, isFetching, error} = useFetchPhotosQuery(album);
    
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    }

    let content;

    if (isFetching){
        content = <Skeleton wrapperClassName="flex flex-row" className="h-10 w-10 m-3" numOfGrayBoxes={5}></Skeleton>
    }else if (error){
        content = <div>Error occurred while fetching photos</div>
    }else{
        content = data.map((photo)=> {
            return <PhotosListItem key={photo.id} photo={photo}></PhotosListItem>
        })
    }

    return <div>
        <div className='m-2 flex flex-row items-center justify-between'>
            <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
            <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>Add Photo</Button>
        </div>
        <div className='mx-8 flex flex-row flex-wrap justify-center'>
            {content}
        </div>
    </div>
}

export default PhotosList;
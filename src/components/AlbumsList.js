import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }){
    const {data, error, isFetching} = useFetchAlbumsQuery(user);
    
    const [addAlbum, results] = useAddAlbumMutation()

    let content;

    if (isFetching){
        content = <Skeleton numOfGrayBoxes={3} className="h-10 w-full"></Skeleton>
    }else if (error){
        content = <div>Error occurred while fetching albums of user</div>
    }else{
        content = data.map((album) =>{
            return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>
        })
    }

    const handleAddAlbum = () =>{
        addAlbum(user);
    }

    return (
        <div>
            <div>
                <div className="m-3 flex flex-row items-center justify-between">
                    <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                    <Button onClick={handleAddAlbum} loading={results.isLoading}>Add album</Button>
                </div>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList;
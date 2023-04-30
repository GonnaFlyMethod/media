import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import {useRemoveAlbumMutation} from '../store'
import { Fragment } from "react";
import PhotosList from "./PhotosList";

function AlbumsListItem({album}){
    const [removeAlbum, results] =  useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    }

    const header = <Fragment>
        <Button className="mr-3" onClick={handleRemoveAlbum} loading={results.isLoading}><GoTrashcan></GoTrashcan></Button>
        {album.title}
    </Fragment>

    return <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}></PhotosList>
    </ExpandablePanel>
}

export default AlbumsListItem;
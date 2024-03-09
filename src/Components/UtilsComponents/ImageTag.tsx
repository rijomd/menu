
type TypeImageTag = {
    url: string;
}

export const ImageTag = ({ url }: TypeImageTag) => {
    return (
        <img src={url} style={{ height: '50px' }} />
    )
}
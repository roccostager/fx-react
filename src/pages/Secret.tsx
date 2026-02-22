import useApi from "../api/useApi";

function Secret() {
    const { data, loading, error } = useApi('get', 'secret');

    if (loading) return <p>Loading</p>;
    if (error) return <p>{error.message}</p>;

    if (data && typeof data.message === 'string') {
        return (<>
            <p>{data.message}</p>
        </>)
    }

    return (<>
        <p className="font-serif">This is a demonstration page to show that authentication is working.</p>
        <p className="font-serif">If you see this, either there is no backend running, or something is not working.</p>
    </>)
}
export default Secret;
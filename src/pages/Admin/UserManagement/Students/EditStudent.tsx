import { useParams } from 'react-router';

const EditStudent = () => {
    const router = useParams();
    return (
        <div>
            Edit Student Page for student ID: {router.id}
        </div>
    );
};

export default EditStudent;
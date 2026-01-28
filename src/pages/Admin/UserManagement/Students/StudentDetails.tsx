import { useParams } from 'react-router';

const StudentDetails = () => {
    const router = useParams();
    return (
        <div>
            This is student details page for student ID: {router.id}
        </div>
    );
};

export default StudentDetails;
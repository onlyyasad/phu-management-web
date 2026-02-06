import {Button, Modal} from "antd";
import {useState} from "react";
import type {FieldValues, SubmitHandler} from "react-hook-form";
import PHForm from "../../components/form/PHForm.tsx";
import PHInput from "../../components/form/PHInput.tsx";
import type {TStudent} from "../../types/student.types.ts";
import {useAddCourseMarksMutation} from "../../redux/features/faculty/facultyCourseManagement.api.ts";
import type {TError, TResponse} from "../../types/global.types.ts";
import {toast} from "sonner";

type TPayload = {
    semesterRegistration: string,
    offeredCourse: string,
    student: string,
    courseMarks: {
        classTest1?: number,
        classTest2?: number,
        midTerm?: number,
        finalTerm?: number
    }
}

const AddMarksModal = ({studentData, semesterRegistration, offeredCourse}: {
    studentData: TStudent,
    semesterRegistration: string,
    offeredCourse: string
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addMarks, {isLoading: isAdding}] = useAddCourseMarksMutation()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Adding marks...");

        const payload: TPayload = {
            semesterRegistration,
            offeredCourse,
            student: studentData._id,
            courseMarks: {}
        }

        if (data.classTest1) {
            payload.courseMarks['classTest1'] = Number(data.classTest1);
        }
        if (data.classTest2) {
            payload.courseMarks['classTest2'] = Number(data.classTest2);
        }
        if (data.midTerm) {
            payload.courseMarks['midTerm'] = Number(data.midTerm);
        }
        if (data.finalTerm) {
            payload.courseMarks['finalTerm'] = Number(data.finalTerm);
        }

        console.log(payload);

        try {
            const res = (await addMarks(payload).unwrap()) as TResponse<any>;

            if (res.success) {
                toast.success("Marks updated successfully", {
                    id: toastId,
                });
                setIsModalOpen(false);
            }
        } catch (error) {
            const err = error as TError;
            toast.error(err.message || "Error updating marks:", {
                id: toastId,
            });
        }
    };
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add Marks
            </Button>
            <Modal
                title="Add Marks"
                closable={{"aria-label": "Custom Close Button"}}
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <PHForm onSubmit={onsSubmit}>
                    <PHInput type={"number"} name={"classTest1"} label={"Class Test 1"}/>
                    <PHInput type={"number"} name={"classTest2"} label={"Class Test 2"}/>
                    <PHInput type={"number"} name={"midTerm"} label={"Mid Term"}/>
                    <PHInput type={"number"} name={"finalTerm"} label={"Final Term"}/>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        disabled={isAdding}
                    >
                        Add
                    </Button>
                </PHForm>
            </Modal>
        </div>
    );
};

export default AddMarksModal;

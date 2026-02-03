export type TPreRequisiteCourse = {
    course: string | TCourse;
    isDeleted: boolean;
};

export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: TPreRequisiteCourse[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};
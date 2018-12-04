export interface ListEnroll {
    id:number;
    student_id: number;
    student_first_name: string;
    student_last_name: string;
    student_dob: string;
    parent_name: string;
    parent_email: string;
    subject: string;
    class:string;
    note:string;

    appointment:string;
    appointment_status: string;

    assign: string;
    assign_time: string;
    result: string;
    result_status: string;

    offical_class: string;
    first_day:string;
    first_day_status: string;

    active:boolean;
}
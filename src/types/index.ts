export type Course = {
    id: number;
    author: string;
    title: string;
    price: number;
    rating: number;
    thumbUrl?: string;
    category: string;
};

export type User = {
    id: number;
    email: string;
    fullname: string;
    password?: string;
    confirmPass?: string;
    datejoined?: string;
};

export type Wishlist = {
    wishlistId: number;
    course: Course;
    createdAt: string;
};

export type Lesson = {
    id: number;
    lessonName: string;
    videokey: string;
};

/* for submitting Payment to server */
export interface PaymentObj {
    nonce: string,
    paymentMethod: string,
    totalAmount: string | number,
    courses: number[] | unknown[],
}
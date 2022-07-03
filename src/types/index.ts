export interface Course {
    id: number;
    author: string;
    title: string;
    price: number;
    rating: number;
    thumbUrl?: string;
    category: string;
}

export interface User {
    id: number;
    email: string;
    fullname: string;
    password?: string;
    confirmPass?: string;
    createdAt?: string;
}

export interface Wishlist {
    wishlistId: number;
    course: Course;
    createdAt: string;
}

export interface Lesson {
    id: string;
    lessonName: string;
    videokey: string;
    lengthSeconds: string | number;
    position: number;
}

/* for checkout, send to server */
export interface PaymentObj {
    nonce: string;
    paymentMethod: string;
    totalAmount: string | number;
    courses: number[] | unknown[];
}

/* for purchaseHistory page  */
export interface Sale {
    transactionId: string;
    createdAt: Date | string;
    paymentMethod: string;
    totalPaid: number;
    numOfItems: number;
}

export interface ReviewResponse {
    id: number;
    content: string;
    rating: number;
    createdAt: string;
    fullname: string;
}

/* for video player */
export interface VideoRequest {
    courseId: number;
    enrollId?: number;
    lessonId: string;
}

/* for video player */
export interface VideoResponse {
    enrollId: number;
    lesson: Lesson;
}

/* sned to server after lesson complete */
export interface WatchStatus {
    enrollId: number;
    currentLessonId: string;
    courseId: number;
}
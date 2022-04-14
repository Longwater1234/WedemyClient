export interface Course {
    id: number,
    author: string,
    title: string,
    price: number,
    rating: number,
    thumbUrl?: string,
    category: string,
}

export interface User {
    id: number,
    email: string,
    fullname: string,
    password?: string,
    confirmPass?: string,
    createdAt?: string,
}

export interface Wishlist {
    wishlistId: number,
    course: Course,
    createdAt: string,
}

export interface Lesson {
    id: number,
    lessonName: string,
    videokey: string,
}

/* for submitting Payment to server */
export interface PaymentObj {
    nonce: string,
    paymentMethod: string,
    totalAmount: string | number,
    courses: number[] | unknown[],
}

/* for purchaseHistory page  */
export interface Sale {
    transactionId: string;
    createdAt: string;
    paymentMethod: string;
    totalPaid: number;
    numOfItems: number;
}

/** for Password Reset */
export interface PasswordRequest {
    currentPass: string,
    newPass: string,
    confirmPass: string
}

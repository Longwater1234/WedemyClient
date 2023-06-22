import type { Lesson, Review } from "@/interfaces/wedemy";

export interface LoginRequest {
  email: string;
  password: string;
  /* from Hcaptcha */
  responseToken?: string;
}

/* student summary on profile */
export interface Summary {
  title: string;
  value: number;
  subtitle: string;
}
export interface CustomLesson {
  id: string;
  video_time: string;
  lesson_name: string;
  is_watched: boolean;
}

/* for checkout, send to server */
export interface PaymentObj {
  nonce: string;
  paymentMethod: string;
  totalAmount: string | number;
}

/* for purchaseHistory page  */
export interface Sale {
  transactionId: string;
  createdAt: Date | string;
  paymentMethod: string;
  totalPaid: number;
  numOfItems: number;
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

/* send to server after lesson complete */
export interface WatchStatus {
  enrollId: number;
  currentLessonId: string;
  courseId: number;
}

export type SortParam = "createdAt" | "rating";

export interface CategoryDto {
  id: number;
  category: string;
}

export interface ReviewDto extends Review {
  fullname: string;
}

export interface EnrollmentDto {
  id: number;
  progress: number;
  title: string;
  thumbUrl: string;
  courseId: number;
}

export interface UserDto {
  id: number;
  fullname: string;
  email: string;
  createdAt: Date | string;
}

export interface CustomLesson {
  id: string;
  video_time: string;
  lesson_name: string;
  is_watched: boolean;
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

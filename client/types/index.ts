export type SignupForm = {
    name: string;
    email: string;
    password: string;
}

export type SigninForm = {
    email: string;
    password: string;
}

export type UserData = {
    userId: number;
    name: string;
    email: string;
};

export type UserCredential = {
    token: string;
    user: UserData;
};

export type AuthContextType = {
    authState: UserCredential;
    setUserAuthInfo: (data: UserCredential) => void;
    isUserAuthenticated: () => boolean;
};

export type BlogForm = {
    title: string;
    content: string;
}

export type BlogData = {
    postId: number;
    authorId: number;
    title: string;
    author: {
        name: string;
        email: string;
    }
    content: string;
    createdAt: string;
  };
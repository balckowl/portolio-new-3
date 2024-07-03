import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Session型の拡張
declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
      name: string;
      email: string;
      photoURL: string;
    } 
  }
}

// JWT型の拡張
declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
  }
}

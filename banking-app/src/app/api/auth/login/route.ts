import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'supersecretkey-change-this-in-production');

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        // Restrict to specific requested user
        if (username !== 'jessalynnxoxo957@gmail.com' || password !== 'EveHaley99') {
            return NextResponse.json({ message: 'Invalid credentials. Only the authorized user can access the dashboard.' }, { status: 401 });
        }

        const mockUserId = '67cc3a9482ca63345e69b000'; // Static mock ID for JWT

        // Asynchronously ensure user exists in MongoDB without blocking the login request
        // This makes the UI feel instantly responsive
        dbConnect().then(async () => {
            try {
                const userExists = await User.findOne({ email: username });
                if (!userExists) {
                    await User.create({
                        _id: mockUserId, // Ensure if we create it, it matches our JWT
                        firstName: 'Evann',
                        lastName: 'Haley',
                        email: username,
                        phoneNumber: '1234567890',
                        password: password,
                        pin: '123456'
                    });
                }
            } catch (e) {
                console.error("DB Seed Error:", e);
            }
        }).catch(console.error);

        // Generate JWT instantly
        const token = await new SignJWT({ email: username, id: mockUserId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        const mockUserReturn = {
            firstName: 'Evann',
            lastName: 'Haley',
            email: username,
        };

        const response = NextResponse.json({ message: 'Logged in successfully', user: mockUserReturn }, { status: 200 });

        // Set HttpOnly cookie
        response.cookies.set({
            name: 'auth-token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

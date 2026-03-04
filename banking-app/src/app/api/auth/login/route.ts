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

        await dbConnect();

        // Map username to email in our DB
        let user = await User.findOne({ email: username });
        if (!user) {
            // Seed the user if it doesn't exist
            user = await User.create({
                firstName: 'Evann',
                lastName: 'Haley',
                email: username,
                phoneNumber: '1234567890',
                password: password,
                pin: '123456'
            });
        }

        if (user.password !== password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT using jose
        const token = await new SignJWT({ email: user.email, id: user._id.toString() })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        const response = NextResponse.json({ message: 'Logged in successfully', user }, { status: 200 });

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

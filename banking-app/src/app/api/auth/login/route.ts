import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        await dbConnect();

        // Map username to email in our DB
        const user = await User.findOne({ email: username });
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        if (user.password !== password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Logged in successfully', user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

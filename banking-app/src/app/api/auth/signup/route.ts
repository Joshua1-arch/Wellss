import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, phoneNumber, password, pin } = await req.json();

        if (!firstName || !lastName || !email || !phoneNumber || !password || !pin) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password, // In a real app, hash the password!
            pin,
        });

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
